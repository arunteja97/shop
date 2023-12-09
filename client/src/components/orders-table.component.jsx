import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Fragment } from "react";

const OrderItem = ({ orderItem }) => {
  const {
    product: { name, price },
    quantity,
  } = orderItem;

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          alt="Remy Sharp"
          variant="square"
          src={`https://picsum.photos/seed/${name}/500`}
        />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <Fragment>
            {/* <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    {name}
                </Typography> */}
            {`Quantity: ${quantity} | Price: Rs. ${price}`}
          </Fragment>
        }
      />
    </ListItem>
  );
};

const Order = ({ order }) => {
  const itemsCount = order.items.reduce(
    (acc, item) => (acc += item.quantity),
    0
  );
  const saleAmount = order.items.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          {`OrderID: ${order._id}`}
        </Typography>
        <Typography sx={{ color: "text.secondary", justifyContent: "right" }}>
          {`Items Count: ${itemsCount}   |   Amount: Rs. ${saleAmount.toFixed(
            2
          )}`}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {order.items.map((orderItem) => {
          return <OrderItem key={orderItem._id} orderItem={orderItem} />;
        })}
      </AccordionDetails>
    </Accordion>
  );
};

const OrdersTable = ({ orders }) => {
  return (
    <>
      {orders.map((order) => {
        return <Order order={order} key={order._id} />;
      })}
    </>
  );
};

export default OrdersTable;
