import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
const GridItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#E6E7E8",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#333333",
  border: "1px solid #CFDB31",
  overflow: "auto",
}));
export default GridItem;
