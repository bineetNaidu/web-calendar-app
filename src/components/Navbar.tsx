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
  Button,
} from '@chakra-ui/react';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { HiDotsHorizontal } from 'react-icons/hi';
import { useUserStore } from '../lib/user.store';

const Navbar: FC = () => {
  const user = useUserStore((s) => s.user);

  const links = user.isAuthenticated ? (
    <>
      <IconButton aria-label="Notifications" icon={<IoIosNotifications />} />
      <IconButton aria-label="view morw" icon={<HiDotsHorizontal />} />
      <Button>
        <Avatar name={user.name} src={user.photoURL} />
      </Button>
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
