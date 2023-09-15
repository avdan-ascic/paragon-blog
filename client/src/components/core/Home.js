import { Container,Card, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <Container
      sx={{
        width: "100%",
        marginTop: "3rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3em",
        }}
      >
        <Typography variant="h2" sx={{ color: "#204e59" }}>
          Welcome!
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "1em", marginTop: "1em", color: "#204e59" }}
        >
          Paragon Blog App is an application designed as an informative blog to
          help Paragon students to navigate trough the fast changing tech world.
        </Typography>
        <Link to="/posts">
          <Button
            variant="contained"
            sx={{ marginTop: "2em", backgroundColor: "#ffca28",fontSize:"1em","&:hover": {
              backgroundColor: "#ffd54f",
           
            }, }}
        
          >
            LOOK THE BLOG POSTS
          </Button>
        </Link>
      </Card>
    </Container>
  );
}

export default Home