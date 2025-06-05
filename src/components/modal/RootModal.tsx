import { useState } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";

import CustomButton from "@components/button";
import { Container } from "@components/Container";
import ICONS from "@components/icons";
import AlertModal from "./AlertModal";
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
  type?: "alert" | "notification";
  buttonConfirmText?: string;
  buttonCancelText?: string;
  showCancelButton?: boolean;
  showNoButton?: boolean;
  preConfirm?: () => Promise<any>;
}

interface ModalReuslt {
  confirm: boolean;
  cancel: boolean;
}

export function showModal({
  title = "",
  text = "",
  buttonConfirmText = "Xác nhận",
  buttonCancelText = "Hủy",
  icon = "warning",
  type = "alert",
  preConfirm,
  showCancelButton = true,
  showNoButton = false,
}: ModalProps) {
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

      // Called when the user clicks the button
      const handleConfirm = () => {
        unmountModal();
        resolve({ confirm: true, cancel: false });
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

      const handleAsyncConfirm = async () => {
        setLoading(true);
        try {
          await preConfirm();
          handleConfirm();
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

      return createPortal(
        <div
          className="fixed top-0 left-0 min-w-full min-h-full bg-[var(--color-gray-light)] z-50 flex justify-center items-center "
          onClick={loading ? undefined : handleOutsideClick}
        >
          <Container className="z-50 zoom-in " onClick={(e) => e.stopPropagation()}>
            {type === "alert" && <AlertModal title={title} text={text} icon={icons[icon]} />}
            {type === "notification" && <NotiModal title={title} icon={icons[icon]} />}
            {!showNoButton && (
              <div className="grid grid-cols-2 gap-4">
                <CustomButton
                  sx={{ width: "100%", backgroundColor: "var(--color-blue)" }}
                  variants="contained"
                  label={buttonConfirmText}
                  onClick={preConfirm ? handleAsyncConfirm : handleConfirm}
                  loading={loading}
                  disabled={loading}
                />
                {showCancelButton && (
                  <CustomButton
                    sx={{ width: "100%", backgroundColor: "var(--color-blue)" }}
                    variants="contained"
                    label={buttonCancelText}
                    onClick={handleCancel}
                    disabled={loading}
                  />
                )}
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
