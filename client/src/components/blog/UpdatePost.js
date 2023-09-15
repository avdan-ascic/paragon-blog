import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
} from "@mui/material";
import { update, readById } from "../../api/post-api";
import { selectUserInfo } from "../../store/user/userSlice";
import { updatePost } from "../../store/post/postSlice";

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

const UpdatePost = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [closeDialog, setCloseDialog] = useState(false);
  const params = useParams();

  useEffect(() => {
    readById(params.id)
      .then((data) => {
        formik.setValues({
          title: data.title,
          categories: data.categories,
        });

        const initialContent = JSON.parse(data.description);
        const contentState = convertFromRaw(initialContent);
        const initialEditorState = EditorState.createWithContent(contentState);
        setEditorState(initialEditorState);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

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

      update(values, params.id)
        .then((data) => {
          if (data?.response?.data?.error) {
            return setError(data.response.data.error);
          } else {
            toast.success("Post updated successfully");
            dispatch(updatePost(data));
            navigate("/posts");
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ marginTop: "2em", width: "60%", padding: "2rem" }}>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h3"
            sx={{ marginBottom: "1em", color: "#061470" }}
          >
            Update Post
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="title"
              name="title"
              label="Title"
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
                onEditorStateChange={setEditorState}
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
                color="primary"
                sx={{
                  backgroundColor: "#ffca28",
                  marginRight: "2em",
                  "&:hover": {
                    backgroundColor: "#ffca28",
                  },
                }}
              >
                Update
              </Button>
              <Button
                sx={{
                  backgroundColor: "#204e58",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#204e58",
                  },
                }}
                variant="outlined"
                onClick={() => setCloseDialog(true)}
              >
                My Posts
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

export default UpdatePost;
