import { Container, Text, Button, Center } from '@chakra-ui/react';
import { FC } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useUserStore } from '../lib/user.store';
import { useNavigate } from 'react-router-dom';

const Product: FC = () => {
  const auth = getAuth();
  const setUser = useUserStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    const res = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = res.user;
    if (user) {
      setUser({
        id: user.uid,
        name: user.displayName!,
        email: user.email!,
        photoURL: user.photoURL!,
        created_at: '',
      });
      navigate('/');
    }
  };

  return (
    <Container py="8">
      <Text>Product</Text>
      <Button
        w={'full'}
        variant={'outline'}
        leftIcon={<FcGoogle />}
        onClick={handleGoogleAuth}
      >
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </Container>
  );
};

export default Product;
