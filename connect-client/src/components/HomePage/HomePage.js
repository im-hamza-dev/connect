import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faKeyboard,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import shortid from "shortid";
import "./HomePage.scss";
import { useState } from "react";

const HomePage = () => {
  const [meetingCode, setMeetingCode] = useState(null)
  const navigate = useNavigate();

  const startMeeting = () => {
    const uid = shortid.generate();
    navigate(`/${uid}#init`);
  };
  
  const joinMeeting = () => {
    if(meetingCode)
    navigate(`/${meetingCode}`);
  };

  return (
    <div className="home-page" id="particles-js">
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
              <input placeholder="Enter a code or link"  value={meetingCode} onChange={setMeetingCode}/>
            </div>
            <button className="btn joinBtn" onClick={joinMeeting}>
              <FontAwesomeIcon className="icon-block" icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
