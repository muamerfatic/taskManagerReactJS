import { useForm } from "react-hook-form";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import { myFirebaseUrl } from "../../util/myFirebase";
import formStyle from "../forms/style-form";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import UpdatingForm from "../profile/UpdatingForm";
import modalStyle from "../modals/style-modal";
import UpdatedItem from "../profile/UpdatedItem";
import ErrorUpdateProfileForm from "../profile/ErrorUpdateProfileForm";

const RegistrationForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [hasErrors, setErrors] = useState("");
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

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
    } catch (error) {
      setErrors(error);
    }
  }

  const handleRegistration = (data, event) => {
    event.preventDefault();
    setIsLoading(true);
    // Create a new user with email and password using firebase
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        addUser(res.user.uid, data.email, data.username, data.password);
        setIsLoading(false);
        setIsUpdated(true);
      })
      .catch((err) => {
        setErrors(err);
      });
  };

  if (hasErrors) {
    return (
      <Box sx={modalStyle}>
        <ErrorUpdateProfileForm message={hasErrors} />
      </Box>
    );
  }

  if (isUpdated) {
    return (
      <Box sx={modalStyle}>
        <UpdatedItem />
      </Box>
    );
  }
  if (isLoading) {
    return (
      <Box sx={modalStyle}>
        <UpdatingForm />
      </Box>
    );
  }
  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistration)} style={formStyle}>
        <Typography variant="h4" component="h1" color="myFont">
          {t("register.part1")}
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
          label={t("register.part4")}
          variant="filled"
          size="small"
          margin="normal"
          error={errors?.username}
          helperText={errors?.username ? errors.username?.message : ""}
          sx={{
            backgroundColor: "#E6E7E8",
            "&:hover": {
              border: "3px solid #9F4298",
              borderRadius: "12px",
            },
          }}
          {...register("username", {
            required: t("register.part5"),
            pattern: {
              value:
                /^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i,
              message: t("register.part6"),
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

        <TextField
          label={t("register.part9")}
          variant="filled"
          size="small"
          margin="normal"
          type="password"
          error={errors?.confirmPassword}
          helperText={
            errors?.confirmPassword ? errors.confirmPassword?.message : ""
          }
          sx={{
            backgroundColor: "#E6E7E8",
            "&:hover": {
              border: "3px solid #9F4298",
              borderRadius: "12px",
            },
          }}
          {...register("confirmPassword", {
            required: t("register.part7"),
            validate: (match) => {
              const password = getValues("password");
              return match === password || t("register.part10");
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
          {t("register.part11")}
        </Button>
      </form>
    </div>
  );
};
export default RegistrationForm;
