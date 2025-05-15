export default function ChangePasswordService(curentPassword) {
    if (curentPassword !== 'password'){
        return 'ĐỔI MẬT KHẨU THẤT BẠI';
    }
    else{
        return 'ĐỔI MẬT KHẨU THÀNH CÔNG';
    }
}