import { Container } from "@components/Container";
import DropDown from "./DropDown";

export default function NavBar({
  onSelectionsChange,
}: {
  onSelectionsChange: (department: string, option: string) => void;
}) {
  return (
    <Container className="flex flex-col w-full border-2 border-[var(--color-blue)] rounded-lg !p-0 h-full">
      <h3 className="bg-[var(--color-blue)] text-sm md:text-lg uppercase px-2 py-4 text-white font-light">
        Hệ thống quy định
      </h3>

      <DropDown onSelectionsChange={onSelectionsChange} />
    </Container>
  );
}
