import DonDangKyHeader from "./DonDangKyHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  let headerRender;

  return (
    <div className="flex flex-col w-full relative">
      {/* Header */}
      <DonDangKyHeader />

      {/* Main layout */}
      <div className="flex flex-col md:flex-row w-full md:h-full">
        <div className="w-full flex justify-center p-4">{children}</div>
      </div>
    </div>
  );
}
