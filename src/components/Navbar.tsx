import { FC, useMemo } from 'react';
import './Navbar.css';
import { FaSearch, FaPlus, FaArrowDown } from 'react-icons/fa';
import { Button } from '@chakra-ui/react';

const Navbar: FC = () => {
  const getMonth = () => {
    const date = new Date();
    const month = date.getMonth();
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[month];
  };

  const month = useMemo(() => getMonth(), []);

  return (
    <nav className="nav">
      <div className="nav__left">
        <h1 className="nav__left__content">
          <span className="nav__today">TODAY</span>
          <span className="nav__dashed">|</span>
          <span className="nav_month">{month}</span>
          <Button size="xs" ml="6" bgColor="transparent">
            <FaArrowDown />
          </Button>
        </h1>
      </div>
      <div className="nav__right">
        <span className="nav__search">
          <FaSearch />
        </span>
        <span className="nav__add">
          <FaPlus />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
