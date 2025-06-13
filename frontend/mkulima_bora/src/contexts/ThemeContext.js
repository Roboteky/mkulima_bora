
// import { createContext, useContext, useState, useEffect } from 'react';

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(() => {
//     const savedTheme = localStorage.getItem('mkulima-bora-theme');
//     return savedTheme || 'dark';
//   });

//   const toggleTheme = () => {
//     setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
//   };

//   useEffect(() => {
//     document.documentElement.classList.remove('light', 'dark');
//     document.documentElement.classList.add(theme);
//     localStorage.setItem('mkulima-bora-theme', theme);
//   }, [theme]);

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);