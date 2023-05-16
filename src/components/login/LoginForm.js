import { useForm } from "react-hook-form";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { useContext } from "react";
import UserDataContext from "../../store/userData-context";
import formStyle from "../forms/style-form";

const LoginForm = () => {
  const navigate = useNavigate();
  const ctxUserData = useContext(UserDataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); //mode:"onBlur"

  // const onErrors = (errors) => console.error(errors);

  const handleLogin = (data) => {
    // Create a new user with email and password using firebase
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        const token = auth.currentUser.accessToken;
        localStorage.setItem("token", token);
        if (
          ctxUserData.userEmail === "" ||
          ctxUserData.userEmail === undefined ||
          ctxUserData.userEmail === null ||
          ctxUserData.userEmail !== data.email
        ) {
          ctxUserData.setInitialValue(data.email);
        }
        navigate("/dashboard");
      })
      .catch((err) => {
        //todo set error
        //todo set email error
        //todo set password error
        //todo set fetching error
        console.log(err);
      });
  };

  //   <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>{/* ... */}</form>;
  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)} style={formStyle}>
        <Typography variant="h4" component="h1" color="myFont" align="center">
          Login
        </Typography>
        <TextField
          label="Email"
          variant="filled"
          size="small"
          margin="normal"
          type="email"
          error={errors?.email}
          helperText={errors?.email ? errors.email?.message : ""}
          sx={{
            backgroundColor: "#E6E7E8",
            "&:hover": {
              border: "3px solid #9F4298",
              borderRadius: "12px",
            },
          }}
          {...register("email", {
            required: "Please Enter Your Email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please Enter A Valid Email!",
            },
          })}
        />

        <TextField
          label="Password"
          variant="filled"
          size="small"
          margin="normal"
          type="password"
          error={errors?.password}
          helperText={errors?.password ? errors.password?.message : ""}
          sx={{
            backgroundColor: "#E6E7E8",
            "&:hover": {
              border: "3px solid #9F4298",
              borderRadius: "12px",
            },
          }}
          {...register("password", {
            required: "Please Enter Your Password!",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        <Button
          type="submit"
          variant="contained"
          size="medium"
          sx={{
            color: "#E6E7E8",
            fontWeight: "bold",
            borderRadius: "12px",
            border: "2px solid #CFDB31",
            margin: "1rem",
            "&:hover": {
              backgroundColor: "green",
              border: "3px solid #9F4298",
            },
          }}
        >
          Login
        </Button>
      </form>
    </div>
  );
};
export default LoginForm;
