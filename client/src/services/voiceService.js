/**
 * Voice Service - Audio-first interface for MGNREGA Dashboard
 * Supports: Text-to-Speech, Speech Recognition (12 Indian languages)
 * Designed for: Low-literacy rural users in India
 * 
 * Features:
 * - TTS with regional language support
 * - Speech recognition for state/district selection
 * - Offline-capable voice processing via Web Audio API
 * - Fallback mechanisms for unsupported browsers
 */

class VoiceService {
  constructor() {
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance;

    this.SpeechRecognition = SpeechRecognition;
    this.SpeechSynthesisUtterance = SpeechSynthesisUtterance;
    
    this.recognitionInstance = null;
    this.isSpeaking = false;
    this.isListening = false;
    
    // Language code mappings to BCP-47 format for Web Speech API
    this.languageMap = {
      'en': 'en-US',      // English
      'hi': 'hi-IN',      // Hindi
      'ta': 'ta-IN',      // Tamil
      'bn': 'bn-IN',      // Bengali
      'mr': 'mr-IN',      // Marathi
      'gu': 'gu-IN',      // Gujarati
      'pa': 'pa-IN',      // Punjabi
      'te': 'te-IN',      // Telugu
      'kn': 'kn-IN',      // Kannada
      'ml': 'ml-IN',      // Malayalam
      'or': 'or-IN',      // Odia
      'ur': 'ur-IN'       // Urdu
    };

    // Callbacks for UI updates
    this.onSpeakingStart = null;
    this.onSpeakingEnd = null;
    this.onListeningStart = null;
    this.onListeningEnd = null;
    this.onRecognitionResult = null;
    this.onError = null;
  }

  /**
   * Speak text in specified language
   * @param {string} text - Text to speak
   * @param {string} languageCode - Language code (e.g., 'hi', 'ta', 'en')
   * @param {number} rate - Speech rate (0.5-2.0, default 1.0)
   * @param {number} pitch - Pitch (0.5-2.0, default 1.0)
   * @returns {Promise} - Resolves when speech ends
   */
  async speak(text, languageCode = 'en', rate = 1.0, pitch = 1.0) {
    return new Promise((resolve, reject) => {
      if (!this.SpeechSynthesisUtterance) {
        reject(new Error('Text-to-Speech not supported in this browser'));
        return;
      }

      // Cancel any ongoing speech
      this.stop();

      try {
        const utterance = new this.SpeechSynthesisUtterance(text);
        
        // Set language - fallback to English if not found
        const lang = this.languageMap[languageCode] || this.languageMap['en'];
        utterance.lang = lang;
        
        // Set voice properties
        utterance.rate = Math.max(0.5, Math.min(2.0, rate));
        utterance.pitch = Math.max(0.5, Math.min(2.0, pitch));
        utterance.volume = 1.0;

        // Event handlers
        utterance.onstart = () => {
          this.isSpeaking = true;
          if (this.onSpeakingStart) this.onSpeakingStart();
        };

        utterance.onend = () => {
          this.isSpeaking = false;
          if (this.onSpeakingEnd) this.onSpeakingEnd();
          resolve();
        };

        utterance.onerror = (event) => {
          this.isSpeaking = false;
          const errorMsg = `Speech error: ${event.error}`;
          if (this.onError) this.onError(errorMsg);
          reject(new Error(errorMsg));
        };

        // Speak the text
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        if (this.onError) this.onError(error.message);
        reject(error);
      }
    });
  }

  /**
   * Start listening for speech recognition
   * @param {string} languageCode - Language code for recognition
   * @param {array} interimResults - Whether to return interim results
   * @returns {void}
   */
  async startListening(languageCode = 'en', interimResults = true) {
    if (!this.SpeechRecognition) {
      const msg = '🚫 Speech Recognition not supported in your browser. Please use Chrome, Edge, or Safari.';
      if (this.onError) this.onError(msg);
      return;
    }

    if (this.isListening) {
      return; // Already listening
    }

    try {
      // Check microphone permission first
      const hasPermission = await this.checkMicrophonePermission();
      if (!hasPermission) {
        const msg = await this.requestMicrophonePermission();
        if (!msg) {
          if (this.onError) this.onError(this.getRecognitionErrorMessage('not-allowed'));
          return;
        }
      }

      this.recognitionInstance = new this.SpeechRecognition();
      
      // Set language - fallback to English if not found
      const lang = this.languageMap[languageCode] || this.languageMap['en'];
      this.recognitionInstance.lang = lang;
      
      // Recognition settings
      this.recognitionInstance.continuous = false;
      this.recognitionInstance.interimResults = interimResults;
      this.recognitionInstance.maxAlternatives = 1;

      this.recognitionInstance.onstart = () => {
        this.isListening = true;
        if (this.onListeningStart) this.onListeningStart();
      };

      this.recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (this.onRecognitionResult) {
          this.onRecognitionResult({
            final: finalTranscript.trim(),
            interim: interimTranscript.trim(),
            isFinal: finalTranscript.length > 0
          });
        }
      };

      this.recognitionInstance.onend = () => {
        this.isListening = false;
        if (this.onListeningEnd) this.onListeningEnd();
      };

      this.recognitionInstance.onerror = (event) => {
        this.isListening = false;
        // Map 'not-allowed' and 'permission-denied' errors appropriately
        let errorCode = event.error;
        if (errorCode === 'not-allowed') {
          errorCode = 'not-allowed';
        }
        const errorMsg = this.getRecognitionErrorMessage(errorCode);
        if (this.onError) this.onError(errorMsg);
      };

      this.recognitionInstance.start();
    } catch (error) {
      const errorMsg = `❌ ${error.message || 'Could not start speech recognition'}`;
      if (this.onError) this.onError(errorMsg);
    }
  }

  /**
   * Stop listening
   */
  stopListening() {
    if (this.recognitionInstance && this.isListening) {
      this.recognitionInstance.stop();
      this.isListening = false;
    }
  }

  /**
   * Stop speaking
   */
  stop() {
    if (this.isSpeaking) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
    }
    this.stopListening();
  }

  /**
   * Get friendly error message for recognition errors
   * Provides context-aware messages for rural Indian users
   */
  getRecognitionErrorMessage(error) {
    const errorMessages = {
      'no-speech': '🔇 No speech detected. Please speak clearly into your microphone and try again.',
      'audio-capture': '🎤 Microphone not found. Please:\n1. Check if microphone is connected\n2. Grant permission when browser asks\n3. Check microphone volume',
      'network': '🌐 Speech service not available. Try:\n1. Check internet connection\n2. Refresh page and try again\n3. Use Chrome browser for best support',
      'not-allowed': '❌ Microphone permission denied. Please:\n1. Allow microphone access when asked\n2. Check browser permissions settings\n3. Refresh page and try again',
      'permission-denied': '❌ Microphone permission denied. Please allow access in browser settings.',
      'aborted': '⏹️ Speech recognition was stopped.',
      'service-not-allowed': '🚫 Speech recognition service not allowed. Check browser settings.',
      'bad-grammar': '📝 Could not understand the grammar. Please try a simpler phrase.',
      'unknown': '⚠️ Unknown error. Try:\n1. Refresh the page\n2. Check microphone\n3. Ensure microphone is not muted'
    };

    return errorMessages[error] || errorMessages['unknown'];
  }

  /**
   * Check microphone permission status
   * @returns {Promise<boolean>} - true if permission granted
   */
  async checkMicrophonePermission() {
    try {
      if (!navigator.permissions || !navigator.permissions.query) {
        return true; // Assume allowed if we can't check
      }

      const result = await navigator.permissions.query({ name: 'microphone' });
      return result.state === 'granted';
    } catch (error) {
      // If we can't check, try to access it
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        return true;
      } catch {
        return false;
      }
    }
  }

  /**
   * Request microphone permission
   * @returns {Promise<boolean>} - true if permission granted
   */
  async requestMicrophonePermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      const errorMsg = `Microphone permission error: ${error.name}`;
      if (this.onError) this.onError(errorMsg);
      return false;
    }
  }

  /**
   * Check if voice features are available
   */
  isSupported() {
    return {
      textToSpeech: !!this.SpeechSynthesisUtterance,
      speechRecognition: !!this.SpeechRecognition
    };
  }

  /**
   * Get available voices
   */
  getAvailableVoices() {
    if (!window.speechSynthesis) return [];
    return window.speechSynthesis.getVoices();
  }

  /**
   * Cleanup resources
   */
  dispose() {
    this.stop();
    if (this.recognitionInstance) {
      this.recognitionInstance = null;
    }
  }
}

// Singleton instance
// eslint-disable-next-line import/no-anonymous-default-export
export default new VoiceService();