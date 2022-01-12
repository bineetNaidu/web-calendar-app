import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Navbar from './components/Navbar';
import { FC, useEffect } from 'react';
import { useUserStore } from './lib/user.store';
import { getAuth } from 'firebase/auth';

type WrapperProps = {
  component: JSX.Element;
};

function App() {
  const Wrapper: FC<WrapperProps> = ({ component }) => {
    return (
      <>
        <Navbar />
        {component}
      </>
    );
  };

  const auth = getAuth();
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser({
          created_at: '',
          email: authUser.email!,
          id: authUser.uid,
          name: authUser.displayName!,
          photoURL: authUser.photoURL!,
        });
        navigate('/');
        return;
      }
      navigate('/product');
    });
  }, [auth, navigate, setUser]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Wrapper component={<Home />} />} />
        <Route path="/product" element={<Wrapper component={<Product />} />} />
      </Routes>
    </>
  );
}

export default App;
