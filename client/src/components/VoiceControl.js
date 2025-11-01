/**
 * Voice Control Component - UI for audio-first navigation
 * Provides visual feedback and controls for voice interface
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Card,
  CardContent,
  Slider,
  Stack,
  Typography,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import {
  Mic,
  MicOff,
  VolumeUp,
  VolumeDown,
  Settings,
  Close
} from '@mui/icons-material';
import voiceService from '../services/voiceService';

const VoiceControl = ({ onStateSelected, onDistrictSelected, isEnabled = true }) => {
  const { i18n, t } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [speechPitch, setSpeechPitch] = useState(1.0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [recognitionResult, setRecognitionResult] = useState('');
  const [voiceSupport, setVoiceSupport] = useState({ textToSpeech: false, speechRecognition: false });

  /**
   * Process recognized speech
   */
  const handleRecognitionResult = useCallback((transcript) => {
    const lowerTranscript = transcript.toLowerCase().trim();
    
    // Try to match state or district names
    // Call both callbacks to let parent decide which one applies
    if (onStateSelected) {
      onStateSelected(lowerTranscript);
    }
    if (onDistrictSelected) {
      onDistrictSelected(lowerTranscript);
    }
  }, [onStateSelected, onDistrictSelected]);

  // Initialize voice service and check support
  useEffect(() => {
    const support = voiceService.isSupported();
    setVoiceSupport(support);

    // Setup event handlers
    voiceService.onSpeakingStart = () => setIsSpeaking(true);
    voiceService.onSpeakingEnd = () => setIsSpeaking(false);
    voiceService.onListeningStart = () => {
      setIsListening(true);
      setRecognitionResult('');
    };
    voiceService.onListeningEnd = () => setIsListening(false);
    voiceService.onRecognitionResult = (result) => {
      setRecognitionResult(result.interim || result.final);
      if (result.isFinal) {
        handleRecognitionResult(result.final);
      }
    };
    voiceService.onError = (error) => {
      setError(error);
      setTimeout(() => setError(null), 5000);
    };

    return () => {
      voiceService.dispose();
    };
  }, [handleRecognitionResult]);

  /**
   * Speak dashboard information
   */
  const handleSpeak = async (text) => {
    try {
      setError(null);
      await voiceService.speak(text, i18n.language, speechRate, speechPitch);
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Start listening for voice commands
   */
  const handleStartListening = async () => {
    try {
      setError(null);
      setRecognitionResult('');
      await voiceService.startListening(i18n.language);
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Stop listening
   */
  const handleStopListening = () => {
    voiceService.stopListening();
  };

  /**
   * Speak voice instructions
   */
  const speakInstructions = () => {
    const instructions = t('voice.instructions', 
      'Welcome to MGNREGA Dashboard. Click the microphone button to select your state or district using voice.'
    );
    handleSpeak(instructions);
  };

  if (!isEnabled) return null;

  const hasVoiceSupport = voiceSupport.textToSpeech || voiceSupport.speechRecognition;

  if (!hasVoiceSupport) {
    return (
      <Card sx={{ mb: 2, bgcolor: '#fff3cd', border: '1px solid #ffc107' }}>
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            ⚠️ Voice features not supported in your browser. Please use Chrome, Edge, or Safari for audio interface.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card sx={{ mb: 2, bgcolor: '#e3f2fd', border: '2px solid #2196f3' }}>
        <CardContent>
          <Stack spacing={2}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Mic sx={{ color: '#2196f3', fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  🎤 Voice Navigation
                </Typography>
              </Box>
              <Tooltip title="Voice Settings">
                <IconButton 
                  size="small"
                  onClick={() => setSettingsOpen(true)}
                >
                  <Settings />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" onClose={() => setError(null)}>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                  {error}
                </Typography>
              </Alert>
            )}

            {/* Listening Status */}
            {isListening && (
              <Box sx={{ 
                p: 2, 
                bgcolor: '#fff', 
                borderRadius: 1,
                border: '2px dashed #4caf50',
                textAlign: 'center'
              }}>
                <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                  🎙️ Listening...
                </Typography>
                {recognitionResult && (
                  <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                    Heard: "{recognitionResult}"
                  </Typography>
                )}
              </Box>
            )}

            {/* Speaking Status */}
            {isSpeaking && (
              <Box sx={{ 
                p: 2, 
                bgcolor: '#fff', 
                borderRadius: 1,
                border: '2px dashed #2196f3',
                textAlign: 'center'
              }}>
                <Typography variant="body2" sx={{ color: '#2196f3', fontWeight: 'bold' }}>
                  🔊 Speaking...
                </Typography>
              </Box>
            )}

            {/* Control Buttons */}
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {/* Microphone Button */}
              <Tooltip title={isListening ? 'Stop Listening' : 'Start Voice Recognition'}>
                <Button
                  variant={isListening ? 'contained' : 'outlined'}
                  color={isListening ? 'error' : 'primary'}
                  onClick={isListening ? handleStopListening : handleStartListening}
                  startIcon={isListening ? <MicOff /> : <Mic />}
                  sx={{ 
                    fontSize: '0.9rem',
                    py: 1,
                    px: 2,
                    minWidth: '120px'
                  }}
                >
                  {isListening ? 'Listening' : 'Listen'}
                </Button>
              </Tooltip>

              {/* Speak Instructions Button */}
              <Tooltip title="Hear Instructions">
                <Button
                  variant="outlined"
                  color="info"
                  onClick={speakInstructions}
                  startIcon={<VolumeUp />}
                  disabled={isSpeaking || isListening}
                  sx={{ 
                    fontSize: '0.9rem',
                    py: 1,
                    px: 2
                  }}
                >
                  Help
                </Button>
              </Tooltip>

              {/* Stop All Button */}
              <Tooltip title="Stop All Audio">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => voiceService.stop()}
                  disabled={!isSpeaking && !isListening}
                  sx={{ 
                    fontSize: '0.9rem',
                    py: 1,
                    px: 2
                  }}
                >
                  Stop
                </Button>
              </Tooltip>
            </Stack>

            {/* Language Info */}
            <Typography variant="caption" sx={{ color: '#666' }}>
              🌐 Current Language: <strong>{i18n.language.toUpperCase()}</strong> 
              (Change in settings to switch voice language)
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {/* Settings Dialog */}
      <Dialog 
        open={settingsOpen} 
        onClose={() => setSettingsOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>🔊 Voice Settings</span>
            <IconButton size="small" onClick={() => setSettingsOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={3}>
            {/* Speech Rate */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Speech Speed: {speechRate.toFixed(1)}x
              </Typography>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <VolumeDown sx={{ fontSize: 18 }} />
                <Slider
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  value={speechRate}
                  onChange={(e, newValue) => setSpeechRate(newValue)}
                  sx={{ flex: 1 }}
                />
                <VolumeUp sx={{ fontSize: 18 }} />
              </Stack>
              <Typography variant="caption" color="textSecondary">
                Slow (0.5) ← → Fast (2.0)
              </Typography>
            </Box>

            {/* Speech Pitch */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Voice Pitch: {speechPitch.toFixed(1)}x
              </Typography>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <VolumeDown sx={{ fontSize: 18 }} />
                <Slider
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  value={speechPitch}
                  onChange={(e, newValue) => setSpeechPitch(newValue)}
                  sx={{ flex: 1 }}
                />
                <VolumeUp sx={{ fontSize: 18 }} />
              </Stack>
              <Typography variant="caption" color="textSecondary">
                Deep (0.5) ← → High (2.0)
              </Typography>
            </Box>

            {/* Test Button */}
            <Box>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleSpeak('Testing voice. Is this clear?')}
                disabled={isSpeaking || isListening}
              >
                Test Voice
              </Button>
            </Box>

            {/* Voice Support Info */}
            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                <strong>Voice Support:</strong>
              </Typography>
              <Typography variant="caption">
                ✅ Text-to-Speech: {voiceSupport.textToSpeech ? 'Enabled' : 'Disabled'}
              </Typography>
              <Typography variant="caption" sx={{ display: 'block' }}>
                ✅ Speech Recognition: {voiceSupport.speechRecognition ? 'Enabled' : 'Disabled'}
              </Typography>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setSettingsOpen(false)} variant="contained">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VoiceControl;