interface QuyDinhType {
    sokyhieu: string;
    quydinh: string;
    noibanhanh: string;
    ngaybanhanh: string;
    ngayhieuluc: string;
    hieuluc: string;
    loaivanban: string;
}
const dataQuyDinh: QuyDinhType[] = [
    {
      sokyhieu: '01/QĐ-UBND',
      quydinh: 'Quy định về quản lý đất đai',
      noibanhanh: 'UBND TP HCM',
      ngaybanhanh: '01/01/2023',
      ngayhieuluc: '15/01/2023',
      hieuluc: 'Còn',
      loaivanban: 'văn bản quy phạm pháp luật'
    },
    {
      sokyhieu: '02/QD-DHKT',
      quydinh: 'Quy định về sử dụng thiết bị phòng học',
      noibanhanh: 'ĐH Kinh tế',
      ngaybanhanh: '05/03/2023',
      ngayhieuluc: '10/03/2023',
      hieuluc: 'Còn',
      loaivanban: 'văn bản nội bộ do DHKT ban hành'
    },
    {
      sokyhieu: '03/HD-DHDN',
      quydinh: 'Hướng dẫn thực hiện hợp đồng đào tạo',
      noibanhanh: 'ĐH Doanh nghiệp',
      ngaybanhanh: '15/02/2022',
      ngayhieuluc: '01/03/2022',
      hieuluc: 'Hết',
      loaivanban: 'văn bản nội bộ do DHDN ban hành'
    },
    {
      sokyhieu: '04/NĐ-CP',
      quydinh: 'Nghị định về bảo hiểm xã hội',
      noibanhanh: 'Chính phủ',
      ngaybanhanh: '20/04/2022',
      ngayhieuluc: '01/06/2022',
      hieuluc: 'Còn',
      loaivanban: 'văn bản quy phạm pháp luật'
    },
    {
      sokyhieu: '05/TT-DHKT',
      quydinh: 'Thông tư về tổ chức hội thảo nội bộ',
      noibanhanh: 'ĐH Kinh tế',
      ngaybanhanh: '12/06/2023',
      ngayhieuluc: '20/06/2023',
      hieuluc: 'Còn',
      loaivanban: 'văn bản nội bộ do DHKT ban hành'
    },
    {
        sokyhieu: '01/QĐ-UBND',
        quydinh: 'Quy định về quản lý đất đai',
        noibanhanh: 'UBND TP HCM',
        ngaybanhanh: '01/01/2023',
        ngayhieuluc: '15/01/2023',
        hieuluc: 'Còn',
        loaivanban: 'văn bản quy phạm pháp luật'
      },
      {
        sokyhieu: '01/QĐ-UBND',
        quydinh: 'Quy định về quản lý đất đai',
        noibanhanh: 'UBND TP HCM',
        ngaybanhanh: '01/01/2023',
        ngayhieuluc: '15/01/2023',
        hieuluc: 'Còn',
        loaivanban: 'văn bản quy phạm pháp luật'
      },
      {
        sokyhieu: '01/QĐ-UBND',
        quydinh: 'Quy định về quản lý đất đai',
        noibanhanh: 'UBND TP HCM',
        ngaybanhanh: '01/01/2023',
        ngayhieuluc: '15/01/2023',
        hieuluc: 'Còn',
        loaivanban: 'văn bản quy phạm pháp luật'
      },
      {
        sokyhieu: '01/QĐ-UBND',
        quydinh: 'Quy định về quản lý đất đai',
        noibanhanh: 'UBND TP HCM',
        ngaybanhanh: '01/01/2023',
        ngayhieuluc: '15/01/2023',
        hieuluc: 'Còn',
        loaivanban: 'văn bản quy phạm pháp luật'
      },
      {
        sokyhieu: '01/QĐ-UBND',
        quydinh: 'Quy định về quản lý đất đai',
        noibanhanh: 'UBND TP HCM',
        ngaybanhanh: '01/01/2023',
        ngayhieuluc: '15/01/2023',
        hieuluc: 'Còn',
        loaivanban: 'văn bản quy phạm pháp luật'
      },
      {
        sokyhieu: '02/QD-DHKT',
        quydinh: 'Quy định về sử dụng thiết bị phòng học',
        noibanhanh: 'ĐH Kinh tế',
        ngaybanhanh: '05/03/2023',
        ngayhieuluc: '10/03/2023',
        hieuluc: 'Còn',
        loaivanban: 'văn bản nội bộ do DHKT ban hành'
      },
      {
        sokyhieu: '03/HD-DHDN',
        quydinh: 'Hướng dẫn thực hiện hợp đồng đào tạo',
        noibanhanh: 'ĐH Doanh nghiệp',
        ngaybanhanh: '15/02/2022',
        ngayhieuluc: '01/03/2022',
        hieuluc: 'Hết',
        loaivanban: 'văn bản nội bộ do DHDN ban hành'
      },
      {
        sokyhieu: '04/NĐ-CP',
        quydinh: 'Nghị định về bảo hiểm xã hội',
        noibanhanh: 'Chính phủ',
        ngaybanhanh: '20/04/2022',
        ngayhieuluc: '01/06/2022',
        hieuluc: 'Còn',
        loaivanban: 'văn bản quy phạm pháp luật'
      },
      {
        sokyhieu: '05/TT-DHKT',
        quydinh: 'Thông tư về tổ chức hội thảo nội bộ',
        noibanhanh: 'ĐH Kinh tế',
        ngaybanhanh: '12/06/2023',
        ngayhieuluc: '20/06/2023',
        hieuluc: 'Còn',
        loaivanban: 'văn bản nội bộ do DHKT ban hành'
      },
      {
          sokyhieu: '01/QĐ-UBND',
          quydinh: 'Quy định về quản lý đất đai',
          noibanhanh: 'UBND TP HCM',
          ngaybanhanh: '01/01/2023',
          ngayhieuluc: '15/01/2023',
          hieuluc: 'Còn',
          loaivanban: 'văn bản quy phạm pháp luật'
        },
        {
          sokyhieu: '01/QĐ-UBND',
          quydinh: 'Quy định về quản lý đất đai',
          noibanhanh: 'UBND TP HCM',
          ngaybanhanh: '01/01/2023',
          ngayhieuluc: '15/01/2023',
          hieuluc: 'Còn',
          loaivanban: 'văn bản quy phạm pháp luật'
        },
        {
          sokyhieu: '01/QĐ-UBND',
          quydinh: 'Quy định về quản lý đất đai',
          noibanhanh: 'UBND TP HCM',
          ngaybanhanh: '01/01/2023',
          ngayhieuluc: '15/01/2023',
          hieuluc: 'Còn',
          loaivanban: 'văn bản quy phạm pháp luật'
        },
        {
          sokyhieu: '01/QĐ-UBND',
          quydinh: 'Quy định về quản lý đất đai',
          noibanhanh: 'UBND TP HCM',
          ngaybanhanh: '01/01/2023',
          ngayhieuluc: '15/01/2023',
          hieuluc: 'Còn',
          loaivanban: 'văn bản quy phạm pháp luật'
        },
  ];
export default dataQuyDinh;