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
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

import { login } from "../../api/user-api";
import {
  selectLoggedIn,
  setLoggedIn,
  setUserInfo,
} from "../../store/user/userSlice";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectLoggedIn);

  // Navigate if logged in already
  useEffect(() => {
    if (loggedIn) return navigate("/posts");
    // eslint-disable-next-line
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      login(values)
        .then((data) => {
          if (data?.response?.data?.error) {
            setError(data.response.data.error);
          } else {
            toast.success("Login successful");

            dispatch(setLoggedIn(true));
            dispatch(setUserInfo(data.user));
            navigate("/posts");
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
          maxWidth: "95%",
        }}
      >
        <Typography
          variant="h3"
          textAlign={"center"}
          sx={{ marginBottom: "0.5em", color: "#204e59" }}
        >
          LogIn
        </Typography>
        <form onSubmit={formik.handleSubmit}>
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
              Login
            </Button>
            <Button
              sx={{ color: "red", fontSize: "18px" }}
              variant="text"
              color="primary"
              fullWidth
              component={Link}
              to="/register"
            >
              SIGNUP INSTEAD ?
            </Button>
          </Box>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
