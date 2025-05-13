import { useDispatch, useSelector, useStore } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "./store";

// Hook tùy chỉnh để gọi dispatch (gửi action lên store).
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// Hook tùy chỉnh để lấy dữ liệu từ Redux state (giống useSelector).
export const useAppSelector = useSelector.withTypes<RootState>();
// Hook để truy cập trực tiếp store.
export const useAppStore = useStore.withTypes<AppStore>();
