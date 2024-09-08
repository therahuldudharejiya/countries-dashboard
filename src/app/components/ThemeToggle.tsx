'use client';
import React, { useState, useEffect } from 'react';

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<string>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
            return newTheme;
        });
    };

    return (
        <span
            onClick={toggleTheme}
            className=""
        >
            {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </span>

    );
};

export default ThemeToggle;
