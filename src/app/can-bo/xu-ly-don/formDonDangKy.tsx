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
import { mockDonDangKy, mockDonDangKyChiTiet } from "@services/mockFormData";

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
  useMockData?: boolean;
}

export default function FormDonDangKy({ maDon, maDonCT }: FormDonDangKyProps) {
  const [open, setOpen] = useState(false);

  // Chỉ sử dụng mock data
  const donDangKy = mockDonDangKy?.find((item) => item.maDon === maDon) || {
    maDon: "",
    tenDDK: "",
    thongtinChitiet: [],
  };

  const donDangKyChiTiet = mockDonDangKyChiTiet?.find(
    (item) => item.maDonCT === maDonCT
  );

  // Đảm bảo thongtinChiTiet luôn là array
  const thongtinChiTiet = donDangKy?.thongtinChitiet || [];

  // Lấy dữ liệu đã điền từ donDangKyChiTiet.thongtinChitiet[0] nếu có
  const submittedData = donDangKyChiTiet?.thongtinChitiet?.[0] || {};

  const inputSchema = thongtinChiTiet.map((item: any) => ({
    ...item,
    label: labelRebder(item.label),
    formControlStyle,
    customeLabelStyle,
    value: submittedData[item.name] || "", // Sử dụng dữ liệu đã submit
    className: `${
      typeClassNameMap[item.type] || ""
    } grid grid-cols-[5%_95%] gap-4 md:gap-1 text-left`,
    variant: "standard",
    disabled: true, // Làm cho tất cả input chỉ để xem
  }));

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
        {donDangKy?.tenDDK || "Đơn không xác định"}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        className="flex items-center justify-center"
      >
        <Container className="size-fit px-8 py-6 mx-4 my-5 md:mx-0 md:min-w-[60%] lg:min-w-[50%] md:max-w-[80%]">
          <div className="flex justify-between items-center mb-4">
            <h6 className="w-full text-lg md:text-xl lg:text-2xl font-bold uppercase">
              {donDangKy?.tenDDK || "Đơn không xác định"}
            </h6>
            <Button onClick={handleClose} sx={{ minWidth: "auto" }}>
              ✕
            </Button>
          </div>
          <FormMui
            inputSchema={inputSchema}
            className="w-full flex flex-col text-left "
          />
        </Container>
      </Modal>
    </>
  );
}
