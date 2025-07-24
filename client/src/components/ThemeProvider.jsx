import { useSelector } from "react-redux";

export const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 dark:text-slate-200 dark:bg-black min-h-screen">
        {children}
      </div>
    </div>
  );
};
