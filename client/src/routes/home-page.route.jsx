import Box from '@mui/system/Box';
import { gql } from "graphql-tag";
import {useQuery} from '@apollo/client'
import DashboardHeader from "../components/dashboard-header.component";
import { Divider } from "@mui/material";
import OrdersTable from "../components/orders-table.component";
import { useSelector } from 'react-redux';

const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
      _id
      items {
        _id
        product {
          _id
          name
          price
        }
        quantity
      }
      userId
      createdAt
  
    }
  }
`;
const HomePage = () => {
    
    const { loading, error, data } = useQuery(GET_ORDERS, {
        pollInterval: 500,
    });
    const user = useSelector(state => state.auth.user)
    
    
    return user && 
            <div>
                <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                    px: 10
                }}
                >
                    <DashboardHeader/>
                    <Divider sx={{paddingBottom:"30px"}}>
                        Recent Orders
                    </Divider>
                    {
                        (loading) ? 
                        <>
                            <h1>{`Loading`}</h1>
                        </> :
                        <>
                            {data && <OrdersTable orders={data.getOrders}/> }
                        </>
                    }
                </Box>
            </div>
}

export default HomePage;