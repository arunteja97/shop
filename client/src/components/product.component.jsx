import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Divider, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cart.reducer";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const { name, price } = product;

  const addItemHandler = () => {
    dispatch(addItem(product));
  };
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
      }}
    >
      <CardMedia
        component="div"
        sx={{
          // 16:9
          pt: "56.25%",
        }}
        image={`https://picsum.photos/seed/${name}/500`}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography
          gutterBottom
          component="h2"
          variant="body2"
          color="text.secondary"
        >
          {`Rs. ${price}`}
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus
          elit eget lorem placerat, ac pellentesque libero ultrices.
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <IconButton
          onClick={addItemHandler}
          color="primary"
          aria-label="add to shopping cart"
        >
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>

    // <Card sx={{ maxWidth: 345 }}>
    //     <CardMedia
    //         sx={{ height: 140 }}
    //         image={`https://picsum.photos/seed/${name}/150`}
    //         title="green iguana"
    //     />
    //     <CardContent>
    //         <Typography gutterBottom variant="h5" component="div">
    //         {name}
    //         </Typography>
    //         <Typography gutterBottom variant="h6" component="div" color={'GrayText'}>
    //         {`Rs. ${price}`}
    //         </Typography>
    //         <Typography variant="body2" color="text.secondary">
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus elit eget lorem placerat, ac pellentesque libero ultrices. Vivamus viverra est quis nulla dapibus aliquet.
    //         </Typography>
    //     </CardContent>
    //     <Divider/>
    //     <CardActions sx={{justifyContent:"center"}}>
    //         <IconButton onClick={addItemHandler} color="primary" aria-label="add to shopping cart">
    //             <AddShoppingCartIcon />
    //         </IconButton>

    //     </CardActions>
    //     </Card>
  );
};

export default Product;
