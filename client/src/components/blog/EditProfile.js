import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { update } from "../../api/user-api";
import {
  selectLoggedIn,
  selectUserInfo,
  setUserInfo,
} from "../../store/user/userSlice";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const EditProfile = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectLoggedIn);
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (!loggedIn) return navigate("/");
    // eslint-disable-next-line
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
    },
    validationSchema,
    onSubmit: (values) => {
      update(values, userInfo._id)
        .then((data) => {
          if (data?.response?.data?.error) {
            return setError(data.response.data.error);
          } else {
            toast.success("Account updated successfully");
            dispatch(
              setUserInfo({
                _id: userInfo._id,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
              })
            );
            navigate("/my-profile");
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card sx={{ marginTop: "2rem", padding: "3rem" }}>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            sx={{ color: "#204e59" }}
          >
            Update Profile
          </Typography>
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              sx={{ width: 350, marginTop: "2em" }}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
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
              sx={{ width: 350, marginTop: "2em" }}
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
              sx={{ width: 350, marginTop: "2em" }}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            {error && (
              <Typography
                style={{ margin: "1rem 0", textAlign: "center", color: "red" }}
              >
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{
                backgroundColor: "#ffca28",
                color: "#fff",
                width: 350,
                display: "block",
                marginTop: "2em",
              }}
            >
              UPDATE
            </Button>
            <Button
              style={{
                backgroundColor: "#204e59",
                color: "#fff",
                width: 350,
                marginTop: "1em",
              }}
              variant="outlined"
              color="secondary"
              fullWidth
              component={Link}
              to="/my-profile"
            >
              GO BACK
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditProfile;
