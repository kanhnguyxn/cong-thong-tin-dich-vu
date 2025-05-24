const visualityOnUrl = "/assets/icons/icon_eye.svg";
const visualityOff = "/assets/icons/icon_eye-closed.svg";
const info = "/assets/icons/info.svg";
const select = "/assets/icons/select.svg";
const success = "/assets/icons/success.svg";
const fail = "/assets/icons/fail.svg";
const warning = "/assets/icons/warning.svg";
const phone = "/assets/icons/phone.svg";
const email = "/assets/icons/email.svg";

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
const Phone = ({ ...props }) => {
  return (
    <img
      src={phone}
      alt="phone"
      className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0"
      {...props}
    />
  );
};
const Email = ({ ...props }) => {
  return (
    <img
      src={email}
      alt="phone"
      className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0"
      {...props}
    />
  );
};
const ICONS = {
  VISUALITY_ON: <VisualityOn />,
  VISUALITY_OFF: <VisualityOff />,
  INFO: <Info />,
  SELECT: <SelectIcon />,
  SUCCESS: <Success />,
  FAIL: <Fail />,
  WARNING: <Warning />,
  PHONE: <Phone />,
  EMAIL: <Email />,
  // Add more icons here as needed
};

export default ICONS;
