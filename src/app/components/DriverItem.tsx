import React from 'react';
import styles from './DriverItem.module.css';

interface DriverItemProps {
    driver: Driver;
}

const DriverItem: React.FC<DriverItemProps> = ({ driver }) => {
    const weeklyActivities = calculateWeeklyActivityTimes(driver);
    const weeklyActivityDays = getWeeklyActivityDays(driver);
    const totalActivityTime = Object.values(weeklyActivities).reduce((sum, duration) => sum + duration, 0);

    return (
        <div className={styles.driverItem}>
            <div className={styles.driverInfo}>
                <h3>{driver.forename} {driver.surname}</h3>
                <p>Vehicle: {driver.vehicleRegistration}</p>
            </div>
            <div className={styles.activitySummary}>
                <p>Total Activity Time: {totalActivityTime} minutes</p>
                <div className={styles.activityBreakdown}>
                    {Object.entries(weeklyActivities).map(([type, duration]) => (
                        <p key={type}>{type}: {duration} min</p>
                    ))}
                </div>
            </div>
            <div className={styles.weeklyGrid}>
                {weeklyActivityDays.map((hasActivity, index) => (
                    <div key={index} className={`${styles.dayBox} ${hasActivity ? styles.activeDay : ''}`}></div>
                ))}
            </div>
        </div>
    );
};

// Helper function to calculate weekly activity times
const calculateWeeklyActivityTimes = (driver: Driver) => {
    const weeklyActivities: { [type: string]: number } = {
        drive: 0,
        work: 0,
        rest: 0,
        available: 0,
    };
    if (driver.traces) {
        driver.traces.forEach(trace => {
            if (isDateInWeek(trace.date)) {
                trace.activity.forEach(activity => {
                    weeklyActivities[activity.type] = (weeklyActivities[activity.type] || 0) + activity.duration;
                });
            }
        });
    }
    return weeklyActivities;
};

// Helper function to get weekly activity days
const getWeeklyActivityDays = (driver: Driver) => {
    const daysActivity = Array(7).fill(false);
    if (driver.traces) {
        driver.traces.forEach(trace => {
            if (isDateInWeek(trace.date)) {
                const dayIndex = getDayOfWeek(trace.date);
                daysActivity[dayIndex] = true;
            }
        });
    }
    return daysActivity;
};


// Helper function to check if a date is within the week 1/2/2021 - 7/2/2021
const isDateInWeek = (dateStr: string): boolean => {
    const date = new Date(dateStr);
    const weekStartDate = new Date('2021-02-01');
    const weekEndDate = new Date('2021-02-07');
    return date >= weekStartDate && date <= weekEndDate;
};

// Helper function to get the day of the week (0-6) for the week starting 2021-02-01
const getDayOfWeek = (dateStr: string): number => {
    const date = new Date(dateStr);
    const weekStartDate = new Date('2021-02-01');
    const diffTime = Math.abs(date.getTime() - weekStartDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays; // day index 0 for 2021-02-01, 1 for 2021-02-02, ..., 6 for 2021-02-07
};


export default DriverItem;