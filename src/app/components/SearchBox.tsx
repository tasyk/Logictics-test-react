
import React from 'react';
import styles from './SearchBox.module.css';

interface SearchBoxProps {
    onSearchChange: (searchTerm: string) => void;
    placeholder: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearchChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
    };

    return (
        <div className={styles.searchBox}>
            <input
                type="text"
                placeholder="Search drivers..."
                onChange={handleChange}
                className={styles.searchInput}
            />
        </div>
    );
};

export default SearchBox;