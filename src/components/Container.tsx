interface ContainerProps {
  className?: string; // Class CSS
  shadow?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode; // Optional click handler
}

export function Container({ className, shadow = false, onClick, children }: ContainerProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-4 text-center ${className || ""} flex flex-col`}
      onClick={onClick}
      style={shadow ? { boxShadow: "0 0 10px 10px rgba(0, 0, 0, 0.35)" } : undefined}
    >
      {children}
    </div>
  );
}
