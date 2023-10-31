import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppThemeContext } from './shared/contexts/ThemeContext';
export const App = () => {
  return (
    <AppThemeContext >
      <BrowserRouter>

        <AppRoutes/>

      </BrowserRouter>
    </AppThemeContext>

  );
};