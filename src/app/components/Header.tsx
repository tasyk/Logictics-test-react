import React from 'react';
import styles from './../styles/Header.module.css';
import Image from 'next/image';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Image src="/logo.png" alt="Logistics UK" width={150} height={50} />
            </div>
        </header>
    );
};

export default Header;