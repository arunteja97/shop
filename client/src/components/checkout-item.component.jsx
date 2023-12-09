import { useDispatch } from "react-redux";
import { Stack } from "@mui/material";
import { Box, Divider } from "@mui/material";
import { Paper } from "@mui/material";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { addItem, clearItem } from "../store/cart.reducer";

const CheckoutItem = ({ item }) => {
  const { name, price, quantity } = item;
  const dispatch = useDispatch();

  const addItemHandler = () => {
    dispatch(addItem(item));
  };
  const clearItemHandler = () => {
    dispatch(clearItem(item));
  };

  return (
    <Paper elevation={2} sx={{ display: "inline-flex" }}>
      <img
        src={`https://picsum.photos/seed/${item.name}/150`}
        alt={item.title}
        loading="lazy"
      />

      <Box sx={{ marginLeft: "100px" }}>
        <h3>{name}</h3>
        <h4>{`${price}  x  ${quantity}`}</h4>
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={addItemHandler}
            aria-label="add-shopping-cart"
            color="primary"
          >
            <AddShoppingCartIcon />
          </IconButton>
          <IconButton
            onClick={clearItemHandler}
            aria-label="delete"
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Box>
    </Paper>
  );
};
export default CheckoutItem;
