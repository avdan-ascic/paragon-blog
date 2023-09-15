import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useEffect } from "react";

import { Container, Typography, Divider, Button, Card } from "@mui/material";
import { selectMyPosts, setMyPosts } from "../../store/post/postSlice";
import { isAuthenticated } from "../../api/user-api";

const MyPosts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    isAuthenticated()
      .then((data) => {
        if (data.message === "Unauthorized!") {
          return navigate("/");
        } else {
          dispatch(setMyPosts(data.user._id));
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const posts = useSelector(selectMyPosts);

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
    >
      <div
        style={{
          marginTop: "2rem",
          display: "block",
          width: "95%",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            textAlign="left"
            variant="h4"
            sx={{ color: "#204e59", marginBottom: "0.5em", fontWeight: 700 }}
          >
            My Posts
          </Typography>
          <Button
            component={Link}
            to="/create-post"
            variant="contained"
            style={{
              backgroundColor: "#ffca28",
              color: "#fff",
              width: 200,
            }}
          >
            Create Post
          </Button>
        </div>
        <Divider sx={{ width: "100%", margin: "1rem 0" }} />
        {posts.map((post, i) => {
          return (
            <Card
              key={i}
              style={{
                display: "block",
                width: "100%",
                padding: "1rem",
                backgroundColor: "#fff",
                marginBottom: "1rem",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/post/${post._id}`)}
            >
              <Typography
                variant="h5"
                sx={{ marginBottom: "1rem", color: "#061470" }}
              >
                {post.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "1rem",
                  fontSize: "20px",
                  color: "#061470",
                }}
              >
                by:{" "}
                <strong>
                  {post.postedBy.firstName} {post.postedBy.lastName}
                </strong>
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "1rem" }}>
                {format(new Date(post.date), "Pp")}
              </Typography>
              <Typography variant="body2">
                {post.categories.split(",").map((category, index) => {
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
                      }}
                      key={index}
                    >
                      {category}
                    </Typography>
                  );
                })}
              </Typography>
            </Card>
          );
        })}
      </div>
    </Container>
  );
};

export default MyPosts;
