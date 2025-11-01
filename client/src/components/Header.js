import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useState } from 'react';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = (lang) => {
    setAnchorEl(null);
    if (typeof lang === 'string') {
      i18n.changeLanguage(lang);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t('dashboard.title')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            color="inherit" 
            component={RouterLink}
            to="/projects"
            sx={{ mr: 2 }}
          >
            {t('project.description')}
          </Button>
          <Button 
            color="inherit" 
            href="https://nrega.nic.in/netnrega/home.aspx" 
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mr: 2 }}
          >
            {t('header.officialSite')}
          </Button>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="language"
            onClick={handleLanguageClick}
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleLanguageClose()}
            slotProps={{
              paper: {
                style: {
                  maxHeight: '48 * 4.5',
                  width: '20ch',
                },
              },
            }}
          >
            <MenuItem onClick={() => handleLanguageClose('en')}>English</MenuItem>
            <MenuItem onClick={() => handleLanguageClose('hi')}>हिंदी (Hindi)</MenuItem>
            <MenuItem onClick={() => handleLanguageClose('mr')}>मराठी (Marathi)</MenuItem>
            <MenuItem onClick={() => handleLanguageClose('te')}>తెలుగు (Telugu)</MenuItem>
            <MenuItem onClick={() => handleLanguageClose('ta')}>தமிழ் (Tamil)</MenuItem>
            <MenuItem onClick={() => handleLanguageClose('kn')}>ಕನ್ನಡ (Kannada)</MenuItem>
            <MenuItem onClick={() => handleLanguageClose('gu')}>ગુજરાતી (Gujarati)</MenuItem>
            <MenuItem onClick={() => handleLanguageClose('bn')}>বাংলা (Bengali)</MenuItem>
            <MenuItem onClick={() => handleLanguageClose('pa')}>ਪੰਜਾਬੀ (Punjabi)</MenuItem>
            <MenuItem onClick={() => handleLanguageClose('or')}>ଓଡ଼ିଆ (Odia)</MenuItem>
            <MenuItem onClick={() => handleLanguageClose('ml')}>മലയാളം (Malayalam)</MenuItem>
            <MenuItem onClick={() => handleLanguageClose('as')}>অসমীয়া (Assamese)</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;