export const quyDinhForm = [
  {
    name: "maQD",
    type: "text",
    label: "Số ký hiệu:",
    required: true,
    placeholder: "Nhập số ký hiệu",
    customeLabelStyle: { color: "black", padding: "0px 0px 4px 4px" },
  },
  {
    name: "tenQD",
    type: "text",
    label: "Tên quy định:",
    required: true,
    placeholder: "Nhập tên quy định",
    customeLabelStyle: { color: "black", padding: "0px 0px 4px 4px" },
  },
  {
    name: "noiBanHanh",
    type: "text",
    label: "Nơi ban hành:",
    required: true,
    placeholder: "Nhập nơi ban hành",
    customeLabelStyle: { color: "black", padding: "0px 0px 4px 4px" },
  },
  {
    name: "ngayBanHanh",
    type: "date",
    label: "Ngày ban hành:",
    required: true,
    customeLabelStyle: { color: "black", padding: "0px 0px 4px 4px" },
  },
  {
    name: "ngayCoHieuLuc",
    type: "date",
    label: "Ngày có hiệu lực:",
    required: true,
    customeLabelStyle: { color: "black", padding: "0px 0px 4px 4px" },
  },
  {
    name: "hieuLuc",
    type: "select",
    label: "Hiệu lực:",
    required: false,
    selectOptions: [
      { display: "Còn", value: true },
      { display: "Hết", value: false },
    ],
    customeLabelStyle: { color: "black", padding: "0px 0px 4px 4px" },
    className: "rounded-none !mb-0 !px-2 !py-2",
  },
];

export const donDangKyAddForm = [
  {
    name: "tenDonDangKy",
    type: "text",
    label: "Tên đơn",
    placeholder: "Nhập số ký hiệu",
    customeLabelStyle: { color: "black", padding: "0px 0px 4px 4px" },
  },
  {
    name: "tenQD",
    type: "text",
    label: "",
    placeholder: "Nhập tên quy định",
    customeLabelStyle: { color: "black", padding: "0px 0px 4px 4px" },
  },
];
