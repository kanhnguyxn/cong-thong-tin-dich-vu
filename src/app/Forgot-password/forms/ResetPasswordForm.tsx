import React from "react";
import Button from "@components/Button";
import { ResetPasswprdInput } from "@components/reset-password";
import { FORGOT_PASSWORD_FORM_CONFIG } from "../config";
import { STYLES } from "../styles";

interface ResetPasswordFormProps {
  isSubmitting: boolean;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ isSubmitting }) => {
  return (
    <>
      <ResetPasswprdInput 
        input={STYLES.input}
        label={STYLES.label}
        wrapper={STYLES.wrapper}
        // hãy chỉnh cho icon nằm phía bên phải của lable
        iconClassname="absolute right-1 top-1"

        
      />
        <Button
          type="submit"
          className={`font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-blue-700 cursor-pointer w-fit-content bg-[var(--color-blue)] text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4 px-6 py-2`}
          disabled={isSubmitting}
          name={isSubmitting ? FORGOT_PASSWORD_FORM_CONFIG.buttons.loading : FORGOT_PASSWORD_FORM_CONFIG.buttons.continue}
        />
        
    </>
  );
};

export default ResetPasswordForm;
