import { useState } from "react";

import FormInputControl from "./FormInputControl";
import CustomButton from "@components/button";
import { COMMON_STYLES } from "@styles/common_styles";
import Form from "next/form";

interface FormProps {
  className?: string;
  inputSchema: Array<any>;
  onSubmit: (formData: Object) => void;
  formErrMsg?: string;
  buttons?: Array<any>;
  buttonClassName?: string;
  renderLink?: () => JSX.Element;
}

export default function FormMui({
  inputSchema,
  onSubmit,
  className,
  formErrMsg = "",
  buttons = [],
  buttonClassName = "",
  renderLink = () => <></>,
  ...rest
}: FormProps) {
  const [formData, setFormData] = useState({});
  // lưu lại các lỗi của các trường
  const [errors, setErrors] = useState({});

  // kiêm tra validation cua tùng trường
  const validateField = (field: any, value: string, formData: any) => {
    // Xét độ trống của trường
    if (!checkEmptyField(field, value)) {
      return false;
    }
    const validations = field.validations;
    if (validations && validations.length > 0) {
      let errMsg: string;
      let flag = validations.every((val: any) => {
        if (val?.rule && !val.rule(value, formData)) {
          errMsg = val?.errMessage;
          return false;
        }
        return true;
      });

      setErrors((prevErrors) => ({
        ...prevErrors,
        [field.name]: flag ? "" : errMsg,
      }));

      return flag;
    }

    // đúng hết -> xoá lỗi
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field.name]: "",
    }));
    return true;
  };

  // kiểm tra dữ liệu của các trường bắt buộc
  const checkEmptyField = (field: any, value: string) => {
    if (value.length === 0 && field.required) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field.name]: "Hãy nhập thông tin",
      }));
      return false;
    }
    return true;
  };

  const handleChange = (name: string, value: any) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // console.log("formData", formData);
  };

  const handleSubmit = (e) => {
    //  kiểm tra các validation của các trường còn lỗi không
    const hasErrors = Object.keys(errors).some((key) => errors[key].length > 0);
    if (hasErrors) {
      return;
    }
    let flag = true;

    // kiểm tra các trường bắt buộc
    inputSchema.forEach((field: any) => {
      if (field.required) {
        const value = formData[field.name] || "";
        if (!checkEmptyField(field, value)) {
          flag = false;
        }
      }
    });
    if (!flag) {
      return;
    }

    onSubmit(formData);

    // setFormData({}) // Reset form data after submission
  };

  const handleBlur = (field: any, value: string) => {
    validateField(field, value, formData);
  };

  return (
    <Form
      className={`${className} ${formErrMsg ? "mt-0" : "mt-2"}`}
      action={handleSubmit}
    >
      {formErrMsg && (
        <div className="text-red-500 text-sm md:text-[15px] lg:text-base uppercase mt-2 md:mt-3 text-left font-semibold">
          {formErrMsg}
        </div>
      )}
      {inputSchema.map((field: any, index: number) => {
        const { name, type, placeholder, label, className, ...rest } = field;
        return (
          <FormInputControl
            key={index}
            field={field}
            onChange={(value) => handleChange(name, value)}
            placeholder={placeholder}
            type={type}
            value={formData[name] || ""}
            onBlur={(value: any) => handleBlur(field, value)}
            errMessage={errors[name]}
            name={name}
            className={`${COMMON_STYLES.input} ${className} `}
            label={label}
            {...rest}
          />
        );
      })}
      {renderLink && <>{renderLink()}</>}

      {/* có nhiều button hoặc 1 */}
      {buttons.length > 0 && (
        <div className={buttonClassName}>
          {buttons.map((button: any, index: number) => {
            const { label, className, ...rest } = button;
            return (
              <CustomButton
                key={index}
                label={label}
                className={`${className}`}
                {...rest}
              />
            );
          })}
        </div>
      )}
    </Form>
  );
}
