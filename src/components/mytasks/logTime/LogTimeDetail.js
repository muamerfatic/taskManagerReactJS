import { Grid, Typography, Box, Stack, Button, Avatar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UserDataContext from "../../../store/userData-context";
import modalStyle from "../../modals/style-modal";
import UpdatingForm from "../../profile/UpdatingForm";
const LogTimeDetail = (props) => {
  const ctxUserData = useContext(UserDataContext);
  const [task, setTask] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    for (const counter in ctxUserData.tasks) {
      if (ctxUserData.tasks.at(counter).title === props.title) {
        setTask(ctxUserData.tasks.at(counter));
      }
    }
    setIsLoading(false);
  }, [task, props.title, ctxUserData.tasks]);

  if (isLoading) {
    return (
      <Box sx={modalStyle}>
        <UpdatingForm />
      </Box>
    );
  }
  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        color="myFont"
        marginBottom="0.3rem"
        sx={{ fontWeight: "bold", fontStyle: "italic" }}
      >
        Logged time:
      </Typography>
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={12}>
          {task.loggedTime !== ""
            ? task.loggedTime.map((loggedTask) => (
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  direction="row"
                  spacing={2}
                  margin={"0.4rem"}
                >
                  <Typography
                    variant="p"
                    component="p"
                    color="#333333"
                    sx={{ fontWeight: "bold" }}
                  >
                    Date:{" "}
                    <Typography variant="p" sx={{ fontStyle: "italic" }}>
                      {loggedTask.date}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="p"
                    component="p"
                    color="#333333"
                    sx={{ fontWeight: "bold" }}
                  >
                    Hours:{" "}
                    <Typography variant="p" sx={{ fontStyle: "italic" }}>
                      {loggedTask.hours}
                    </Typography>
                  </Typography>
                </Stack>
              ))
            : ""}
        </Grid>
      </Grid>
    </>
  );
};
export default LogTimeDetail;
