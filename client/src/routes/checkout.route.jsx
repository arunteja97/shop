import { useDispatch, useSelector } from "react-redux"
import { Divider, Stack, Typography,  Alert} from "@mui/material"
import {Box, Button} from "@mui/material"
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CheckoutItem from "../components/checkout-item.component";
import gql from "graphql-tag";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { clearItem } from "../store/cart.reducer";


const CREATE_ORDER = gql`
    mutation CreateOrder($orderInput: CreateOrderInput!) {
        createOrder(input: $orderInput) {
            _id
            userId
        }
    }
`
const Checkout = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const cartItems = useSelector(state => state.cart.cartItems)
    const cartTotal = cartItems.reduce((acc, item) => acc += (item.quantity*item.price), 0)
    const dispatch = useDispatch();

    const [createOrder, {loading}] = useMutation(CREATE_ORDER, {
        update(proxy, {data : {createOrder: orderData}}){
            cartItems.forEach(item => dispatch(clearItem(item)))
            navigate('/')
            navigate(0)
        },
        onError({graphQLErrors}){
            setErrors(graphQLErrors)
        },
        variables: {
            orderInput: {
                orderItems: cartItems.map(item => {
                    return {
                        productId: item._id,
                        quantity: item.quantity
                    }
                })
            }
        }
    })
    
    const buyNowHandler = () => {
        createOrder();
    }
    console.log(errors)

    return (
        <Box marginY={10} marginX={20} >
            {errors.map(error => {
                return (
                    <Alert severity="error" key={error.code}>
                        {error.message}
                    </Alert>
                )
            })}
            <Stack 
            direction="column"
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={3}>
                {cartItems.map(item => {
                    return (
                        <CheckoutItem item={item} key={item._id}/>
                    )
                })}
            </Stack>
            <Divider orientation="horizontal" flexItem sx={{marginY:"20px"}}/>
            <Typography variant="h4">{`Total: ${cartTotal.toFixed(2)}`}</Typography>
            <Button
            onClick={buyNowHandler} 
            component="label" variant="contained" sx={{marginRight:"10px", marginY:"30px"}}
            startIcon={<ShoppingCartCheckoutIcon />}>
                BUY NOW
            </Button>
        </Box>
    )
}

export default Checkout;