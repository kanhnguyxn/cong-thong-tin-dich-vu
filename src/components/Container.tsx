import { ReactNode } from "react";

interface ContainerProps {
  className?: string; // Class CSS
  children: string | ReactNode;
  shadow?: boolean 
}

export function Container(props: ContainerProps) {
  const { className, shadow=false, children } = props;


  return (
    <div
      className={`bg-white rounded-2xl p-4 text-center ${
        className || ""
      } flex flex-col`}
      style={
        shadow
          ? { boxShadow: "0 0 10px 10px rgba(0, 0, 0, 0.35)" }
          : undefined
      }
    >
     {children}
    </div>
  );
}
