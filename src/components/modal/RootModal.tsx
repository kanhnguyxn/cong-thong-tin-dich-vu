import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";

import CustomButton, { ButtonProps } from "@components/button";
import { Container } from "@components/Container";
import { inputProps } from "@components/form/Form";
import ICONS from "@components/icons";
import AlertModal from "./AlertModal";
import FormModal from "./FormModal";
import NotiModal from "./NotiModal";

const icons = {
  warning: ICONS.WARNING,
  info: "ℹ️",
  success: ICONS.SUCCESS,
  error: ICONS.FAIL,
};

let modalRoot = null;
let activeModal = null; // Track the active modal
let activeResolve = null;

interface ModalProps {
  title?: string;
  text?: string;
  icon?: "success" | "error" | "warning" | "info" | string;
  type?: "alert" | "notification" | "form";
  buttonConfirmText?: string;
  buttonCancelText?: string;
  showCancelButton?: boolean;
  showNoButton?: boolean;
  preConfirm?: () => Promise<any>;
  inputs?: Array<inputProps> | [];
  editData?: object;
  formOrientation?: "horizontal" | "vertical";
  handleAsyncSubmit?: (data?: any) => Promise<any>;
  handleSubmitForm?: (data?: any) => void;
  orientation?: "horizontal" | "vertical";
  styleFormModal?: string; // Optional prop for custom styles
  classContainer?: string; // Optional prop for custom container class
}

interface ModalButtonProps extends ButtonProps {
  visibility?: boolean;
  label: string; // Required to match ButtonFormItem
}

export type ModalResult = {
  confirm: boolean;
  cancel: boolean;
  [key: string]: any;
};

export function showModal({
  title = "",
  text = "",
  buttonConfirmText = "Xác nhận",
  buttonCancelText = "Hủy",
  icon = "warning",
  type = "alert",
  preConfirm,
  handleAsyncSubmit,
  handleSubmitForm,
  showCancelButton = true,
  showNoButton = false,
  inputs,
  classContainer = "",
  orientation,
  styleFormModal = "",
  editData,
  formOrientation,
}: ModalProps): Promise<ModalResult> {
  // Close any existing modal before creating a new one
  if (modalRoot && activeModal) {
    modalRoot.unmount();
    if (activeResolve) {
      activeResolve("replaced");
    }
    modalRoot = null;
    activeModal = null;
    activeResolve = null;
  }

  const container = document.createElement("div");
  document.body.appendChild(container);
  activeModal = container;

  modalRoot = createRoot(container);
  return new Promise((resolve) => {
    activeResolve = resolve;

    function Modal() {
      const [loading, setLoading] = useState(false);

      useEffect(() => {
        if (type !== "notification") return;
        function autoTurnOff(ms: number) {
          setTimeout(() => {
            if (activeModal) {
              handleOutsideClick();
            }
          }, ms);
        }
        autoTurnOff(30000); // Auto close after 3 seconds
      }, []);

      // Called when the user clicks the button
      const handleConfirm = (resData?: any) => {
        unmountModal();
        resolve({ confirm: true, cancel: false, data: resData });
      };

      // Handles outside click
      const handleOutsideClick = () => {
        unmountModal();
        resolve({ confirm: false, cancel: false });
      };

      const handleCancel = () => {
        unmountModal();
        resolve({ confirm: false, cancel: true });
      };

      const handleAsyncConfirm = async (data?: any) => {
        if (!preConfirm && !handleAsyncSubmit) {
          handleConfirm();
        }
        setLoading(true);
        try {
          const resData = preConfirm && (await preConfirm());
          handleAsyncSubmit && (await handleAsyncSubmit(data));
          handleConfirm(resData);
        } catch (e) {
          // Optionally, handle error (stay open, show error, etc.)
          setLoading(false);
        }
      };

      const unmountModal = () => {
        modalRoot.unmount();
        activeModal = null;
        activeResolve = null;
      };
      const commonConfig = {
        variants: "contained" as "contained" | "outlined" | "text",
        size: "medium" as "small" | "medium" | "large",
        sx: { width: "35%", backgroundColor: "var(--color-blue)" },
      };
      // Default type for buttons
      const buttons: Array<ModalButtonProps> = useMemo(() => {
        return [
          {
            label: buttonConfirmText,
            type: "submit",
            onClick:
              type === "form"
                ? null
                : preConfirm
                ? handleAsyncConfirm
                : handleConfirm,
            visibility: showNoButton ? false : true,
            loading: loading,
            disabled: loading,
            ...commonConfig,
          },
          {
            label: buttonCancelText,
            type: "button",
            onClick: handleCancel,
            disabled: loading,
            visibility: showNoButton ? false : showCancelButton,
            ...commonConfig,
          },
        ];
      }, [loading]);

      const getWidthClass = (type) => {
        if (type === "notification") return "w-[20%]";
        if (type === "alert") return "w-[25%]";
        return "w-[32%]";
      };

      const containerClass = classContainer || getWidthClass(type);
      return createPortal(
        <div
          className="fixed top-0 left-0 min-w-full min-h-full bg-[var(--color-gray-light)] z-50 flex justify-center items-center "
          onClick={loading ? undefined : handleOutsideClick}
        >
          <Container
            className={`z-50 zoom-in ${containerClass}`}
            onClick={(e) => e.stopPropagation()}
          >
            {type === "alert" && (
              <AlertModal title={title} text={text} icon={icons[icon]} />
            )}
            {type === "notification" && (
              <NotiModal title={title} icon={icons[icon]} />
            )}
            {type === "form" ? (
              <FormModal
                handleSubmit={(data) => {
                  if (handleAsyncSubmit) {
                    handleAsyncConfirm(data);
                    return;
                  }
                  handleSubmitForm && handleSubmitForm(data);
                  handleConfirm(data);
                }}
                title={title}
                inputSchema={inputs}
                editData={editData}
                formOrientation={formOrientation}
                buttons={buttons.filter((button) => button.visibility)}
                styleFormModal={styleFormModal}
              />
            ) : (
              <div className="flex flex-row items-center justify-around">
                {buttons.map((button, index) => {
                  return (
                    button.visibility && (
                      <CustomButton
                        key={index}
                        variants={"contained"}
                        size={"medium"}
                        sx={{
                          width: "35%",
                          backgroundColor: "var(--color-blue)",
                        }}
                        label={button.label}
                        onClick={button.onClick}
                        loading={button.loading}
                        disabled={button.disabled}
                      />
                    )
                  );
                })}
              </div>
            )}
          </Container>
        </div>,
        container
      );
    }

    modalRoot.render(<Modal />);
  });
}
