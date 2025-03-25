import React from "react";
import Button from "@components/Button";
import { EnhancedInput } from "../EnhancedInput";
import { FORGOT_PASSWORD_FORM_CONFIG } from "../config";
import { STYLES } from "../styles";

interface OtpFormProps {
  onCancel: () => void;
  isSubmitting: boolean;
}

const OtpForm: React.FC<OtpFormProps> = ({ onCancel, isSubmitting }) => {
  return (
    <>
      <EnhancedInput
        field={FORGOT_PASSWORD_FORM_CONFIG.otp}
        className={STYLES.input}
      />
      
      <div className={STYLES.footer}>
        <Button
          type="button"
          className={`${STYLES.button} ${STYLES.button_cancel}`}
          onClick={onCancel}
        >
          {FORGOT_PASSWORD_FORM_CONFIG.buttons.cancel}
        </Button>
        <Button
          type="submit"
          className={`${STYLES.button} ${STYLES.button_confirm}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? FORGOT_PASSWORD_FORM_CONFIG.buttons.loading : FORGOT_PASSWORD_FORM_CONFIG.buttons.confirm}
        </Button>
      </div>
    </>
  );
};

export default OtpForm;
