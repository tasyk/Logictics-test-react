"use client"; 

import React, { useState, useEffect } from 'react';
import DriverList from '../components/DriverList';

import driverData from '../data/drivers.json';
import styles from '../styles/Home.module.css';

const HomePage: React.FC = () => {
    const [drivers, setDrivers] = useState<Driver[]>([]);

    useEffect(() => {
        // Simulate data loading from json files
        setDrivers(driverData.data as Driver[]);
    }, []);

    return (

                    <DriverList drivers={drivers} />
    )
};

export default HomePage;