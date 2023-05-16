
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const DatePickerWrapper=(props)=>{
return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer components={["DatePicker"]}>
      <DatePicker
        minDate={props.minDate}
        value={props.value}
        onChange={props.onChange}
        sx={{
          backgroundColor: "#E6E7E8",
          border: "2px solid #CFDB31",
          marginBottom: "0.4rem",

          "&:hover": {
            border: "3px solid #9F4298",
            borderRadius: "12px",
          },
        }}
      />
    </DemoContainer>
  </LocalizationProvider>
)
}
export default DatePickerWrapper;