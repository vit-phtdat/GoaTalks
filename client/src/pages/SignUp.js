import React, { useEffect, useContext } from "react";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import Input from "../components/input/Input";
import { Field } from "../components/field";
import { Button } from "../components/button";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import AuthenticationPage from "./AuthenticationPage";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import { authContext } from "../contexts/authContext";

const schema = yup.object({
  username: yup.string().required("Please enter your username"),
  email: yup
    .string()
    .email("Your email is not valid!")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter your password"),
});

const SignUpPage = () => {
  const { registerUser } = useContext(authContext);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (values) => {
    const { username, email, password } = values;
    try {
      const registerData = await registerUser({ username, email, password });
      if (registerData["success"]) {
        toast.success(`You are a GOAT now, ${username}!`);
      } else {
        toast.error(registerData["message"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message);
    }
  }, [errors]);

  useEffect(() => {
    document.title = "Register Page";
  }, []);

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="username" className="label">
            Username
          </Label>
          <Input
            type="text"
            name="username"
            placeholder="Enter your username"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="email" className="label">
            Email address
          </Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="password" className="label">
            Password
          </Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <Button
          className="mx-auto w-[200px]"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
        <div className="have-account">
          Already a member? <NavLink to={"/sign-in"}>Login</NavLink>
        </div>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
