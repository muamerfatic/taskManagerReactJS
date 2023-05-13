import { useForm } from "react-hook-form";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import axios from "axios";
import { myFirebaseUrl } from "../../util/myFirebase";
import formStyle from "../forms/style-form";

const RegistrationForm = (props) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm(); //mode:"onBlur"

  async function addUser(uid, email, username, password) {
    try {
      const response = await axios.put(
        myFirebaseUrl + "users/" + uid + ".json",
        {
          email: email,
          username: username,
          password: password,
          birthday: "",
          position: "",
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // const onErrors = (errors) => console.error(errors);
  const handleRegistration = (data, event) => {
    event.preventDefault();
    // Create a new user with email and password using firebase
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        addUser(res.user.uid, data.email, data.username, data.password);
        props.closeModalOnSubmit();
      })
      .catch((err) => {
        //todo set error
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistration)} style={formStyle}>
        <Typography variant="h4" component="h1" color="myFont" align="center">
          Sign up
        </Typography>
        <TextField
          label="Email"
          variant="filled"
          size="small"
          margin="normal"
          color="purple"
          type="email"
          error={errors?.email}
          helperText={errors?.email ? errors.email?.message : ""}
          sx={{
            backgroundColor: "#E6E7E8",
            "&:hover": {
              border: "3px solid purple",
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
          label="Username"
          variant="filled"
          size="small"
          margin="normal"
          color="purple"
          error={errors?.username}
          helperText={errors?.username ? errors.username?.message : ""}
          sx={{
            backgroundColor: "#E6E7E8",
            "&:hover": {
              border: "3px solid purple",
              borderRadius: "12px",
            },
          }}
          {...register("username", {
            required: "Please Enter Your Username",
            pattern: {
              value:
                /^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i,
              message: "Please Enter A Valid Username!",
            },
          })}
        />

        <TextField
          label="Password"
          variant="filled"
          size="small"
          margin="normal"
          color="purple"
          type="password"
          error={errors?.password}
          helperText={errors?.password ? errors.password?.message : ""}
          sx={{
            backgroundColor: "#E6E7E8",
            "&:hover": {
              border: "3px solid purple",
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

        <TextField
          label="Confirm Password"
          variant="filled"
          size="small"
          margin="normal"
          color="purple"
          type="password"
          error={errors?.confirmPassword}
          helperText={
            errors?.confirmPassword ? errors.confirmPassword?.message : ""
          }
          sx={{
            backgroundColor: "#E6E7E8",

            "&:hover": {
              border: "3px solid purple",
              borderRadius: "12px",
            },
          }}
          {...register("confirmPassword", {
            required: "Please Enter Your Password!",
            validate: (match) => {
              const password = getValues("password");
              return match === password || "Passwords should match!";
            },
          })}
        />
        <Button
          type="submit"
          variant="contained"
          color="purple"
          size="medium"
          sx={{
            color: "#E6E7E8",
            fontWeight: "bold",
            borderRadius: "12px",
            border: "2px solid var(--yellowish)",
            margin: "1rem",
            padding: "1rem",
            "&:hover": {
              backgroundColor: "green",
              color: "lightPurple)",
              border: "3px solid purple",
            },
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
export default RegistrationForm;
