import { Avatar, Card, CardContent, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { StarIcon } from "@/components/icons";

type CardRatingProps = {
  author: string;
  image: string;
  rate: number;
  quote: string;
};

const ratingStars = (rating: number) => {
  const stars = [];

  for (let i = 0; i < rating; i++) {
    stars.push(
      <StarIcon sx={{ fontSize: 24, color: "primary.main" }} key={i} />
    );
  }
  for (let i = 0; i < 5 - rating; i++) {
    stars.push(
      <StarIcon sx={{ fontSize: 24, color: "#5E6E89" }} key={5 - i} />
    );
  }

  return stars;
};

const CardRating = ({ author, image, rate, quote }: CardRatingProps) => {
  return (
    <StyledCardProduct className="center-root">
      <Avatar alt={author} src={image} className="img" />
      <div className="star-container">{ratingStars(rate)}</div>
      <CardContent className="content">
        <Typography
          align="center"
          sx={{
            color: "#1D293F",
            fontSize: { xs: 19, lg: 22 },
            lineHeight: { xs: "25px", lg: "29px" },
            fontWeight: 500,
          }}
        >{`"${quote}"`}</Typography>
        <Typography
          align="center"
          sx={{
            color: "#7C8087",
            marginTop: "6px",
            fontSize: { xs: 16, lg: 18 },
            lineHeight: { xs: "18px", lg: "20px" },
            fontWeight: 400,
          }}
        >
          {author}
        </Typography>
      </CardContent>
    </StyledCardProduct>
  );
};

export default CardRating;

const StyledCardProduct = styled(Card)(({ theme }: any) => {
  return {
    width: 350,
    height: 295,
    boxShadow: "0px 4px 24px rgba(139, 167, 178, 0.16)",
    borderRadius: 6,
    padding: "33px 16px 29px",
    display: "flex",
    flexDirection: "column",

    [theme.breakpoints.down("md")]: {
      width: 267,
      height: 224,
      padding: "25px 12px 22px",
    },
    ".content": {
      marginTop: "6px",

      [theme.breakpoints.down("md")]: {
        padding: "16px 0px 0px",
      },
    },
    ".star-container": {
      display: "flex",
    },
    ".img": {
      width: 126,
      height: 126,

      [theme.breakpoints.down("md")]: {
        width: 84,
        height: 84,
      },
    },
  };
});
