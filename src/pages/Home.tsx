import { Box, Text, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const Home: FC = () => {
  return (
    <Box>
      <Text>Home</Text>
      <Link to="/product">
        <Button>Product</Button>
      </Link>
    </Box>
  );
};

export default Home;
