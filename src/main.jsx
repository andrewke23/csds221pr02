import { StrictMode } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';

import App from './App';
import { SnackbarProvider } from 'notistack';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        maxSnack={5}
      >
        <App />
      </SnackbarProvider>
    </StyledEngineProvider>
  </StrictMode>
);
