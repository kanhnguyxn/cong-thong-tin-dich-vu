"use client";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

interface CustomDatePickerProps {
  value: moment.Moment | null;
  onChange: (date: moment.Moment) => void;
}

export default function CustomDatePicker({ value, onChange }: CustomDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        sx={{ width: "100%" }}
        slotProps={{
          textField: {
            size: "small",
          },
        }}
        value={value ? value : moment(new Date(), "DD/MM/YYYY")}
        format="DD/MM/YYYY"
        onChange={onChange}
      />
    </LocalizationProvider>
  );
}
