import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="container py-5">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;