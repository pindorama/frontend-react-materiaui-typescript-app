import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppThemeContext, ToolbarProvider, } from './shared/contexts';

export const App = () => {
  return (
    <AppThemeContext >
      <ToolbarProvider>
        <BrowserRouter>

          <AppRoutes/>

        </BrowserRouter>
      </ToolbarProvider>
    </AppThemeContext>

  );
};