import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface CustomRadioProps {
  options: Array<{ display: string; value: string }>;
  name: string;
  value: any;
  onChange: (value: any) => void;
  className?: string;
}
export default function CustomRadio({ options, value, onChange, name, className = "" }: CustomRadioProps) {
  return (
    <RadioGroup
      value={value || options[0]?.value}
      onChange={(e) => onChange(e.target.value)}
      aria-labelledby="demo-radio-buttons-group-label"
      name={name}
      className={className}
    >
      {options.map((option, index) => (
        <FormControlLabel key={`${name}-radio-${index}`} value={option.value} control={<Radio />} label={option.display} />
      ))}
    </RadioGroup>
  );
}
