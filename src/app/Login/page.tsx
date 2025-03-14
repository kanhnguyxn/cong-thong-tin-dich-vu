"use client";
import React from "react";

import { Form } from "@components/FormInput";
import { TextInput } from "@components/TextInput";
import { Container } from "@components/Container";

const Form_info={
    title: "Cổng Thông tin-Dịch vụ",
    subtitle: "Đăng nhập",
    username: {
        name: "username",
        required: true,
        type:"text",
        placeholder: "username",
        validation: [
            (value: string) => {
                if (!value) return "Tên đăng nhập không được để trống";
                return null;
            }
        ]
    },
    password:{
        name: "password",
        required: true,
        type: "password",
        placeholder: "password",
        validation: [
            (value: string) => {
                if (!value) return "Mật khẩu không được để trống";
                return null;
            }
        ]
    }
}

// css format
const formClassName = "";
const inputClassName = "w-full px-3 py-2 border rounded mb-4";
const labelClassName = "block text-sm font-semibold text-gray-600 mb-1";
const buttonClassName = "w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4";

export default function LoginPage(){
    const handleSubmit = (values: Record<string, string>) => {
        console.log('Form submitted with:', values);
        // Add your authentication logic here
    };
    
    return(
        <Container
            className="w-full m-5 md:w-[60%] lg:w-[30%]"
            title={Form_info.title}
            subTitle={Form_info.subtitle}
            content={
                <Form
                    className={formClassName}
                    onSubmit={handleSubmit}
                >
                    <TextInput
                        id={Form_info.username.name}
                        name={Form_info.username.name}
                        label={Form_info.username.label}
                        required={Form_info.username.required}
                        type={Form_info.username.type}
                        placeholder={Form_info.username.placeholder}
                        wrapperClassName="mb-4"
                        labelClassName={labelClassName}
                        inputClassName={inputClassName}
                        validation={Form_info.username.validation}
                    />
                    <TextInput
                        id={Form_info.password.name}
                        name={Form_info.password.name}
                        label={Form_info.password.label}
                        required={Form_info.password.required}
                        type={Form_info.password.type}
                        placeholder={Form_info.password.placeholder}
                        wrapperClassName="mb-6"
                        labelClassName={labelClassName}
                        inputClassName={inputClassName}
                        validation={Form_info.password.validation}
                    />
                    <button 
                        type="submit"
                        className={buttonClassName}
                    >
                        Đăng nhập
                    </button>
                </Form>
            }
        />
    );
}





