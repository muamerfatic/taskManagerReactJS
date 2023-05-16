import { useRouteError } from "react-router-dom";
import { Container, Typography } from "@mui/material";

export default function ErrorPage(props) {
  const error = useRouteError();

  return (
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Oops, error!
      </Typography>
      <Typography variant="p" component="p" gutterBottom>
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="p" component="p" gutterBottom>
        <i>{props.message || error.statusText || error.message}</i>
      </Typography>
    </Container>
  );
}
