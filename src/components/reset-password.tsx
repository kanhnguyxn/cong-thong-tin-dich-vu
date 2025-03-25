import { useState,useEffect } from "react";
import {useForm} from "@components/FormInput";

import { COMMON_STYLES } from "@styles/common_styles";
import { TextInput } from "@components/TextInput";
import { TextFieldProps } from "@components/TextInput"; 
import PopUp from "@components/pop-up";


export interface ClassNameProps {
    input?: string;
    label?: string;
    wrapper?: string;
    iconClassname?: string;
}


const newPassword: TextFieldProps = {
    name: "newPassword",
    label: "Nhập mật khẩu mới",
    type: "password",
    required: true,
    placeholder: "Nhập mật khẩu mới",
    validation: {
        // mật khẩu có ít nhất 1 chữ cái viết hoa
        upper: {
        value: /^(?=.*[A-Z])/,
        message: "Mật khẩu phải có ít nhất 1 chữ cái viết hoa",
        },
        // mật khẩu có ít nhất 1 chữ cái viết thường
        lower: {
        value: /^(?=.*[a-z])/,
        message: "Mật khẩu phải có ít nhất 1 chữ cái viết thường",
        },
        // mật khẩu có ít nhất 1 chữ số
        number: {
        value: /^(?=.*[0-9])/,
        message: "Mật khẩu phải có ít nhất 1 chữ số",
        },
        // mật khẩu có ít nhất 1 ký tự đặc biệt (!,@,#,%)
        special: {
        value: /^(?=.*[!@#%])/,
        message: "Mật khẩu phải có ít nhất 1 ký tự đặc biệt (!,@,#,%)",
        },
        // Kiểm tra mật khẩu có ít nhất 8 ký tự
        minLength: {
        value: 8,
        message: "Mật khẩu phải có ít nhất 6 ký tự",
        },
    },
}

const confirmPassword: TextFieldProps = {
    name: "confirmPassword",
    label: "Nhập lại mật khẩu",
    type: "password",
    required: true,
    placeholder: "Nhập lại mật khẩu",
}

export function ResetPasswprdInput(className: ClassNameProps){
     const { errors, touched, values } = useForm(); // Lấy giá trị từ context form
      const [newPasswordLocalError, setNewPasswordLocalError] = useState<string | null>(null);
      const [confirmPasswordLocalError, setConfirmPasswordLocalError] = useState<string | null>(null);
      const [showPopup, setShowPopup] = useState(true);
      
      const iconInfo = {
        icon: "./assets/icons/info.svg",
        alt: "info",
        iconClassName: className.iconClassname
      }
      
      // Kiểm tra nếu input có giá trị thì áp dụng style inputFilled
      const hasValue = values[newPassword.name] ? true : false;
      const hasConfirmValue = values[confirmPassword.name] ? true : false;

        // Tự động kiểm tra validation khi giá trị thay đổi
        useEffect(() => {
            // Validate newPassword
            if (hasValue) {
                let errorMessage = null;
                
                for (const rule in newPassword.validation) {
                    // Handle different validation rule types
                    if (rule === 'minLength') {
                        // Length validation
                        if (values[newPassword.name].length < newPassword.validation[rule].value) {
                            errorMessage = newPassword.validation[rule].message;
                            break;
                        }
                    } else if (newPassword.validation[rule].value instanceof RegExp) {
                        // RegExp validation
                        if (!newPassword.validation[rule].value.test(values[newPassword.name])) {
                            errorMessage = newPassword.validation[rule].message;
                            break;
                        }
                    }
                }
                
                setNewPasswordLocalError(errorMessage);
            } else {
                setNewPasswordLocalError(null);
            }

            // Validate confirmPassword
            if (hasConfirmValue) {
                if (values[confirmPassword.name] !== values[newPassword.name]) {
                    setConfirmPasswordLocalError("Mật khẩu không khớp");
                } else {
                    setConfirmPasswordLocalError(null);
                }
            } else {
                setConfirmPasswordLocalError(null);
            }
        }, [values[newPassword.name], values[confirmPassword.name], hasValue, hasConfirmValue]);

        // Kiểm tra lỗi: hiển thị lỗi nếu trường đã chạm vào hoặc trường đã có giá trị
        let newPasswordError = (touched[newPassword.name] || hasValue) ? (errors[newPassword.name] || newPasswordLocalError) : null;

        let confirmPasswordError = (touched[confirmPassword.name] || hasConfirmValue) ? (errors[confirmPassword.name] || confirmPasswordLocalError) : null;
            
        // Thêm class cho input khi bị lỗi
        const newPasswordInputClass = `${COMMON_STYLES.input || ''} ${newPasswordError ? `${COMMON_STYLES.inputError} focus:outline focus:outline-2 focus:outline-red-500` : ''} ${hasValue ? COMMON_STYLES.inputFilled : ''}`;

        const confirmPasswordInputClass = `${COMMON_STYLES.input || ''} ${confirmPasswordError ?
            `${ COMMON_STYLES.inputError} focus:outline focus:outline-2 focus:outline-red-500` : ''} ${hasConfirmValue ? COMMON_STYLES.inputFilled : ''}`;
        

    return(
        <>
        {showPopup && <PopupNoti onClose={() => setShowPopup(false)} />}
        <div className="relative">
            <TextInput 
            id={newPassword.name}
            name={newPassword.name}
            label={newPassword.label}
            required={newPassword.required}
            type={newPassword.type}
            placeholder={newPassword.placeholder}
            validationRules={newPassword.validation}
            inputClassName={`${newPasswordInputClass} ${className.input}`}
            labelClassName={className.label}
            wrapperClassName={className.wrapper}
            />

            {/* nhấn vào icon để hiển thị pop up */}
            <img src={iconInfo.icon} alt={iconInfo.alt} className={iconInfo.iconClassName} onClick={() => setShowPopup
            (true)} />

        </div>
        <TextInput
        id={confirmPassword.name}
        name={confirmPassword.name}
        label={confirmPassword.label}
        required={confirmPassword.required}
        type={confirmPassword.type}
        placeholder={confirmPassword.placeholder}
        validationRules={confirmPassword.validation}
        inputClassName={`${confirmPasswordInputClass} ${className.input}`}
        labelClassName={className.label}
        wrapperClassName={className.wrapper}
        />
        </>
    )
}


const notiMessage={
    title:"Quy định đặt mật khẩu",
    content: <ul className="text-left list-disc pl-5">
        <li>Phải có ít nhất một chữ cái viết hoa</li>
        <li>Phải có ít nhất một chữ cái viết thường</li>
        <li>Phải có ít nhất một chữ số</li>
        <li>Phải có ít nhất một ký tự đặc biệt (!,@,#,%)</li>
        <li>Độ dài tối thiếu 8 ký tự</li>
    </ul>
}

export function PopupNoti({ onClose }: { onClose: () => void }) {
    
    return(
        <PopUp
        header={
            <div className="flex flex-row justify-center items-center  font-bold">
                <img src='./assets/icons/info.svg' className="cursor-pointer" alt="info"/> 
                <h1 className=" ml-2 text-md md:text-lg lg:text-xl">{notiMessage.title}</h1>
            </div>
            }
            content={notiMessage.content}
            showOverlay={true}
            onClose={onClose}
        />
    )
}