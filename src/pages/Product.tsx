import { Box, Text, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const Product: FC = () => {
  return (
    <Box>
      <Text>Product</Text>
      <Link to="/">
        <Button>Home</Button>
      </Link>
    </Box>
  );
};

export default Product;
