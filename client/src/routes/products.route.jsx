import { gql } from "graphql-tag";
import { Fragment } from "react";
import { useQuery } from "@apollo/client";
import Product from "../components/product.component";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      _id
      name
      price
    }
  }
`;

const Products = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  console.log(data, error);
  return (
    <Fragment>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Products
            </Typography>
            {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
                  Something short and leading about the collection below—its contents,
                  the creator, etc. Make it short and sweet, but not too short so folks
                  don&apos;t simply skip over it entirely.
                </Typography> */}
          </Container>
        </Box>
        <Container sx={{ py: 4 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data &&
              data.getProducts.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4}>
                  <Product product={product} />
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
    </Fragment>
  );
};
export default Products;
