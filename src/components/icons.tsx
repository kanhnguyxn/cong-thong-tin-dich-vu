const visualityOnUrl = "/assets/icons/icon_eye.svg"
const visualityOff = '/assets/icons/icon_eye-closed.svg';


const VisualityOn = ({...props}) => {
    return <img src={visualityOnUrl} alt="" {...props} />
}

const VisualityOff = ({...props}) => {
    return <img src={visualityOff} alt="" {...props}/>
}

const ICONS = {
    VISUALITY_ON: <VisualityOn />,
    VISUALITY_OFF: <VisualityOff />,
    // Add more icons here as needed
  
};
    
export default ICONS;