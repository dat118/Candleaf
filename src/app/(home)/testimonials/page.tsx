"use client";

import styled from "@emotion/styled";
import { Container, Typography, Box, Stack } from "@mui/material";
import { useGetRatingsQuery } from "@/redux/services/ratingApi";
import CardRating from "./components/CardRating";

const Testimonial = () => {
  const { data, error } = useGetRatingsQuery(null);

  return (
    <StyledTestimonial>
      <Container className="app-container">
        <Typography variant="h1">Testimonials</Typography>
        <Typography
          variant="h4"
          sx={{ fontSize: "18px", color: "#5E6E89", marginTop: "15px" }}
        >
          Some quotes from our happy customers
        </Typography>
        {!data || data?.length === 0 || error ? (
          <Typography variant="h3" sx={{ color: "#5E6E89", marginTop: "15px" }}>
            No data to display
          </Typography>
        ) : (
          <Stack direction="row" spacing={4} className="rating-container">
            {data?.map((item, index) => (
              <Box key={index} className="item center-root">
                <CardRating
                  author={item.author}
                  image={item.image}
                  rate={item.rate}
                  quote={item.quote}
                />
              </Box>
            ))}
          </Stack>
        )}
      </Container>
    </StyledTestimonial>
  );
};

export default Testimonial;

const StyledTestimonial = styled("div")(({ theme }: any) => {
  return {
    backgroundColor: theme.palette.background.default,

    ".app-container": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "90px 42px 90px 42px",

      [theme.breakpoints.down("md")]: {
        padding: "20px 42px 21px 42px",
      },
      ".rating-container": {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignContent: "center",
        marginTop: "27px",
        overflowX: "scroll",
        scrollSnapType: "x mandatory",
      },
      ".item": {
        scrollSnapAlign: "center",
      },
    },
  };
});
