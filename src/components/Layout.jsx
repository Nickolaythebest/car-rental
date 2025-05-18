import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import AppBar from './AppBar/AppBar.jsx';
import Loader from './Loader/Loader.jsx'; // если есть

function Layout() {
  return (
    <>
      <AppBar />
      <main>
      
          <Outlet />
        
      </main>
    </>
  );
}

export default Layout;
