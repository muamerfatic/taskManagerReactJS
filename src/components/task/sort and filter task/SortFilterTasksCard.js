import {
  Grid,
  Stack,
  MenuItem,
  Menu,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import searchIcon from "../../../values/pictures/searchIcon.png";
import { useTranslation } from "react-i18next";

const SortFilterTasksCard = (props) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sortHandlerAsc = () => {
    props.sortHandler("ASC");
    setAnchorEl(null);
  };

  const sortHandlerDesc = () => {
    props.sortHandler("DESC");
    setAnchorEl(null);
  };

  const sortHandlerStartDate = () => {
    props.sortHandler("STARTDATE");
    setAnchorEl(null);
  };

  const sortHandlerDueDate = () => {
    props.sortHandler("DUEDATE");
    setAnchorEl(null);
  };

  const sortHandlerPriority = () => {
    props.sortHandler("PRIORITY");
    setAnchorEl(null);
  };

  const sortHandlerStatus = () => {
    props.sortHandler("STATUS");
    setAnchorEl(null);
  };
  
  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignContent="center"
      sx={{
        width: "75%",
        margin: "auto",
        marginBottom: "1rem",
        padding: "0.2rem",
        backgroundColor: "#e2bFe4",
        borderRadius: "12px",
      }}
    >
      <Grid item xs={12} md={6}>
        <div>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              fontWeight: "bold",
              borderRadius: "12px",
              border: "2px solid #9F4298",
              "&:hover": {
                border: "3px solid #D1AFD3",
              },
            }}
          >
            {t("sort.part1")}
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={sortHandlerAsc}>{t("sort.part2")}</MenuItem>
            <MenuItem onClick={sortHandlerDesc}>{t("sort.part3")}</MenuItem>

            <MenuItem onClick={sortHandlerStartDate}>
              {t("sort.part4")}
            </MenuItem>
            <MenuItem onClick={sortHandlerDueDate}>{t("sort.part5")}</MenuItem>
            <MenuItem onClick={sortHandlerPriority}>{t("sort.part6")}</MenuItem>
            <MenuItem onClick={sortHandlerStatus}>{t("sort.part7")}</MenuItem>
          </Menu>
        </div>
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Avatar
            src={searchIcon}
            alt="serach"
            sx={{
              marginTop: "0.4rem",
            }}
          />
          <TextField
            label="Filter"
            variant="filled"
            size="small"
            type="email"
            onChange={props.filterBySearch}
            sx={{
              backgroundColor: "#E6E7E8",
              border: "2px solid #9F4298",
              borderRadius: "12px",
              "&:hover": {
                border: "3px solid #9F4298",
              },
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
export default SortFilterTasksCard;
