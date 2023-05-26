import updatingDone from '../../../values/pictures/UpdatingDone.png'
import { Avatar, Typography, Grid } from "@mui/material";
import { useTranslation } from 'react-i18next';
const DeletedTask = () => {
  const {t}=useTranslation();
  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h5" color="#03fc4e" sx={{ fontWeight: "bold" }}>
        {t('task.deleteTask')}
      </Typography>
      
      <Avatar src={updatingDone} alt="DonePhoto" />
    </Grid>
  );
};
export default DeletedTask;
