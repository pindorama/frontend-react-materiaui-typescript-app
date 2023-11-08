import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ToolbarProvider, } from './shared/contexts';

export const App = () => {
  return (
    <ToolbarProvider>
      <BrowserRouter>

        <AppRoutes/>

      </BrowserRouter>
    </ToolbarProvider>

  );
};