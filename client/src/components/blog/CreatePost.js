import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { create } from "../../api/post-api";
import { selectUserInfo } from "../../store/user/userSlice";
import { addPost } from "../../store/post/postSlice";

const validationSchema = Yup.object({
  title: Yup.string()
    .max(100, "Title cannot exceed more than 100 characters.")
    .required("Title is required"),
  categories: Yup.string()
    .matches(
      /^[0-9A-Za-z\s,]+$/,
      "Categories accepts only letters, numbers, spaces and commas!"
    )
    .required("Categories are required"),
});

const CreatePost = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [closeDialog, setCloseDialog] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      categories: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const contentState = editorState.getCurrentContent();
      const contentRaw = JSON.stringify(convertToRaw(contentState));

      values.description = contentRaw;
      values.postedBy = userInfo._id;

      const tempCats = values.categories.split(",").map((cat) => cat.trim());
      values.categories = Array.from(new Set(tempCats)).join(", ");

      create(values)
        .then((data) => {
          if (data?.response?.data?.error) {
            return setError(data.response.data.error);
          } else {
            toast.success("Post added successfully");
            dispatch(addPost(data));
            navigate("/posts");
          }
        })
        .catch((err) => console.log(err));
    },
  });

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ marginTop: "2em", width: "60%" }}>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h3"
            sx={{ marginBottom: "1em", color: "#061470" }}
          >
            New Post
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="title"
              name="title"
              label="Title"
              sx={{ marginBottom: "1em" }}
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="categories"
              name="categories"
              label="Categories"
              sx={{ marginBottom: "1em" }}
              placeholder="Enter categories with , separated"
              value={formik.values.categories}
              onChange={formik.handleChange}
              error={
                formik.touched.categories && Boolean(formik.errors.categories)
              }
              helperText={formik.touched.categories && formik.errors.categories}
            />
            <div
              style={{
                border: "1px solid #ccc",
                minHeight: "250px",
                padding: "5px",
              }}
            >
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                placeholder="Tell a story..."
              />
            </div>
            {error && (
              <Typography
                style={{ margin: "1rem 0", textAlign: "center", color: "red" }}
              >
                {error}
              </Typography>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "3rem",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#ffca28",
                  marginRight: "2em",
                  "&:hover": {
                    backgroundColor: "#ffca28",
                  },
                }}
              >
                CREATE
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#204e58",
                  "&:hover": {
                    backgroundColor: "#204e58",
                  },
                }}
                onClick={() => setCloseDialog(true)}
              >
                MY POSTS
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      <Dialog
        open={closeDialog}
        onClose={() => setCloseDialog(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">My Posts</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            Are you sure you want to go back? All changes will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCloseDialog(false)}>Cancel</Button>
          <Button onClick={() => navigate("/my-posts")} autoFocus>
            My Posts
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CreatePost;
