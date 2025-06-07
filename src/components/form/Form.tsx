import { useEffect, useState } from "react";

import CustomButton from "@components/button";
import { COMMON_STYLES } from "@styles/common_styles";
import moment from "moment";
import FormInputControl from "./FormInputControl";

export type inputProps = {
  name: string;
  type: string;
  placeholder?: string;
  label: string;
  className?: string;
  required?: boolean;
  validations?: Array<any>;
  customeLabelStyle?: object;
  selectOptions?: Array<{ display: string; value: any }>;
  [key: string]: any;
};

export interface FormProps {
  editData?: any;
  className?: string;
  inputSchema: Array<inputProps>;
  onSubmit?: (formData: Object) => void;
  formErrMsg?: string;
  buttons?: Array<any>;
  buttonClassName?: string;
  renderLink?: () => JSX.Element;
  orientation?: "horizontal" | "vertical";
}

export default function FormMui({
  editData,
  inputSchema,
  onSubmit,
  className,
  formErrMsg = "",
  buttons = [],
  buttonClassName = "",
  renderLink = () => <></>,
  orientation = "vertical",
  ...rest
}: FormProps) {
  const [formData, setFormData] = useState({});
  // lưu lại các lỗi của các trường
  const [errors, setErrors] = useState({});

  /*--------------------EFFECT-----------------------*/
  useEffect(() => {
    let _formData = rebuilDefaultFormData();
    if (editData) {
      inputSchema.forEach((field: any) => {
        // nếu trường có giá trị trong editData thì set giá trị đó vào formData
        if (field.type === "date" && editData[field.name]) {
          _formData[field.name] = moment(editData[field.name], "DD/MM/YYYY");
          return;
        }

        if (editData[field.name] !== undefined || null) {
          _formData[field.name] = editData[field.name];
          return;
        }
      });
    }

    setFormData(_formData);
  }, [editData]);

  const rebuilDefaultFormData = () => {
    let _formData: any = {};
    inputSchema.forEach((field: any) => {
      // nếu trường có giá trị trong editData thì set giá trị đó vào formData

      if (field.type === "date") {
        _formData[field.name] = moment(field.defaultValue ? field.defaultValue : new Date());
        return;
      }

      if (field.defaultValue !== undefined) {
        _formData[field.name] = field.defaultValue || "";
        return;
      }
    });
    return _formData;
  };
  // kiêm tra validation cua tùng trường
  const validateField = (field: any, value: any, formData: any) => {
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
  /*--------------------HELPER FUNCTION-----------------------*/
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
  };

  const handleSubmit = (e) => {
    //  kiểm tra các validation của các trường còn lỗi không
    e.preventDefault();
    const hasErrors = Object.keys(errors).some((key) => errors[key].length > 0);
    if (hasErrors) {
      return;
    }
    let flag = true;
    const postData = { ...formData };
    // kiểm tra các trường bắt buộc
    inputSchema.forEach((field: any) => {
      if (field.required) {
        const value = postData[field.name] || "";
        if (!checkEmptyField(field, value)) {
          flag = false;
        }
      }
      if (field.type === "date" && postData[field.name]) {
        postData[field.name] = postData[field.name].format("DD/MM/YYYY");
      }
    });
    if (!flag) {
      return;
    }
    onSubmit(postData);

    // setFormData({}) // Reset form data after submission
  };

  const handleBlur = (field: any, value: string) => {
    validateField(field, value, formData);
  };

  return (
    <form className={`${className} ${formErrMsg ? "mt-0" : "mt-2"}`} onSubmit={handleSubmit}>
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
            value={formData[name]}
            onBlur={(value: any) => handleBlur(field, value)}
            errMessage={errors[name]}
            name={name}
            className={`${COMMON_STYLES.input} ${className} `}
            label={label}
            orientation={orientation}
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
            return <CustomButton key={index} label={label} className={`${className}`} {...rest} />;
          })}
        </div>
      )}
    </form>
  );
}
