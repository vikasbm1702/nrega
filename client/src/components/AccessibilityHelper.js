import React from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ContrastIcon from '@mui/icons-material/Contrast';
import TranslateIcon from '@mui/icons-material/Translate';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const AccessibilityHelper = ({ onFontSizeChange, onContrastChange, onLanguageChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    // Set language based on current locale
    utterance.lang = document.documentElement.lang || 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
      <IconButton
        aria-label="accessibility options"
        onClick={handleClick}
        sx={{ backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}
      >
        <AccessibilityNewIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => onFontSizeChange('increase')}>
          <TextFieldsIcon sx={{ mr: 1 }} />
          <Typography>Increase Font Size</Typography>
        </MenuItem>
        <MenuItem onClick={() => onFontSizeChange('decrease')}>
          <TextFieldsIcon sx={{ mr: 1 }} />
          <Typography>Decrease Font Size</Typography>
        </MenuItem>
        <MenuItem onClick={() => onContrastChange()}>
          <ContrastIcon sx={{ mr: 1 }} />
          <Typography>High Contrast</Typography>
        </MenuItem>
        <MenuItem onClick={() => onLanguageChange()}>
          <TranslateIcon sx={{ mr: 1 }} />
          <Typography>Change Language</Typography>
        </MenuItem>
        <MenuItem onClick={() => speak(document.title)}>
          <VolumeUpIcon sx={{ mr: 1 }} />
          <Typography>Read Aloud</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AccessibilityHelper;