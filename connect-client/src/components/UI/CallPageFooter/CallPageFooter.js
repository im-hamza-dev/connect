import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faMicrophone,
  faPhone,
  faAngleUp,
  faClosedCaptioning,
  faDesktop,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./CallPageFooter.scss";

const CallPageFooter = ({
  isPresenting,
  stopScreenShare,
  screenShare,
  isAudio,
  toggleAudio,
  disconnectCall,
}) => {
  return (
    <div className="footer-item">
       
      <div className="center-item">
        <div
          className={`icon-block ${!isAudio ? "red-bg" : null}`}
          onClick={() => toggleAudio(!isAudio)}
        >
          <FontAwesomeIcon
            className="icon"
            icon={isAudio ? faMicrophone : faMicrophoneSlash}
          />
        </div>
        <div className="icon-block" onClick={disconnectCall}>
          <FontAwesomeIcon className="icon red" icon={faPhone} />
        </div>
        <div className="icon-block">
          <FontAwesomeIcon className="icon" icon={faVideo} />
        </div>
      </div>
     
    </div>
  );
};

export default CallPageFooter;
