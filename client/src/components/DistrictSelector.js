import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  Autocomplete,
  TextField
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import VoiceControl from './VoiceControl';

const DistrictSelector = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState('');

  /**
   * Fuzzy match voice input against list of options
   * Returns best match or null
   */
  const fuzzyMatch = (input, options) => {
    if (!input || options.length === 0) return null;
    
    const inputLower = input.toLowerCase().trim();
    
    // Exact match first
    const exactMatch = options.find(opt => opt.toLowerCase() === inputLower);
    if (exactMatch) return exactMatch;
    
    // Partial match (contains)
    const partialMatch = options.find(opt => 
      opt.toLowerCase().includes(inputLower) || inputLower.includes(opt.toLowerCase())
    );
    if (partialMatch) return partialMatch;
    
    // Levenshtein distance for typos
    const scores = options.map(opt => {
      const dist = levenshteinDistance(inputLower, opt.toLowerCase());
      return { option: opt, score: dist };
    });
    
    const bestMatch = scores.sort((a, b) => a.score - b.score)[0];
    return bestMatch.score < 4 ? bestMatch.option : null;
  };

  /**
   * Calculate Levenshtein distance between two strings
   */
  const levenshteinDistance = (s1, s2) => {
    const len1 = s1.length;
    const len2 = s2.length;
    const matrix = Array(len2 + 1).fill(null).map(() => Array(len1 + 1).fill(0));
    
    for (let i = 0; i <= len1; i++) matrix[0][i] = i;
    for (let j = 0; j <= len2; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= len2; j++) {
      for (let i = 1; i <= len1; i++) {
        const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    return matrix[len2][len1];
  };

  /**
   * Handle voice-based state/district selection
   */
  const handleVoiceSelection = async (input) => {
    if (!input || input.length < 2) return;
    
    // Try to match against states first
    if (!state) {
      const matchedState = fuzzyMatch(input, states);
      if (matchedState) {
        setState(matchedState);
        setVoiceMessage(`Selected state: ${matchedState}`);
        setTimeout(() => setVoiceMessage(''), 3000);
        return;
      }
    }
    
    // Try to match against districts
    if (state && !district) {
      const matchedDistrict = fuzzyMatch(input, districts);
      if (matchedDistrict) {
        setDistrict(matchedDistrict);
        setVoiceMessage(`Selected district: ${matchedDistrict}`);
        setTimeout(() => setVoiceMessage(''), 3000);
        return;
      }
    }
  };

  useEffect(() => {
    // Fetch list of states on mount (with pagination support)
    const loadStates = async () => {
      setLoadingStates(true);
      try {
        const res = await fetch('http://localhost:5001/api/districts/states?limit=500&offset=0');
        const response = await res.json();
        // Handle both paginated and non-paginated responses for backward compatibility
        const list = response.data || response;
        setStates(list || []);
      } catch (err) {
        console.error('Error loading states:', err);
      } finally {
        setLoadingStates(false);
      }
    };

    loadStates();
  }, []);

  useEffect(() => {
    // Fetch districts when state changes (with pagination support)
    if (!state) {
      setDistricts([]);
      return;
    }

    const loadDistricts = async () => {
      setLoadingDistricts(true);
      try {
        const res = await fetch(`http://localhost:5001/api/districts/states/${encodeURIComponent(state)}/districts?limit=500&offset=0`);
        const response = await res.json();
        // Handle both paginated and non-paginated responses for backward compatibility
        const list = response.data || response;
        setDistricts(list || []);
      } catch (err) {
        console.error('Error loading districts:', err);
      } finally {
        setLoadingDistricts(false);
      }
    };

    loadDistricts();
  }, [state]);

  const detectLocation = async () => {
    setLoading(true);
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // Call backend reverse geocoding endpoint that matches to our database
            const response = await fetch('http://127.0.0.1:5001/api/districts/reverse-geocode', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ latitude, longitude })
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Failed to detect location from coordinates');
            }

            const data = await response.json();
            setState(data.state);
            setDistrict(data.district);
          } catch (err) {
            console.error('Error reverse geocoding:', err);
            alert(`Could not detect location: ${err.message}. Please select manually.`);
          } finally {
            setLoading(false);
          }
        }, (error) => {
          console.error('Geolocation error:', error);
          let errorMessage = 'Could not access your location. ';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Permission denied. Please enable location services.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage += 'The request to get user location timed out.';
              break;
            default:
              errorMessage += 'An unknown error occurred.';
          }
          alert(errorMessage);
          setLoading(false);
        });
      } else {
        alert('Location detection is not supported by your browser');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error in location detection:', error);
      alert('An error occurred during location detection. Please select manually.');
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (state && district) {
      navigate(`/dashboard/${state}/${district}`);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {t('dashboard.title')}
        </Typography>

        <Box sx={{ my: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<MyLocationIcon />}
            onClick={detectLocation}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              t('location.detect')
            )}
          </Button>
        </Box>

        {/* Voice Control Component */}
        <VoiceControl 
          onStateSelected={handleVoiceSelection}
          onDistrictSelected={handleVoiceSelection}
          isEnabled={true}
        />

        {/* Voice Selection Feedback */}
        {voiceMessage && (
          <Box sx={{ 
            p: 2, 
            mb: 2, 
            bgcolor: '#c8e6c9', 
            border: '1px solid #4caf50',
            borderRadius: 1,
            textAlign: 'center'
          }}>
            <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
              ✅ {voiceMessage}
            </Typography>
          </Box>
        )}

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            {t('select.state')}
          </Typography>
          <Autocomplete
            options={states}
            value={state || null}
            onChange={(event, newValue) => {
              setState(newValue || '');
              setDistrict('');
            }}
            disabled={loadingStates}
            loading={loadingStates}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search and select state..."
              />
            )}
            noOptionsText="No states available"
            loadingText="Loading states..."
            isOptionEqualToValue={(option, value) => option === value}
            getOptionLabel={(option) => option}
            filterOptions={(options, state) =>
              options.filter((option) =>
                option.toLowerCase().includes(state.inputValue.toLowerCase())
              )
            }
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            {t('select.district')}
          </Typography>
          <Autocomplete
            options={districts}
            value={district || null}
            onChange={(event, newValue) => {
              setDistrict(newValue || '');
            }}
            disabled={!state || loadingDistricts}
            loading={loadingDistricts}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search and select district..."
              />
            )}
            noOptionsText="No districts available"
            loadingText="Loading districts..."
            isOptionEqualToValue={(option, value) => option === value}
            getOptionLabel={(option) => option}
            filterOptions={(options, state) =>
              options.filter((option) =>
                option.toLowerCase().includes(state.inputValue.toLowerCase())
              )
            }
          />
        </Box>

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={!state || !district}
        >
          View Dashboard
        </Button>
      </Paper>
    </Container>
  );
};

export default DistrictSelector;