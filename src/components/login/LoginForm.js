import { useForm } from "react-hook-form";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, Typography, TextField, Box } from "@mui/material";
import { useContext } from "react";
import UserDataContext from "../../store/userData-context";
import formStyle from "../forms/style-form";
import { useState } from "react";
import UpdatingForm from "../profile/UpdatingForm";
import modalStyle from "../modals/style-modal";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  const ctxUserData = useContext(UserDataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    setIsLoading(true);
    // Sign in a new user with email and password using firebase
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
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
        setIsLoading(false);
        navigate("/dashboard");
      })
      .catch(() => {
        setIsLoading(false);
        setLoginError(t("login.part2"));
      });
  };

  if (isLoading) {
    return (
      <Box sx={modalStyle}>
        <UpdatingForm />
      </Box>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)} style={formStyle}>
        <Typography variant="h4" component="h1" color="myFont" align="center">
          {t("login.part1")}
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
            required: t("register.part2"),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t("register.part3"),
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
            required: t("register.part7"),
            minLength: {
              value: 6,
              message: t("register.part8"),
            },
          })}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            color: "#E6E7E8",
            fontWeight: "bold",
            borderRadius: "12px",
            border: "2px solid #CFDB31",
            "&:hover": {
              backgroundColor: "green",
              border: "3px solid #9F4298",
            },
          }}
        >
          {t("login.part1")}
        </Button>
        {loginError ? <Typography color="red">{loginError}</Typography> : ""}
      </form>
    </div>
  );
};
export default LoginForm;
