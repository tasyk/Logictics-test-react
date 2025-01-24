import React from 'react';
import styles from './DriverItem.module.css';

interface DriverItemProps {
    driver: Driver;
}
const DriverItem: React.FC<DriverItemProps> = ({ driver }) => {
    const weekStartDateStr = '2021-02-01'; // This can be dynamically set as needed
    const weeklyActivities = calculateWeeklyActivityTimes(driver, weekStartDateStr);
    const weeklyActivityDays = getWeeklyActivityDays(driver, weekStartDateStr);
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

const getWeeklyActivityDays = (driver: Driver, weekStartDateStr: string) => {
    const daysActivity = Array(7).fill(false);
    if (driver.traces) {
        driver.traces.forEach(trace => {
            if (isDateInWeek(trace.date, weekStartDateStr)) {
                const dayIndex = getDayOfWeek(trace.date, weekStartDateStr);
                daysActivity[dayIndex] = true;
            }
        });
    }
    return daysActivity;
};

const calculateWeeklyActivityTimes = (driver: Driver, weekStartDateStr: string) => {
    const weeklyActivities: { [type: string]: number } = {
        drive: 0,
        work: 0,
        rest: 0,
        available: 0,
    };
    if (driver.traces) {
        driver.traces.forEach(trace => {
            if (isDateInWeek(trace.date, weekStartDateStr)) {
                trace.activity.forEach(activity => {
                    weeklyActivities[activity.type] = (weeklyActivities[activity.type] || 0) + activity.duration;
                });
            }
        });
    }
    return weeklyActivities;
};

// Helper function to check if a date is within a given week
const isDateInWeek = (dateStr: string, weekStartDateStr: string): boolean => {
    const date = new Date(dateStr);
    const weekStartDate = new Date(weekStartDateStr);
    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekEndDate.getDate() + 6);
    return date >= weekStartDate && date <= weekEndDate;
};

// Helper function to get the day of the week (0-6) for a given week start date
const getDayOfWeek = (dateStr: string, weekStartDateStr: string): number => {
    const date = new Date(dateStr);
    const weekStartDate = new Date(weekStartDateStr);
    const diffTime = Math.abs(date.getTime() - weekStartDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays; // day index 0 for weekStartDate, 1 for the next day, ..., 6 for the last day of the week
};


export default DriverItem;