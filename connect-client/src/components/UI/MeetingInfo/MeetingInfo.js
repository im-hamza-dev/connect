import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faTimes,
  faUser,
  faShieldAlt,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import "./MeetingInfo.scss";
import { useState } from "react";

const MeetingInfo = ({ setMeetInfoPopup, url }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="meeting-info-block">
      <div className="meeting-header">
        <h3>Your meeting's ready</h3>
        <FontAwesomeIcon
          className="icon"
          icon={faTimes}
          onClick={() => {
            setMeetInfoPopup(false);
          }}
        />
      </div>

      <p className="info-text">
        Or share this meeting link with others you want in the meeting
      </p>
      <div
        className="meet-link"
        onClick={() => {
          setCopied(true);
          navigator.clipboard.writeText(url);
        }}
      >
        <span>{url}</span>
        <FontAwesomeIcon
          className="icon"
          style={{ color: copied ? "#21ba45" : "" }}
          icon={copied ? faCircleCheck : faCopy}
        />
      </div>
    </div>
  );
};

export default MeetingInfo;
