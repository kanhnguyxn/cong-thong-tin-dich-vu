"use client";
import CustomButton from "@components/button";
import FormInputControl from "@components/form/FormInputControl";
import { Grid } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

interface FieldFormProps {
  onChange?: (data: any) => void; // Callback to send data back to parent
  label?: string;
  onRemove?: (id?: number) => void;
  value?: any;
}
export default function FieldForm({ value, onChange, label = "", onRemove }: FieldFormProps) {
  const [numberOption, setNumberOption] = useState(value?.selectOptions?.length || 0);
  const [options, setOptions] = useState([]);

  const inputSchema = useMemo(
    () => [
      {
        type: "text",
        name: "label",
        placeholder: "Nhập tên trường",
        size: 3,
      },
      {
        type: "select",
        name: "type",
        placeholder: "Chọn loại trường",
        selectOptions: [
          { display: "Văn bản", value: "text" },
          { display: "Lựa chọn", value: "select" },
          { display: "radio", value: "radio-group" },
          { display: "checkbox", value: "checkbox-group" },
        ],
        size: 3,
      },
      {
        type: "select",
        name: "required",
        placeholder: "Bắt buộc nhập",
        selectOptions: [
          { display: "Bắt buộc", value: true },
          { display: "Không bắt buộc", value: false },
        ],
        size: 3,
      },
      {
        type: "text",
        name: "order",
        placeholder: "Thứ tự hiển thị",
        size: 3,
      },
      {
        type: "text",
        name: "description",
        placeholder: "Nhập mô tả ngắn",
        size: 12,
        rows: 3,
      },
    ],
    []
  );

  useEffect(() => {
    handleChange(options, "selectOptions");
  }, [options]);

  const handleChange = (_value: any, name: string) => {
    const submitData = {
      ...value,
      [name]: _value,
      selectOptions: options,
    };
    onChange && onChange(submitData);
  };
  return (
    <Grid container spacing={2} className="w-full bg-white p-4 rounded-lg shadow-md">
      <Grid size={12} className="flex items-center justify-baseline gap-4">
        {label}
        <CustomButton
          size="small"
          label="Xóa"
          variants="contained"
          onClick={() => {
            onRemove && onRemove();
          }}
        />
      </Grid>

      {inputSchema.map((field, index) => {
        return (
          <Grid key={index} size={field.size}>
            <FormInputControl
              type={field.type}
              name={field.name}
              selectOptions={field.selectOptions || []}
              placeholder={field.placeholder}
              rows={field.rows}
              value={value ? value[field.name] : ""}
              onChange={(value) => {
                handleChange(value, field.name);
              }}
            />
          </Grid>
        );
      })}

      {value && ["select", "radio-group", "checkbox-group"].includes(value["type"]) && (
        <Grid container size={12} className="flex items-center justify-between">
          {Array.from({ length: numberOption }).map((_, index) => (
            <Grid key={`option-${index}`} container size={12} className="ml-20" spacing={2}>
              <Grid size={10}>
                <FormInputControl
                  type="text"
                  name={`option-${index}`}
                  placeholder={`Tùy chọn ${index + 1}`}
                  value={options[index]}
                  onChange={(value) =>
                    setOptions((prev) => {
                      const newOptions = [...prev];
                      newOptions[index] = value;
                      return newOptions;
                    })
                  }
                />
              </Grid>

              <Grid size={2}>
                <CustomButton
                  label="Xóa"
                  onClick={() => {
                    const newFieldData = options.filter((_, _index) => {
                      return _index !== index;
                    });
                    setNumberOption(newFieldData);
                    setNumberOption(numberOption - 1);
                  }}
                />
              </Grid>
            </Grid>
          ))}
          <Grid size={12} className="flex justify-center">
            <CustomButton
              label="Thêm tùy chọn"
              onClick={() => {
                setNumberOption((prev) => prev + 1);
                setOptions((prev) => [...prev, ""]);
              }}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
