import ChangePasswordForm from "./changePasswprdForm";

export default function ChangePasswordPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="border-b-2 border-b-[var(--color-gray-fill)] w-full p-3 sticky  top-[234px] md:top-[121px] bg-white z-40">
        <h3 className="text-xl md:text-3xl uppercase font-bold">
          Doi mat khau
        </h3>
      </div>
      <div className="flex flex-col w-full items-center h-full justify-center">
        <p className="py-5">
          Để thay đổi mật khẩu, bạn cần cung cấp mật khẩu hiện tại, mật khẩu mới
          và xác nhận lại mật khẩu.
        </p>
        <div className="w-full mt-4">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
