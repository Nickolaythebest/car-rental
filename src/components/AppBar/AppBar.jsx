import s from './AppBar.module.css';
import Navigation from '../Navigation/Navigation.jsx';
import logo from '../../picture/Logo.svg';

function AppBar() {
  return (
    <header>
      <div className={s.container}>
        <img src={logo} alt='Company logo' width={104} height={16} />
        <Navigation />
      </div>
    </header>
  );
}

export default AppBar;
