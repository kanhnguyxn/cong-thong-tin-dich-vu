"use client";

import { useState } from "react";

import CustomButton from "@components/button";
import FormInputControl from "@components/form/FormInputControl";
import { Grid } from "@mui/material";
import FieldForm from "./FieldForm";

export default function page({}) {
  const [formName, setFormName] = useState("");
  const [fieldData, setFieldData] = useState<any[]>([]);
  const [numfields, setNumFields] = useState<number>(0);

  const handleOnChangeField = (value: any, index: number) => {
    setFieldData((prev) => {
      const newData = [...prev];
      newData[index] = value;
      return newData;
    });
  };

  const addField = () => {
    setFieldData((prev) => [...prev, {}]);
    setNumFields((prev) => prev + 1);
  };

  const onRemoveField = (id: number) => {
    const newFieldData = fieldData.filter((_, index) => {
      return index !== id;
    });
    setFieldData(newFieldData);
    setNumFields((prev) => prev - 1);
  };
  return (
    <div className="flex flex-col w-[60%] h-full items-center justify-start gap-4 p-4 bg-gray-100 rounded-lg shadow-md position-relative">
      <FormInputControl
        name="tenDon"
        label="Tên đơn"
        value={formName}
        placeholder="Nhập tên đơn"
        formControlStyle={{
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
        lableRender={() => (
          <span className="text-lg font-semibold">Tên đơn</span>
        )}
        onChange={(value) => {
          setFormName(value as string);
        }}
      ></FormInputControl>
      {Array.from({ length: numfields }).map((_, index) => (
        <FieldForm
          key={`field${index}`}
          value={fieldData[index]}
          onRemove={() => onRemoveField(index)}
          label={`Trường thông tin ${index + 1}`}
          onChange={(value: any) => {
            handleOnChangeField(value, index);
          }}
        />
      ))}
      <Grid
        container
        spacing={2}
        className="w-full flex justify-around mt-10 mb-36"
      >
        <Grid size={5}>
          <CustomButton
            label="Thêm trường thông tin"
            sx={{ width: "100%", backgroundColor: "var(--color-blue)" }}
            onClick={addField}
          ></CustomButton>
        </Grid>
        <Grid size={3}>
          <CustomButton
            label="Lưu đơn"
            sx={{ width: "100%", backgroundColor: "var(--color-blue)" }}
            onClick={() => {
              console.log("Form data:", {
                tendon: formName,
                thongtinchitiet: fieldData.map((field, index) => ({
                  name: `field${index + 1}`,
                  ...field,
                })),
              });
            }}
          ></CustomButton>
        </Grid>
      </Grid>
    </div>
  );
}
