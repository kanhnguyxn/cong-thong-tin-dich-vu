interface tenQDType {
  maQD: string;
  tenQD: string;
  noiBanHanh: string;
  ngayBanHanh: string;
  ngayCoHieuLuc: string;
  hieuLuc: boolean | string; // true or false for active status, or a string for "Còn" or "Hết"
  loaiVanBan: string;
  maPB?: string; // Optional property for department code
}

const datatenQD: tenQDType[] = [
  {
    maQD: "01/QĐ-UBND",
    tenQD: "Quy định về quản lý đất đai",
    noiBanHanh: "UBND TP HCM",
    ngayBanHanh: "01/01/2023",
    ngayCoHieuLuc: "15/01/2023",
    hieuLuc: true,
    loaiVanBan: "văn bản quy phạm pháp luật",
    maPB: "Dao Tao",
  },
  {
    maQD: "02/QD-DHKT",
    tenQD: "Quy định về sử dụng thiết bị phòng học",
    noiBanHanh: "ĐH Kinh tế",
    ngayBanHanh: "05/03/2023",
    ngayCoHieuLuc: "10/03/2023",
    hieuLuc: true,
    loaiVanBan: "văn bản nội bộ do DHKT ban hành",
    maPB: "Dao Tao",
  },
  {
    maQD: "03/HD-DHDN",
    tenQD: "Hướng dẫn thực hiện hợp đồng đào tạo",
    noiBanHanh: "ĐH Doanh nghiệp",
    ngayBanHanh: "15/02/2022",
    ngayCoHieuLuc: "01/03/2022",
    hieuLuc: false,
    loaiVanBan: "văn bản nội bộ do DHDN ban hành",
    maPB: "Dao Tao",
  },
  {
    maQD: "04/NĐ-CP",
    tenQD: "Nghị định về bảo hiểm xã hội",
    noiBanHanh: "Chính phủ",
    ngayBanHanh: "20/04/2022",
    ngayCoHieuLuc: "01/06/2022",
    hieuLuc: true,
    loaiVanBan: "văn bản quy phạm pháp luật",
    maPB: "Dao Tao",
  },
  {
    maQD: "05/TT-DHKT",
    tenQD: "Thông tư về tổ chức hội thảo nội bộ",
    noiBanHanh: "ĐH Kinh tế",
    ngayBanHanh: "12/06/2023",
    ngayCoHieuLuc: "20/06/2023",
    hieuLuc: true,
    loaiVanBan: "văn bản nội bộ do DHKT ban hành",
    maPB: "Dao Tao",
  },
];
export default datatenQD;
