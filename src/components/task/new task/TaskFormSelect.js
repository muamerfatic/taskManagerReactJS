import { InputLabel, FormControl, Select } from "@mui/material";
const TaskFormSelect = (props) => {
  return (
    <FormControl
      variant="filled"
      sx={{
        width: "63%",
        border: "2px solid #CFDB31",
        borderRadius: "12px",
        marginBottom: "0.4rem",
        backgroundColor: "#E6E7E8",
        "&:hover": {
          border: "3px solid #9F4298",
        },
      }}
    >
      <InputLabel id={props.inputLabelId}>{props.id}</InputLabel>
      <Select
        labelId={props.inputLabelId}
        id={props.id}
        label={props.id}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      >
        {props.children}
      </Select>
    </FormControl>
  );
};
export default TaskFormSelect;
