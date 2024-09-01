import { useTheme } from 'next-themes';

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    );
};

export default ThemeToggle;
