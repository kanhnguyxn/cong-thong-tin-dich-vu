const infoGioiThieu = {
    title: "Chào mừng bạn đến với cổng thông tin - dịch vụ dành cho sinh viên",
    content:
        "Cổng thông tin dịch vụ sinh viên Trường Đại học Kinh tế Đà Nẵng là nền tảng trực tuyến giúp sinh viên dễ dàng thực hiện các thủ tục hành chính như đăng ký đơn từ, tra cứu biểu mẫu, xem quy định và nhận hỗ trợ nhanh chóng. Hệ thống được thiết kế nhằm tối ưu trải nghiệm người dùng, giúp sinh viên tiết kiệm thời gian và tiếp cận thông tin một cách thuận tiện nhất.",
    image: "/assets/images/welcomToDUE.png",
    contactTitle: "Thông tin liên hệ",
    icons: {
        phone: "/assets/icons/phone.svg",
        email: "/assets/icons/email.svg",
    },
    contacts: [
        {
            department: "Phòng Đào Tạo",
            phones: ["(0236) 3950-110", "(0236) 3969-088"],
            email: "daotao@due.edu.vn",
        },
        {
            department: "Phòng Công Tác Sinh Viên",
            phones: ["(0236) 3950-464"],
            email: "phongcongtacsinhvien@due.edu.vn",
        },
        {
            department: "Phòng Khảo Thí & ĐBCLGD",
            phones: ["(0236) 3959-003", "(0236) 3522-233", "(0236) 3221-037"],
            email: "dbcl@due.edu.vn",
        },
        {
            department: "Phòng Kế Hoạch - Tài Chính",
            phones: ["(0236) 3847-139", "(0236) 3747-098"],
            email: "kehoachtaichinh@due.edu.vn",
        },
    ],
};

const ContactItem = ({ department, phones, email, icons }) => (
    <div className="flex flex-col">
        <h4 className="font-medium">{department}</h4>
        <div className="flex flex-col gap-2 h-full md:pl-4 pt-2 break-all text-left border-t-2 border-[var(--color-gray-stroke)] border-r-2">
            {phones.map((phone, idx) => (
                <div key={idx} className="flex items-center gap-2 px-2">
                    <img src={icons.phone} alt="phone" className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                    <span>{phone}</span>
                </div>
            ))}
            <div className="flex items-center gap-2 px-2">
                <img src={icons.email} alt="email" className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span className="underline">{email}</span>
            </div>
        </div>
    </div>
);

export default function GioiThieuPage() {
    return (
        <main className="text-center w-full flex flex-col min-h-[calc(100vh-var(--header-height,122px)-var(--footer-height,43px))]">
            {/* Nội dung chính có flex-1 để chiếm toàn bộ không gian trống */}
            <div className="flex-1 px-4 md:px-10 lg:items-center lg:justify-center flex flex-col">
                <h1 className="uppercase text-[var(--color-blue)] font-bold text-lg md:text-xl lg:text-2xl pt-3">
                    {infoGioiThieu.title}
                </h1>
                <div className="flex items-start flex-col md:flex-row text-justify indent-10 w-full gap-2 py-4 md:py-0 md:pt-3">
                    <p className="w-full md:w-[60%] lg:w-[70%] md:pr-3 lg:pr-6 xl:pr-16 xl:leading-10">{infoGioiThieu.content}</p>
                    <img
                        src={infoGioiThieu.image}
                        alt="Giới thiệu"
                        className="w-full h-auto md:w-[40%] lg:w-[30%]"
                    />
                </div>
            </div>
            
            {/* Phần liên hệ nằm ở đáy */}
            <div className="mt-auto">
                <h3 className="text-sm md:text-lg lg:text-xl text-left font-semibold pb-2 px-8">
                    {infoGioiThieu.contactTitle}
                </h3>
                <div className="grid grid-cols-2 gap-y-3 md:grid-cols-4 w-full text-wrap">
                    {infoGioiThieu.contacts.map((contact, index) => (
                        <ContactItem key={index} {...contact} icons={infoGioiThieu.icons} />
                    ))}
                </div>
            </div>
        </main>
    );
}


