import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Container,
  Avatar,
  Button,
  Typography,
  CardActions,
  CardContent,
  Card,
} from "@mui/material";
import { selectUserInfo } from "../../store/user/userSlice";

const Profile = () => {
  const userInfo = useSelector(selectUserInfo);
  const stringAvatar = (name) => {
    return { children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}` };
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
      <Card sx={{ maxWidth: 500, marginTop: "5rem", padding: "4rem" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            {...stringAvatar(userInfo.firstName + " " + userInfo.lastName)}
            sx={{ width: 56, height: 56 }}
          />
          <Typography
            variant="body1"
            component="div"
            sx={{ marginTop: "1em", fontSize: "18px" }}
          >
            {`Name: ${userInfo.firstName} ${userInfo.lastName}`}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "18px", marginBottom: "2em" }}
          >
            {`Email: ${userInfo.email}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/edit-profile">
            <Button
              variant="contained"
              size="small"
              sx={{
                color: "#fff",
                backgroundColor: "#204e59",
                marginRight: "1em",
                fontSize: "0.8em",
                width: 150,
                "&:hover": {
                  backgroundColor: "#204e59",
                },
              }}
            >
              UPDATE PROFILE
            </Button>
          </Link>

          <Button
            variant="contained"
            component={Link}
            to="/my-posts"
            size="small"
            sx={{
              color: "#fff",
              backgroundColor: "#ffca28",
              marginRight: "1em",
              width: 150,
              "&:hover": {
                backgroundColor: "#ffca28",
              },
            }}
          >
            MY POSTS
          </Button>

          <Link to="/create-post">
            <Button
              variant="contained"
              size="small"
              sx={{
                color: "#fff",
                backgroundColor: "#204e59",
                fontSize: "0.8em",
                width: 150,
                "&:hover": {
                  backgroundColor: "#204e59",
                },
              }}
            >
              CREATE POST
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Profile;
