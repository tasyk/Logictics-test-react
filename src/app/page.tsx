"use client"; 

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DriverList from './components/DriverList';
import menuData from './data/menu.json';
import driverData from './data/drivers.json';
import styles from './styles/Home.module.css';

const HomePage: React.FC = () => {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        // Simulate data loading from json files
        setDrivers(driverData.data as Driver[]);
        setMenuItems(menuData.data as MenuItem[]);
    }, []);

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.body}>
                <Sidebar menuItems={menuItems} />
                <main className={styles.main}>
                    <DriverList drivers={drivers} />
                </main>
            </div>
        </div>
    );
};

export default HomePage;