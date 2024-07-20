import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faKeyboard,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import shortid from "shortid";
import "./HomePage.scss";
import { useEffect, useRef, useState } from "react";

const HomePage = () => {
  const [meetingCode, setMeetingCode] = useState("");
  const myVideoRef = useRef(null);
  const navigate = useNavigate();

  const startMeeting = () => {
    const uid = shortid.generate();
    navigate(`/${uid}#init`);
  };

  const joinMeeting = () => {
    if (meetingCode) navigate(`/${meetingCode}`);
  };

  useEffect(() => {
    initiateMyVideo();
  }, []);

  const initiateMyVideo = () => {
    window.navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        myVideoRef.current.srcObject = stream;
        myVideoRef.current.play();
      });
  };

  return (
    <div className="home-page" id="particles-js">
      <div className="contentWrapper">
        <div className="content">
          <h2>connect.</h2>
          <p>
            Revolutionize Your Meetings with AI: Instant Transcriptions and
            Summaries for Seamless Collaboration.
          </p>
          <div className="action-btn">
            <button className="newMeeting btn" onClick={startMeeting}>
              <FontAwesomeIcon className="icon-block" icon={faVideo} />
              New Meeting
            </button>
            <div className="input-block joinMeeting">
              <div className="input-section">
                <input
                  placeholder="Join Meeting by Code"
                  type="text"
                  value={meetingCode}
                  onChange={(e) => setMeetingCode(e.target.value)}
                />
              </div>
              <button className="btn joinBtn" onClick={joinMeeting}>
                <FontAwesomeIcon className="icon-block" icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
        <video
          id="home-my-meeting-video"
          className="home-my-video-container"
          controls={false}
          ref={myVideoRef}
        ></video>
      </div>
    </div>
  );
};
export default HomePage;
