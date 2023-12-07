import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

import { Link, useNavigate } from 'react-router-dom'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { logout } from '../store/auth.reducer';
import { useDispatch, useSelector } from 'react-redux';
const NavBar = () => {
    
    const user = useSelector(state => state.auth.user)
    const cartCount = useSelector(state => {
        const cartItems = state.cart.cartItems
        return cartItems.reduce((count, item) => {
            return count + item.quantity
        }, 0)
    })
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const onLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    const checkoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position='static' color='transparent'>
                <Toolbar>
                    <Typography variant='h5' component="div">
                        <Link to="/" style={{textDecoration:"none", color:'black'}}>HOME</Link>
                    </Typography>
                    <Typography variant='h6' component="div">
                        <Link to="/products" style={{textDecoration:"none", color:'black', marginLeft:'20px'}}>Products</Link>
                    </Typography>
                    <Box alignItems="right" sx={{flexGrow:1, textAlign:"right"}}>
                    {
                        (user) ? 
                        <>
                            <Button component="label" onClick={checkoutHandler} variant="contained" style={{marginRight:"10px"}} startIcon={<ShoppingCartIcon />}>
                                {cartCount}
                            </Button>
                            
                            
                            <Button style={{textDecoration:"none", color:'black', marginRight:"10px"}} onClick={onLogout}>LOGOUT</Button>
                        </>
                         : 
                         <>
                            <Link to="/login" style={{textDecoration:"none", color:'black', marginRight:"10px"}}>LOGIN</Link>
                            <Link to="/register" style={{textDecoration:"none", color:'black'}}>REGISTER</Link>
                        </>
                        
                    }
                        
                    </Box>
                </Toolbar>

            </AppBar>
        </Box>
    )
}
export default NavBar;
