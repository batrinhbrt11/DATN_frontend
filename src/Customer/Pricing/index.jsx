import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styledComponents from "styled-components";
export default function () {
  return (
    <Container>
      <h6 className="d-inline-block text-primary text-uppercase bg-light py-1 px-2 h6 ">
        SPA SPECIALIST
      </h6>
      <h1 className="mb-4">Spa & Beauty Specialist</h1>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Item>
              <Card sx={{ maxWidth: "100%" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100%"
                    image="img/team-1.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Olivia Mia
                    </Typography>
                    <Typography gutterBottom variant="body" component="div">
                      Spa & Beauty Expert
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Item>
              <Card sx={{ maxWidth: "100%" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100%"
                    image="img/team-2.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Cory Brown
                    </Typography>
                    <Typography gutterBottom variant="body" component="div">
                      Spa & Beauty Expert
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Item>
              <Card sx={{ maxWidth: "100%" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100%"
                    image="img/team-3.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Elizabeth Ross
                    </Typography>
                    <Typography gutterBottom variant="body" component="div">
                      Spa & Beauty Expert
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Item>
              <Card sx={{ maxWidth: "100%" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100%"
                    image="img/team-4.jpg"
                    alt="green iguana"
                  />
                  <CardContent
                    style={{ backgroundColor: "#fef1ef !important" }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      Kelly Walke
                    </Typography>
                    <Typography gutterBottom variant="body" component="div">
                      Spa & Beauty Expert
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: " #fef1ef !important",
  ...theme.typography.body2,
  fontWeight: "600",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Container = styledComponents.div`
  padding: 50px 100px;
  text-align:center;
  @media screen and (max-width: 600px) {
    padding: 10px;
  }
`;
