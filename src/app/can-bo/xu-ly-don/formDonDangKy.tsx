import { Container } from "@components/Container";
import FormMui from "@components/form/Form";
import { Button, InputLabel, Modal } from "@mui/material";
import { labelStyles } from "@styles/style_component";
import {
  customeLabelStyle,
  formControlStyle,
  typeClassNameMap,
} from "src/app/sinh-vien/dang-ky-dich-vu/styles";
import { useState } from "react";
import { useAppSelector } from "@redux/hook";
// import { mockDonDangKy, mockDonDangKyChiTiet } from "@services/mockFormData";

const labelRebder = (label: string | string[]) => {
  if (Array.isArray(label)) {
    return (
      // string dau tien lam tieu def con cacs chuoi con laij laf subtitle
      <div className="flex flex-col gap-2 w-full text-wrap">
        <InputLabel sx={{ ...labelStyles, ...customeLabelStyle }}>
          {label[0]}
        </InputLabel>
        {/* nhung lable con lai laf subtitle */}
        {label.slice(1).map((item, index) => (
          <span className="font-light pl-3" key={index}>
            {item}
          </span>
        ))}
      </div>
    );
  }
  return label;
};

interface FormDonDangKyProps {
  maDon: string;
  maDonCT: string;
}

export default function FormDonDangKy({ maDon, maDonCT }: FormDonDangKyProps) {
  const [open, setOpen] = useState(false);
  const donDangKyCT = useAppSelector(
    (state) => state.donDangKyChiTiet.donDangKyChiTiet
  );
  const donDangKy = useAppSelector((state) => state.donDangKy.donDangKyCB);
  // Chỉ sử dụng mock data
  const rawDonDangKy = donDangKy?.find((item) => item.maDon === maDon) || {
    maDon: "",
    tenDon: "",
    thongTinChiTiet: "[]",
  };
  // console.log("rawDonDangKy:", rawDonDangKy);

  const rawDonDangKyChiTiet = donDangKyCT?.find(
    (item) => item.maDonCT === maDonCT
  );

  // console.log("rawDonDangKyChiTiet:", rawDonDangKyChiTiet);

  let donDangKyJson = [];
  let donDangKyCTJson = [];
  let submittedData = {};
  try {
    donDangKyJson = JSON.parse(rawDonDangKy?.thongTinChiTiet || "[]");
    donDangKyCTJson = JSON.parse(rawDonDangKyChiTiet?.thongTinChiTiet || "[]");

    // Debug template structure chi tiết
    // donDangKyJson.forEach((item, index) => {
    //   console.log(`Template field ${index}:`, {
    //     name: item.name,
    //     type: item.type,
    //     label: item.label,
    //     options: item.options,
    //     value: item.value,
    //     hasOptions: !!item.options,
    //     optionsLength: item.options?.length,
    //   });
    // });

    // Tạo submittedData từ donDangKyCTJson nếu có
    if (Array.isArray(donDangKyCTJson)) {
      submittedData = donDangKyCTJson.reduce((acc, item) => {
        if (item.name) {
          acc[item.name] = item.value || "";
        }
        return acc;
      }, {});
    } else if (
      typeof donDangKyCTJson === "object" &&
      donDangKyCTJson !== null
    ) {
      // Nếu donDangKyCTJson là object thay vì array
      submittedData = donDangKyCTJson;
    }
    // console.log("submittedData processed:", submittedData);
  } catch (error) {
    // console.error("Error parsing JSON:", error);
    donDangKyJson = [];
    donDangKyCTJson = [];
    submittedData = {};
  }

  const studentInfoRows = [
    [
      {
        name: "tenSV",
        label: "Tên sinh viên",
        type: "text",
        value: rawDonDangKyChiTiet?.hoTen || "",
        formControlStyle,
        customeLabelStyle: {
          ...customeLabelStyle,
          textAlign: "left",
          justifyContent: "flex-start",
          display: "flex",
          alignItems: "center",
        },
        className: "grid grid-cols-[30%_70%] gap-2 items-center text-left",
        orientation: "horizontal",
        disabled: true,
      },
      {
        name: "maSV",
        label: "Mã sinh viên",
        type: "text",
        value: rawDonDangKyChiTiet?.maSV || "",
        formControlStyle,
        customeLabelStyle: {
          ...customeLabelStyle,
          textAlign: "left",
          justifyContent: "flex-start",
          display: "flex",
          alignItems: "center",
        },
        className: "grid grid-cols-[30%_70%] gap-2 items-center text-left",
        orientation: "horizontal",
        disabled: true,
      },
    ],
    [
      {
        name: "lop",
        label: "Lớp",
        type: "text",
        value: rawDonDangKyChiTiet?.lop || "",
        formControlStyle,
        customeLabelStyle: {
          ...customeLabelStyle,
          textAlign: "left",
          justifyContent: "flex-start",
          display: "flex",
          alignItems: "center",
        },
        className: "grid grid-cols-[30%_70%] gap-2 items-center text-left",
        orientation: "horizontal",
        disabled: true,
      },
      {
        name: "khoa",
        label: "Khoa",
        type: "text",
        value: rawDonDangKyChiTiet?.khoa || "",
        formControlStyle,
        customeLabelStyle: {
          ...customeLabelStyle,
          textAlign: "left",
          justifyContent: "flex-start",
          display: "flex",
          alignItems: "center",
        },
        className: "grid grid-cols-[30%_70%] gap-2 items-center text-left",
        orientation: "horizontal",
        disabled: true,
      },
    ],
    [
      {
        name: "chuyenNganh",
        label: "Chuyên ngành",
        type: "text",
        value: rawDonDangKyChiTiet?.chuyenNganh || "",
        formControlStyle,
        customeLabelStyle: {
          ...customeLabelStyle,
          textAlign: "left",
          justifyContent: "flex-start",
          display: "flex",
          alignItems: "center",
        },
        className: "grid grid-cols-[30%_70%] gap-2 items-center text-left",
        orientation: "horizontal",
        disabled: true,
      },
      {
        name: "khoaHoc",
        label: "Khóa học",
        type: "text",
        value: rawDonDangKyChiTiet?.khoaHoc || "",
        formControlStyle,
        customeLabelStyle: {
          ...customeLabelStyle,
          textAlign: "left",
          justifyContent: "flex-start",
          display: "flex",
          alignItems: "center",
        },
        className: "grid grid-cols-[30%_70%] gap-2 items-center text-left",
        orientation: "horizontal",
        disabled: true,
      },
    ],
  ];

  const dynamicFields = donDangKyJson.map((item: any) => {
    const fieldValue = submittedData[item.name] || item.value || "";

    return {
      ...item,
      value: fieldValue,
      label: labelRebder(item.label),
      formControlStyle,
      customeLabelStyle,
      className: `${
        typeClassNameMap[item.type] || ""
      } grid grid-cols-[5%_95%] gap-4 md:gap-1 text-left`,
      variant: "standard",
      disabled: true, // Làm cho tất cả input chỉ để xem
    };
  });

  const inputSchema = [...dynamicFields];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="text"
        onClick={handleOpen}
        sx={{
          textTransform: "none",
          color: "primary.main",
          fontWeight: "normal",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        {rawDonDangKy?.tenDon || "Đơn không xác định"}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        className="flex items-center justify-center max-w-full max-h-full"
      >
        <Container className="size-fit px-8 py-6 mx-4 my-5 md:mx-0 md:min-w-[60%] lg:min-w-[50%] md:max-w-[70%] max-h-[80vh] flex flex-col">
          <div className="flex justify-between items-center mb-4 flex-shrink-0">
            <h6 className="w-full text-lg md:text-xl lg:text-2xl font-bold uppercase">
              {rawDonDangKy?.tenDon || "Đơn không xác định"}
            </h6>
            <Button onClick={handleClose} sx={{ minWidth: "auto" }}>
              ✕
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Thông tin sinh viên - layout 2 cột */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                Thông tin sinh viên
              </h3>
              {studentInfoRows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                >
                  {row.map((field, fieldIndex) => (
                    <FormMui
                      key={field.name}
                      inputSchema={[field]}
                      className="w-full"
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Thông tin đơn đăng ký */}
            {inputSchema.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                  Thông tin đơn đăng ký
                </h3>
                <FormMui
                  inputSchema={inputSchema}
                  className="w-full flex flex-col text-left"
                />
              </div>
            )}
          </div>
        </Container>
      </Modal>
    </>
  );
}
