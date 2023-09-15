import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import TopicIcon from "@mui/icons-material/Topic";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PostAddIcon from "@mui/icons-material/PostAdd";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import {
  selectLoggedIn,
  selectUserInfo,
  setLoggedIn,
  setUserInfo,
} from "../../store/user/userSlice";
import { search } from "../../api/post-api";
import { searchPosts } from "../../store/post/postSlice";
import { logout } from "../../api/user-api";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = () => {
  const [open, setOpen] = useState(false);
  const loggedIn = useSelector(selectLoggedIn);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const toggleDrawer = (open) => (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) return;

    setOpen(open);
  };

  const handleLogout = () => {
    logout().then(() => {
      dispatch(setLoggedIn(false));
      dispatch(setUserInfo({}));

      toast.success("You have been logged out successfully");
      navigate("/posts");
    });
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (searchValue === "") {
        dispatch(searchPosts({ searchTerm: "", posts: [] }));
        navigate("/posts");
      } else {
        search({ search: searchValue })
          .then((data) => {
            dispatch(searchPosts({ searchTerm: searchValue, posts: data }));
            navigate("/search-posts");
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <EmojiPeopleIcon />
            <ListItemText primary={"Welcome"} sx={{ marginLeft: "1em" }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/posts">
            <TopicIcon />
            <ListItemText primary={"All Posts"} sx={{ marginLeft: "1em" }} />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      {!loggedIn ? (
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/login">
              <KeyboardDoubleArrowRightIcon />
              <ListItemText primary={"Login"} sx={{ marginLeft: "1em" }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/register">
              <KeyboardDoubleArrowRightIcon />
              <ListItemText primary={"Register"} sx={{ marginLeft: "1em" }} />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/my-profile">
              <AccountBoxIcon />
              <ListItemText
                primary={`${userInfo.firstName} ${userInfo.lastName}`}
                sx={{ marginLeft: "1em" }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/my-posts">
              <CollectionsBookmarkIcon />
              <ListItemText primary={"My Posts"} sx={{ marginLeft: "1em" }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/create-post">
              <PostAddIcon />
              <ListItemText
                primary={"Create Post"}
                sx={{ marginLeft: "1em" }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      )}

      {loggedIn && (
        <>
          <Divider />

          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ExitToAppIcon />
                <ListItemText primary={"Logout"} sx={{ marginLeft: "1em" }} />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#ffca28" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, marginRight: "2em" }}
            >
              Paragon Blog
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearch}
                sx={{ ml: 1, flex: 1 }}
              />
            </Search>

            {!loggedIn ? (
              <Button
                variant="outlined"
                sx={{
                  display: { xs: "none", sm: "block" },
                  marginLeft: "auto",
                  borderColor: "#fff",
                  color: "#fff",
                }}
                component={Link}
                to="/login"
              >
                LOGIN
              </Button>
            ) : (
              <Button
                variant="outlined"
                sx={{
                  display: { xs: "none", sm: "block" },
                  marginLeft: "auto",
                  borderColor: "#fff",
                  color: "#fff",
                }}
                component={Link}
                to="/my-profile"
              >
                {userInfo.firstName} {userInfo.lastName}
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
};

export default Header;
