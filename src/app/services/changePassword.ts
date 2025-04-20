export default function ChangePasswordService(curentPassword) {
    if (curentPassword !== 'password'){
        return 'Mật khẩu không đúng!';
    }
}