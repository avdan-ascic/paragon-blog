import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import { create } from "../../api/user-api";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      create(values)
        .then((data) => {
          if (data?.response?.data?.error) {
            return setError(data.response.data.error);
          } else {
            toast.success("Account created successfully");
            navigate("/login");
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
    >
      <Card
        component="main"
        sx={{
          marginTop: "3rem",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3rem",
          width: 400,
        }}
      >
        <Typography
          variant="h3"
          textAlign={"center"}
          sx={{ marginBottom: "0.5em", color: "#204e59" }}
        >
          SignUp
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />

          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />

          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id="rePassword"
            name="rePassword"
            label="Confirm Password"
            type="password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            error={
              formik.touched.rePassword && Boolean(formik.errors.rePassword)
            }
            helperText={formik.touched.rePassword && formik.errors.rePassword}
          />

          {error && (
            <Typography
              style={{ margin: "1rem 0", textAlign: "center", color: "red" }}
            >
              {error}
            </Typography>
          )}
          <Box sx={{ display: "flex", marginTop: "2rem", marginRight: "2em" }}>
            <Button
              type="submit"
              variant="text"
              color="primary"
              fullWidth
              sx={{ color: "#204e59", fontSize: "18px" }}
            >
              SUBMIT
            </Button>
            <Button
              sx={{ color: "red", fontSize: "18px" }}
              variant="text"
              fullWidth
              component={Link}
              to="/login"
            >
              LOGIN INSTEAD ?
            </Button>
          </Box>
        </form>
      </Card>
    </Container>
  );
};

export default Register;
