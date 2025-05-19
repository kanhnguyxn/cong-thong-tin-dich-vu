export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

export const GetStatusCode = (status: number): string | null => {
  switch (status) {
    case 200:
      return null;
    case 401:
      console.log("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
      return null;
    case 500:
      console.log("Có lỗi xảy ra, vui lòng thử lại sau");
      return null;
    default:
      console.log("Có lỗi xảy ra, vui lòng thử lại sau");
      return null;
  }
};

// interface fetchOptions {
//   method: string;
//   url: string;
//   data?: any;
// }

// export const fetchWithAuth = async ({ method, url, data }: fetchOptions) => {
//   let { access, refresh } = getToken();
//   if (!refresh) {
//     alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
//     window.location.href = "/tai-khoan/dang-nhap";
//     return;
//   }

//   let res: Response;
//   try {
//     res = await fetch(`${API_BASE_URL}${url}`, {
//       method: method,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${access}`,
//       },
//       body: data ? JSON.stringify(data) : null,
//     });
//   } catch (error) {
//     console.error("Lỗi khi thực hiện fetch:", error);
//     return null;
//   }
//   return res;
// };

// interface fetchOptionsMock {
//   cb?: (returnData?: any) => any;
//   expectResponseOptions?: {
//     status: number;
//     expectData?: any;
//   };
// }

// export const fetchMockData = async ({
//   cb,
//   expectResponseOptions,
// }: fetchOptionsMock): Promise<Response | any> => {
//   await new Promise((resolve) => setTimeout(resolve, 2000));
//   const { expectData, status } = expectResponseOptions;
//   const returnData = cb ? cb(expectData) : expectData;
//   //   const blob = new Blob([JSON.stringify(returnData)], { type: "application/json" });
//   //   const mockResponse = new Response(blob, {
//   //     status,
//   //   });
//   //   mockResponse.headers.set("Content-Type", "application/json");
//   //   console.log("DEBUG -->", mockResponse);
//   return returnData;
// };
