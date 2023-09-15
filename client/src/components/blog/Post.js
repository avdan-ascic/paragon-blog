import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import {
  Container,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Card,
  CardContent,
  Stack,
  Box,
} from "@mui/material";
import { updatePost, removePost } from "../../store/post/postSlice";
import { selectUserInfo, selectLoggedIn } from "../../store/user/userSlice";
import { readById, addComment, remove } from "../../api/post-api";

const validationSchema = Yup.object({
  text: Yup.string().required("Comment is required!"),
});

const Post = () => {
  const [post, setPost] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const loggedIn = useSelector(selectLoggedIn);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    readById(params.id)
      .then((data) => {
        setPost(data);

        if (data.description) {
          const contentState = convertFromRaw(JSON.parse(data.description));
          setEditorState(EditorState.createWithContent(contentState));
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      values.commentBy = userInfo._id;

      addComment(values, params.id)
        .then((data) => {
          toast.success("Comment posted successfully.");
          setPost(data);
          dispatch(updatePost(data));
          formik.setValues({
            text: "",
          });
        })
        .catch((err) => console.log(err));
    },
  });

  const stringAvatar = (name) => {
    return { children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}` };
  };

  const handleDelete = () => {
    remove(params.id)
      .then(() => {
        dispatch(removePost(params.id));

        toast.success("Post removed successfully.");
        navigate("/posts");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Card sx={{ marginTop: "2em", marginBottom: "2em" }}>
        <CardContent>
          <Typography
            variant="h3"
            sx={{ fontWeight: 600, color: "#204e59", marginBottom: "0.8em" }}
          >
            {post?.title}
          </Typography>

          {post?.categories?.split(",").map((category, index) => {
            return (
              <Typography
                variant="body1"
                sx={{
                  border: "2px solid #061470",
                  display: "inline",
                  padding: "0.5em",
                  borderRadius: "15px",
                  color: "#061470",
                  marginRight: "1em",
                  marginBottom: "2em",
                }}
                key={index}
              >
                {category}
              </Typography>
            );
          })}

          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "1rem",
              marginBottom: "1em",
            }}
          >
            <Typography variant="body1" sx={{ fontSize: "20px" }}>
              Author:{" "}
              <strong>
                {post?.postedBy?.firstName} {post?.postedBy?.lastName}
              </strong>
            </Typography>
            {post?.postedBy?._id === userInfo._id && (
              <Box>
                <Button
                  variant="contained"
                  component={Link}
                  to={`/update-post/${params.id}`}
                  sx={{
                    backgroundColor: "#ffca28",
                    marginTop: "1em",
                    "&:hover": {
                      backgroundColor: "#ffca28",
                    },
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#204e59",
                    marginTop: "1em",
                    marginLeft: "2em",
                    "&:hover": {
                      backgroundColor: "#204e59",
                    },
                  }}
                  s
                  onClick={() => setDeleteDialog(true)}
                >
                  Delete
                </Button>
              </Box>
            )}
          </Stack>

          <Divider sx={{ margin: "1rem 0", width: "100%" }} />

          <Typography
            variant="body1"
            sx={{ marginTop: "1em", color: "#061470" }}
          >
            <Editor editorState={editorState} readOnly={true} />
          </Typography>
        </CardContent>
      </Card>
      {loggedIn && (
        <Box>
          <form onSubmit={formik.handleSubmit} style={{ margin: "1rem 0" }}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="text"
              name="text"
              label="Comment here..."
              value={formik.values.text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.text || formik.submitCount > 0) &&
                Boolean(formik.errors.text)
              }
              helperText={
                (formik.touched.text || formik.submitCount > 0) &&
                formik.errors.text
              }
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#ffca28",
                display: "block",
                marginTop: "1em",
                marginLeft: "auto",
                "&:hover": {
                  backgroundColor: "#ffca28",
                },
              }}
            >
              Post Comment
            </Button>
          </form>
        </Box>
      )}

      <Card sx={{ marginTop: "2em" }}>
        <CardContent>
          <Typography sx={{ fontSize: "20px", marginBottom: "1em" }}>
            All Comments:
          </Typography>
          {post?.comment?.length === 0 ? (
            <Typography variant="body2">No Comments Till Now</Typography>
          ) : (
            <>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {post?.comment?.map((comm, i) => {
                  return (
                    <Fragment key={i}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            {...stringAvatar(
                              `${comm.commentBy.firstName} ${comm.commentBy.lastName}`
                            )}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${comm.commentBy.firstName} ${comm.commentBy.lastName}`}
                          secondary={comm.text}
                        />
                      </ListItem>
                      {i < post.comment.length - 1 && (
                        <Divider sx={{ marginBottom: "1em" }} />
                      )}
                    </Fragment>
                  );
                })}
              </List>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Post;
