import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Navbar from './components/Navbar';
import { FC } from 'react';

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
