import { Box } from "@mui/material";

interface LogoProps {
  logo?: string;
  className?: string;
  title?: string;
  subTitle?: string;
  props?: any;
}

// ${isLoggedIn ? 'text-md md:text-lg lg:text-2xl' : ''}`
export default function Logo({
  logo,
  className,
  title,
  subTitle,
  ...props
}: LogoProps) {
  return (
    <Box className="flex font-bold text-md md:text-lg lg:text-xl transition-all duration-300 ease-in-out items-center justify-center">
      <img
        src={logo}
        alt="logo"
        className="hidden md:inline-block max-w-20"
      ></img>
      <Box className="ml-3 md:ml-0">
        <h3 className={`text-[var(--color-orange)] uppercase ${className}`}>
          {title}
        </h3>
        <h4 className="text-[var(--color-blue)]">{subTitle}</h4>
      </Box>
    </Box>
  );
}
