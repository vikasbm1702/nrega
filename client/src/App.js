import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// Components
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DistrictSelector from './components/DistrictSelector';
import ProjectDescription from './components/ProjectDescription';

// Create theme with accessibility features
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    fontSize: 16, // Larger base font size for better readability
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.1rem', // Larger button text
          padding: '10px 20px',
        },
      },
    },
  },
});

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<DistrictSelector />} />
            <Route path="/projects" element={<ProjectDescription />} />
            <Route path="/dashboard/:state/:district" element={<Dashboard />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;