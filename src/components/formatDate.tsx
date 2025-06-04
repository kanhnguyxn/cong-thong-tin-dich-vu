export const formatDate = (isoDate: string): string => {
  if (!isoDate) return "";

  try {
    const date = new Date(isoDate);

    // Kiểm tra xem date có hợp lệ không
    if (isNaN(date.getTime())) {
      return isoDate; // Trả về chuỗi gốc nếu không parse được
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Output: "01/01/2024"
  } catch (error) {
    console.error("Error formatting date:", error);
    return isoDate; // Trả về chuỗi gốc nếu có lỗi
  }
};

// Format cho datetime chỉ hiển thị ngày tháng năm
export const formatDateTime = (isoDateTime: string): string => {
  if (!isoDateTime) return "";

  try {
    // Xử lý trường hợp chỉ có ngày (YYYY-MM-DD)
    if (isoDateTime.includes("T")) {
      const dateOnly = isoDateTime.split("T")[0];
      return formatDate(dateOnly);
    }

    return formatDate(isoDateTime);
  } catch (error) {
    console.error("Error formatting datetime:", error);
    return isoDateTime;
  }
};

// Format cho thời gian xử lý (chỉ hiển thị ngày/tháng/năm)
export const formatThoiGianXuLy = (thoiGian: string): string => {
  if (!thoiGian) return "";

  try {
    // Nếu đã là định dạng DD/MM/YYYY hoặc DD-MM-YYYY thì giữ nguyên
    if (thoiGian.match(/^\d{2}[\/\-]\d{2}[\/\-]\d{4}$/)) {
      return thoiGian.replace(/-/g, "/");
    }

    // Nếu là format YYYY-MM-DD hoặc ISO format
    return formatDate(thoiGian);
  } catch (error) {
    console.error("Error formatting thoiGianXuLy:", error);
    return thoiGian;
  }
};
