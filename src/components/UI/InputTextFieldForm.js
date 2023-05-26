import { TextField } from "@mui/material";
const InputTextFieldForm = (props) => {
  return (
    <TextField
      variant="filled"
      size="small"
      margin="normal"
      type={props.type}
      label={props.label}
      required
      sx={{
        backgroundColor: "#E6E7E8",
        "&:hover": {
          border: "3px solid #9F4298",
          borderRadius: "12px",
        },
      }}
    />
  );
};
export default InputTextFieldForm;
