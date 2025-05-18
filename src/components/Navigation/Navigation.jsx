import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/catalog', label: 'Catalog' },
];

const buttonStyle = {
  margin: '0 8px',
  padding: '8px 16px',
  textTransform: 'none',
  borderRadius: 0,
  border: 'none',
  backgroundColor: 'transparent',
  color: 'black',
  '&.active': {
    color: '#1976d2', // Синий цвет для активной кнопки
  },
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#1976d2', // Синий цвет при наведении
  },
};

function Navigation() {
  return (
    <nav>
      {navLinks.map(({ to, label }) => (
        <Button
          key={to}
          component={NavLink}
          to={to}
          sx={buttonStyle}
          end={to === '/'}
        >
          {label}
        </Button>
      ))}
    </nav>
  );
}

export default Navigation;
