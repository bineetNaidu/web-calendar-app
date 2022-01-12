import { FC } from 'react';
import {
  Container,
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Heading,
  ButtonGroup,
  IconButton,
  Avatar,
} from '@chakra-ui/react';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { HiDotsHorizontal } from 'react-icons/hi';
import { useUserStore } from '../lib/user.store';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Navbar: FC = () => {
  const { user, logout } = useUserStore((s) => s);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    await auth.signOut();
    logout();
    navigate('/product');
  };

  const links = user.isAuthenticated ? (
    <>
      <IconButton aria-label="Notifications" icon={<IoIosNotifications />} />
      <IconButton aria-label="view morw" icon={<HiDotsHorizontal />} />
      <IconButton aria-label="auth user" onClick={handleLogout}>
        <Avatar size="sm" name={user.name} src={user.photoURL} />
      </IconButton>
    </>
  ) : (
    <IconButton aria-label="Not User" icon={<FaUserCircle />} />
  );

  return (
    <Container
      maxW="container.xl"
      d="flex"
      justifyContent="space-between"
      alignItems="center"
      py="4"
    >
      <Box flex="3">
        <Heading>Calendar</Heading>
      </Box>
      <Box flex="4">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<FaSearch color="gray.300" />}
          />
          <Input placeholder="Search Something" />
        </InputGroup>
      </Box>
      <Box flex="3" d="flex" justifyContent="flex-end">
        <ButtonGroup spacing="4" size="md" variant="outline">
          {links}
        </ButtonGroup>
      </Box>
    </Container>
  );
};

export default Navbar;
