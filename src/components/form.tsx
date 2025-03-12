import React, {ChangeEvent,ReactNode, useState} from "react";

// dùng để kiểm tra dữ liệu nhập vào đúng luật hay không
// nhận vào một giá trị bất kỳ và trả về một chuỗi lỗi hoặc null nếu hợp lệ
type ValidatorRule = (value: any)=> string|null;

// những trường cơ bản cho mọi loại input
interface BaseFieldProps {
    id?:string;
    name: string;
    lable?: string;
    // bắt buộc nhập hoặc không
    required?: boolean;
    // style cho input
    className?: string;
    // các luật kiểm tra
    validation?: ValidatorRule[];
    // hàm xử lý khi giá trị thay đổi (void không trả về dữ liệu nào)
    onChange?: (value: any)=> void;
}

// TEXT INPUT

interface TextFieldProps extends BaseFieldProps {
    type: "text" | "password" | "email" | 'number'| 'tel';
    plaholder?: string;
    // giá trị mặc định
    value?: string;
    maxLength?: number;
}

export function textInput(props: TextFieldProps){
    const {id, name,lable, required, className, validation, onChange, type, plaholder, value, maxLength} = props;

    const [inputValue, setInputValue] = useState(value || '');
    const [error, setError]= useState<string|null>(null);

    const handleChange =(e: ChangeEvent<HTMLInputElement>)=>{
        const newValue = e.target.value;
        setInputValue(newValue);

        if(validation){
            for (const rule of validation){
                const errorMessage = rule(newValue);
                if(errorMessage){
                    setError(errorMessage);
                    return;
                }else{
                    setError(null);
                }
            }
        }

        if (onChange) onChange(newValue);

    }
    return(
        <div className={`form-fiels ${className}`}>{lable && <label htmlFor={id || name}>{lable}{required && <span className="required">*</span>}</label>}
        <input
        id={id || name}
        name={name}
        type={type}
        placeholder={plaholder}
        value={inputValue}
        maxLength={maxLength}
        onChange={handleChange}
        required={required}
        className={error ? 'error' : ''} 
        />
        {error && <span className="error-message">{error}</span>}
        </div>
    )

}

// TEXTAREA
interface TextAreaFieldProps extends BaseFieldProps {
    placeholder?: string;
    value?: string;
    rows?: number;
    cols?: number;
}

export function textAreaInput(props: TextAreaFieldProps){
    const {id, name, lable, required, className, validation, onChange, placeholder, value, rows, cols} = props;

    const [inputValue, setInputValue] = useState(value);
    const [error, setError]= useState<string|null>(null);

    const handleChange =(e: ChangeEvent<HTMLTextAreaElement>)=>{
        const newValue = e.target.value;
        setInputValue(newValue);

        if(validation){
            for (const rule of validation){
                const errorMessage = rule(newValue);
                if(errorMessage){
                    setError(errorMessage);
                    return;
                }else{
                    setError(null);
                }
            }
        }

        if (onChange) onChange(newValue);

    }
    return(
        <div className={`form-fiels ${className}`}>{lable && <label htmlFor={id || name}>{lable}{required && <span className="required">*</span>}</label>}
        <textarea
        id={id || name}
        name={name}
        placeholder={placeholder}
        value={inputValue}
        rows={rows}
        cols={cols}
        onChange={handleChange}
        required={required}
        className={error ? 'error' : ''} 
        />
        {error && <span className="error-message">{error}</span>}
        </div>
    )

}

// SELECT INPUT
interface SelectOption{
    value: string;
    lable:string;
}

interface SelectFieldProps extends BaseFieldProps{
    options: SelectOption[];
    value?:string;
    placeholder?:string;
}

export function selectInput(props: SelectFieldProps){
    const {id, name, lable, required, className, validation, onChange, options, value, placeholder} = props;

    const [inputValue, setInputValue] = useState(value);
    const [error, setError]= useState<string|null>(null);

    const handleChange =(e: ChangeEvent<HTMLSelectElement>)=>{
        const newValue = e.target.value;
        setInputValue(newValue);

        if(validation){
            for (const rule of validation){
                const errorMessage = rule(newValue);
                if(errorMessage){
                    setError(errorMessage);
                    return;
                }else{
                    setError(null);
                }
            }
        }

        if (onChange) onChange(newValue);

    }
    return(
        <div className={`form-fiels ${className}`}>{lable && <label htmlFor={id || name}>{lable}{required && <span className="required">*</span>}</label>}
        <select
        id={id || name}
        name={name}
        value={inputValue}
        onChange={handleChange}
        required={required}
        className={error ? 'error' : ''} 
        >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(option => <option key={option.value} value={option.value}>{option.lable}</option>)}
        </select>
        {error && <span className="error-message">{error}</span>}
        </div>
    )
}

// CHECKBOX
interface CheckboxFieldProps extends BaseFieldProps{
    value?: boolean;
}

export function checkboxInput(props: CheckboxFieldProps){
    const {id, name, lable, required, className, validation, onChange, value} = props;

    const [inputValue, setInputValue] = useState(value || false);
    const [error, setError]= useState<string|null>(null);

    const handleChange =(e: ChangeEvent<HTMLInputElement>)=>{
        const newValue = e.target.checked;
        setInputValue(newValue);

        if(validation){
            for (const rule of validation){
                const errorMessage = rule(newValue);
                if(errorMessage){
                    setError(errorMessage);
                    return;
                }else{
                    setError(null);
                }
            }
        }

        if (onChange) onChange(newValue);

    }
    return(
        <div className={`form-fiels ${className}`}>
        <label>
        <input
        id={id || name}
        name={name}
        type="checkbox"
        checked={inputValue}
        onChange={handleChange}
        required={required}
        className={error ? 'error' : ''} 
        />
        {lable}
        </label>
        {error && <span className="error-message">{error}</span>}
        </div>
    )
}

// RADIO
interface RadioFieldProps extends BaseFieldProps{
    options: SelectOption[];
    value?: string;
}

export function radioInput(props: RadioFieldProps){
    const {id, name, lable, required, className, validation, onChange, options, value} = props;

    const [inputValue, setInputValue] = useState(value);
    const [error, setError]= useState<string|null>(null);

    const handleChange =(e: ChangeEvent<HTMLInputElement>)=>{
        const newValue = e.target.value;
        setInputValue(newValue);

        if(validation){
            for (const rule of validation){
                const errorMessage = rule(newValue);
                if(errorMessage){
                    setError(errorMessage);
                    return;
                }else{
                    setError(null);
                }
            }
        }

        if (onChange) onChange(newValue);

    }
    return(
        <div className={`form-fiels ${className}`}>{lable && <label>{lable}{required && <span className="required">*</span>}</label>}
        {options.map(option => (
            <label key={option.value}>
            <input
            id={id || name}
            name={name}
            type="radio"
            value={option.value}
            checked={inputValue === option.value}
            onChange={handleChange}
            required={required}
            className={error ? 'error' : ''} 
            />
            {option.lable}
            </label>
        ))}
        {error && <span className="error-message">{error}</span>}
        </div>
    )
}

// FILE INPUT
interface FileFieldProps extends BaseFieldProps{
    accept: string;
    multiple?: boolean;
}

export function fileInput(props: FileFieldProps){
    const {id, name, lable, required, className, validation, onChange, accept, multiple} = props;

    const [inputValue, setInputValue] = useState<FileList | null>(null);
    const [error, setError]= useState<string|null>(null);

    const handleChange =(e: ChangeEvent<HTMLInputElement>)=>{
        const newValue = e.target.files;
        setInputValue(newValue);

        if(validation){
            for (const rule of validation){
                const errorMessage = rule(newValue);
                if(errorMessage){
                    setError(errorMessage);
                    return;
                }else{
                    setError(null);
                }
            }
        }

        if (onChange) onChange(newValue);

    }
    return(
        <div className={`form-fiels ${className}`}>{lable && <label>{lable}{required && <span className="required">*</span>}</label>}
        <input
        id={id || name}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        required={required}
        className={error ? 'error' : ''} 
        />
        {error && <span className="error-message">{error}</span>}
        </div>
    )
}

// FORM
// ReactNode là kiểu dữ liệu cho phép truyền vào bất kỳ dữ liệu nào có thể render ra giao diện
// VD: string, number, element, component
// ReactElement chir elenent 

interface FormProps{
    className?: string;
    children: ReactNode;
    onSubmit: ()=> void;
}

export function Form(props: FormProps){
    const {children, onSubmit, className} = props;
    const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
        // ngawn chan hanh vi mac dinh cua form(tai lai form)
        e.preventDefault();
        onSubmit();
    }
    return(
        <form className={`form ${className}`}onSubmit={handleSubmit}>
        {children}
        </form>
    )
}


// Exporting the types for usage in other components
export type {
    ValidatorRule,
    BaseFieldProps,  
    TextFieldProps,
    TextAreaFieldProps,
    SelectOption,
    SelectFieldProps,
    CheckboxFieldProps,
    RadioFieldProps
};
