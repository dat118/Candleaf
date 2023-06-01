import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styled from "@emotion/styled";

type CardProductProps = {
  productName: string;
  productImage: string;
  price: number;
};

const CardProduct = ({
  productName,
  productImage,
  price,
}: CardProductProps) => {
  return (
    <StyledCardProduct>
      <CardActionArea>
        <CardMedia component="img" className="img" image={productImage} />
        <CardContent className="content">
          <Typography
            variant="subtitle2"
            sx={{ color: "common.black", lineHeight: { sm: "19px" } }}
          >
            {productName}
          </Typography>
          <Typography
            align="right"
            variant="h4"
            color="primary.main"
            sx={{ lineHeight: { sm: "13px" } }}
          >
            {`${price}$`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCardProduct>
  );
};

export default CardProduct;

const StyledCardProduct = styled(Card)(({ theme }: any) => {
  return {
    marginTop: "75px",
    width: 255,
    height: 230,
    filter: "drop-shadow(0px 4px 24px rgba(123, 123, 123, 0.15))",

    [theme.breakpoints.down("md")]: {
      width: 346,
      height: 150,
    },

    ".img": {
      height: 154,
      backgroundColor: "#F7F8FA",

      [theme.breakpoints.down("md")]: {
        height: 100,
        objectPosition: "top",
      },
    },
    ".content": {
      padding: "10px 26px 16px",

      [theme.breakpoints.down("md")]: {
        padding: "7px 10px 10px 17px",
      },
    },
  };
});
