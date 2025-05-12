import CustomButton from "@components/button";
import { Container } from "@components/Container";
import { useState } from "react";

export default function AddButton() {
  const [open, setOpen] = useState(false);

  const buttons: ButtonFormItem[] = [
    {
      label: "Xác nhận",
      type: "submit",
      variants: "contained",
      size: "large",
    },
    {
      label: "Hủy",
      type: "button",
      variants: "contained",
      size: "large",
      onClick: () => {
        setOpen(false);
      },
    },
  ];

  return (
    <>
      <CustomButton
        label="Thêm"
        type="button"
        variants="contained"
        size="large"
        onClick={() => {
          setOpen(true);
        }}
        sx={{ backgroundColor: "var(--color-blue)" }}
      />
      {open && (
        <div>
          <Container
            children={
              <>
                <h6 className="uppercase text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                  Thêm biểu mẫu
                </h6>
                <form className="flex flex-col gap-4">
                  <label>Chọn biểu mẫu</label>
                  <input type="file" />
                  <div>
                    {buttons.map((button, index) => (
                      <CustomButton
                        key={index}
                        label={button.label}
                        type={button.type}
                        variants={button.variants}
                        size={button.size}
                        onClick={button.onClick}
                      />
                    ))}
                  </div>
                </form>
              </>
            }
          />
        </div>
      )}
    </>
  );
}
