import { TextField } from "@mui/material";
const InputTextFieldForm = (props) => {
  return (
    <TextField
      variant="filled"
      size="small"
      margin="normal"
      color="purple"
      type={props.type}
      label={props.label}
      required
      // helperText="insert an valid email"

      sx={{
        backgroundColor: "#E6E7E8",
        "&:hover": {
          border: "3px solid purple",
          borderRadius: "12px",
        },
      }}
    />
  );
};
export default InputTextFieldForm;
