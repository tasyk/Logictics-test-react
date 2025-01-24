import React from 'react';
import styles from './Sidebar.module.css';
import Link from 'next/link';

interface SidebarProps {
    menuItems: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
    return (
        <aside className={styles.sidebar}>
            <h3>Side Menu</h3>
            <nav>
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.title} className={styles.menuItem}>
                            <Link href={item.url}>
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;