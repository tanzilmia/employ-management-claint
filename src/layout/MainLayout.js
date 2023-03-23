import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../commonPage/Footer';
import Navbar from '../ShearedPage/Navbar';



const MainLayout = () => {
    return (
        <>
        <Navbar/>
        <div className="content">
            <Outlet></Outlet>
        </div>
        <Footer/>
        </>
    );
};

export default MainLayout;