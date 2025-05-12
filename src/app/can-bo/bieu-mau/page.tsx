import { BieuMauTable } from "./BieuMauTable";
import dataBieuMau from "../../services/dataBieuMauCanBo";

export default function Page() {
  return (
    <div className="flex flex-col w-full items-center">
      <BieuMauTable data={dataBieuMau} />
    </div>
  );
}
