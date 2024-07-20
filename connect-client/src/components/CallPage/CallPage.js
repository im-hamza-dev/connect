import { useEffect, useReducer, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "./../../utils/apiRequests";
import {
  BASE_URL,
  GET_CALL_ID,
  SAVE_CALL_ID,
} from "./../../utils/apiEndpoints";
import io from "socket.io-client";
// import SimplePeer from "simple-peer";

import "./CallPage.scss";
import Messenger from "./../UI/Messenger/Messenger";
import MessageListReducer from "../../reducers/MessageListReducer";
import Alert from "../UI/Alert/Alert";
import MeetingInfo from "../UI/MeetingInfo/MeetingInfo";
import CallPageFooter from "../UI/CallPageFooter/CallPageFooter";
import CallPageHeader from "../UI/CallPageHeader/CallPageHeader";
import { performAiIntegration } from "../../utils/aiIntegration";

const SimplePeer = window.SimplePeer;
let peer = null;
const socket = io.connect(BASE_URL);
const initialState = [];

const CallPage = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const isAdmin = window.location.hash === "#init" ? true : false;
  const url = `${window.location.origin}${window.location.pathname}`;
  let alertTimeout = null;

  const [messageList, messageListReducer] = useReducer(
    MessageListReducer,
    initialState
  );

  const [streamObj, setStreamObj] = useState();
  const [screenCastStream, setScreenCastStream] = useState();
  const [meetInfoPopup, setMeetInfoPopup] = useState(false);
  const [isPresenting, setIsPresenting] = useState(false);
  const [isMessenger, setIsMessenger] = useState(false);
  const [messageAlert, setMessageAlert] = useState({});
  const [isAudio, setIsAudio] = useState(true);
  let myVideoRef = useRef(null)

  useEffect(() => {
    if (isAdmin) {
      setMeetInfoPopup(true);
    }
    initMyVideo()
    initWebRTC();
    socket.on("code", (data) => {
      console.log("CHECK Code:", data, url);
      if (data.url === url) {
        peer.signal(data.code);
      }
    });
  }, []);

  const getRecieverCode = async () => {
    try {
      const response = await getRequest(`${BASE_URL}${GET_CALL_ID}/${id}`);
      console.log("Receiver code,", response.meetingId);
      if (response.meetingId) {
        peer.signal(response.meetingId);
      }
    } catch (err) {
      console.log("Error while receiving: ", err);
    }
  };
  const initMyVideo=()=>{
    navigator.mediaDevices.getUserMedia({
      video:true
    }).then(stream=>{
      myVideoRef.current.srcObject = stream
      myVideoRef.current.play()
    })
  }
  const initWebRTC = () => {
    console.log("init webrtc .......");
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setStreamObj(stream);

        peer = new SimplePeer({
          initiator: isAdmin,
          trickle: false,
          stream: stream,
        });

        if (!isAdmin) {
          getRecieverCode();
        }

        peer.on("signal", async (data) => {
          console.log("Signal....,", data);

          if (data.renegotiate || data.transceiverRequest) return;
          if (isAdmin) {
            let payload = {
              id,
              signalData: data,
            };
            await postRequest(`${BASE_URL}${SAVE_CALL_ID}`, payload);
          } else {
            socket.emit("code", { code: data, url }, (cbData) => {
              console.log("code sent");
            });
          }
        });

        peer.on("connect", () => {
          // wait for 'connect' event before using the data channel
        });

        peer.on("data", (data) => {
          clearTimeout(alertTimeout);
          messageListReducer({
            type: "addMessage",
            payload: {
              user: "other",
              msg: data.toString(),
              time: Date.now(),
            },
          });

          setMessageAlert({
            alert: true,
            isPopup: true,
            payload: {
              user: "other",
              msg: data.toString(),
            },
          });

          alertTimeout = setTimeout(() => {
            setMessageAlert({
              ...messageAlert,
              isPopup: false,
              payload: {},
            });
          }, 10000);
        });

        peer.on("stream", (stream) => {
          // got remote video stream, now let's show it in a video tag
          let video = document.querySelector("video");
          console.log("CHECK STREAM", stream, video);
          if ("srcObject" in video) {
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream); // for older browsers
          }
          console.log("CHECK VIDEO:", video, video.src, video.srcObject);
          video?.play();
        });
        peer.on("error", (err) => {
          console.log("peer errors:", err, err.code);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendMsg = (msg) => {
    peer.send(msg);
    messageListReducer({
      type: "addMessage",
      payload: {
        user: "you",
        msg: msg,
        time: Date.now(),
      },
    });
  };

  const screenShare = () => {
    navigator.mediaDevices
      .getDisplayMedia({ cursor: true })
      .then((screenStream) => {
        peer.replaceTrack(
          streamObj.getVideoTracks()[0],
          screenStream.getVideoTracks()[0],
          streamObj
        );
        setScreenCastStream(screenStream);
        screenStream.getTracks()[0].onended = () => {
          peer.replaceTrack(
            screenStream.getVideoTracks()[0],
            streamObj.getVideoTracks()[0],
            streamObj
          );
        };
        setIsPresenting(true);
      });
  };

  const stopScreenShare = () => {
    screenCastStream.getVideoTracks().forEach(function (track) {
      track.stop();
    });
    peer.replaceTrack(
      screenCastStream.getVideoTracks()[0],
      streamObj.getVideoTracks()[0],
      streamObj
    );
    setIsPresenting(false);
  };

  const toggleAudio = (value) => {
    streamObj.getAudioTracks()[0].enabled = value;
    setIsAudio(value);
  };

  const disconnectCall = () => {
    // performAiIntegration()
    peer.destroy();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="callpage-container">
      <video
        id="meeting-video"
        className="video-container"
        src=""
        controls={false}
      ></video>

      <video
        id="my-meeting-video"
        className="my-video-container"
        
        controls={false}
        ref = {myVideoRef}
      ></video>


      <CallPageHeader
        isMessenger={isMessenger}
        setIsMessenger={setIsMessenger}
        messageAlert={messageAlert}
        setMessageAlert={setMessageAlert}
      />
      <CallPageFooter
        isPresenting={isPresenting}
        stopScreenShare={stopScreenShare}
        screenShare={screenShare}
        isAudio={isAudio}
        toggleAudio={toggleAudio}
        disconnectCall={disconnectCall}
      />

      {isAdmin && meetInfoPopup && (
        <MeetingInfo setMeetInfoPopup={setMeetInfoPopup} url={url} />
      )}
      {isMessenger ? (
        <Messenger
          setIsMessenger={setIsMessenger}
          sendMsg={sendMsg}
          messageList={messageList}
        />
      ) : (
        messageAlert.isPopup && <Alert messageAlert={messageAlert} />
      )}
    </div>
  );
};
export default CallPage;
