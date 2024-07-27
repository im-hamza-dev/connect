import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faMicrophone,
  faPhone,
  faFloppyDisk,
  faMicrophoneSlash,
  faRecordVinyl
} from "@fortawesome/free-solid-svg-icons";
import "./CallPageFooter.scss";

const CallPageFooter = ({
  isPresenting,
  stopScreenShare,
  screenShare,
  isAudio,
  toggleAudio,
  disconnectCall,
  startRecording,
  stopRecording,
  isRecording
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
        <div className="icon-block" onClick={isRecording ? stopRecording : startRecording}>
           <FontAwesomeIcon  className="icon" style={{color: isRecording ?"#fe0b0b" : 'grey',}} icon={isRecording ? faFloppyDisk : faRecordVinyl} />
        </div>
      </div>
     
    </div>
  );
};

export default CallPageFooter;
