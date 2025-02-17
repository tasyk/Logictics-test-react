"use client"; 
import React, { useState, useMemo } from 'react';
import DriverItem from './DriverItem';
import SearchBox from './SearchBox';
import styles from './DriverList.module.css';

interface DriverListProps {
    drivers: Driver[];
}

const DriverList: React.FC<DriverListProps> = ({ drivers }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDrivers = useMemo(() => {
        if (!searchTerm) {
            return drivers;
        }
        const lowerSearchTerm = searchTerm.toLowerCase();
        return drivers.filter(driver => {
            const fullName = `${driver.forename} ${driver.surname}`.toLowerCase();
            return fullName.includes(lowerSearchTerm) || driver.vehicleRegistration.toLowerCase().includes(lowerSearchTerm);
        });
    }, [drivers, searchTerm]);

    return (
        <div>        
        <div className={styles.driverListContainer}>
            <SearchBox onSearchChange={setSearchTerm} placeholder="Search for Driver" />
            <div className={styles.driverList}>
                <div className={styles.driverListItem}>
                    <div className={styles.driverNameHeader}>Driver Name</div>
                    <div className={styles.vehicleRegHeader}>Vehicle Reg</div>
                    <div className={styles.activityDurationHeader}>Total Activity Duration</div>
                    <div className={styles.weeklyGridHeader}>
                        <div className={styles.dayHeader}>Mon</div>
                        <div className={styles.dayHeader}>Tue</div>
                        <div className={styles.dayHeader}>Wed</div>
                        <div className={styles.dayHeader}>Thu</div>
                        <div className={styles.dayHeader}>Fri</div>
                        <div className={styles.dayHeader}>Sat</div>
                        <div className={styles.dayHeader}>Sun</div>
                    </div>
                </div>
                {filteredDrivers.map(driver => (
                    <DriverItem driver={driver} />
                ))}
            </div>
        </div>
        </div>
    );
};

export default DriverList;