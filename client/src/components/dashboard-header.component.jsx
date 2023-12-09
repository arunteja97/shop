import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

const DashboardHeader = () => {
  const user = useSelector((state) => state.auth.user);
  const imgUrl = `https://picsum.photos/seed/pic1/1000`;

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: "none" }} src={imgUrl} alt={"pic1"} />}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
              textAlign: "left",
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {user.name.toUpperCase()}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {user.email}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DashboardHeader;
