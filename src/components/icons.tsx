const visualityOnUrl = "/assets/icons/icon_eye.svg";
const visualityOff = "/assets/icons/icon_eye-closed.svg";
const info = "/assets/icons/info.svg";
const select = "/assets/icons/select.svg";
const success = "/assets/icons/success.svg";
const fail = "/assets/icons/fail.svg";
const warning = "/assets/icons/warning.svg";

const VisualityOn = ({ ...props }) => {
  return <img src={visualityOnUrl} alt="" {...props} />;
};

const VisualityOff = ({ ...props }) => {
  return <img src={visualityOff} alt="" {...props} />;
};

const Info = ({ ...props }) => {
  return <img src={info} alt="" {...props} />;
};

const SelectIcon = ({ ...props }) => {
  return <img src={select} alt="" {...props} />;
};

const Success = ({ ...props }) => {
  return <img src={success} alt="" {...props} />;
};
const Fail = ({ ...props }) => {
  return <img src={fail} alt="" {...props} />;
};
const Warning = ({ ...props }) => {
  return <img src={warning} alt="" {...props} />;
};
const ICONS = {
  VISUALITY_ON: <VisualityOn />,
  VISUALITY_OFF: <VisualityOff />,
  INFO: <Info />,
  SELECT: <SelectIcon />,
  SUCCESS: <Success />,
  FAIL: <Fail />,
  WARNING: <Warning />,
  // Add more icons here as needed
};

export default ICONS;
