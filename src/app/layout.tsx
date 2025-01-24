"use client"; 


import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google'
import styles from './styles/Home.module.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import driverData from './data/drivers.json';
import menuData from './data/menu.json';


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [drivers, setDrivers] = useState<Driver[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        // Simulate data loading from json files
        setDrivers(driverData.data as Driver[]);
        setMenuItems(menuData.data as MenuItem[]);
    }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className={styles.container}>
            <Header />
            <div className={styles.body}>
                <Sidebar menuItems={menuItems} />
                <main className={styles.main}>
                  {children}
                </main>
            </div>
        </div>
       
      </body>
    </html>
  )
}