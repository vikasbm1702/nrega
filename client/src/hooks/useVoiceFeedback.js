/**
 * Custom Hook: useVoiceFeedback
 * Provides voice feedback for dashboard data
 * Automatically announces key metrics in user's selected language
 */

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import voiceService from '../services/voiceService';

export const useVoiceFeedback = (data, enabled = false) => {
  const { i18n } = useTranslation();

  /**
   * Format number in readable form
   */
  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)} million`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)} thousand`;
    return num.toString();
  };

  /**
   * Generate voice summary of dashboard data
   */
  const generateDataSummary = () => {
    if (!data) return '';

    let summary = 'Dashboard data: ';

    // Add key metrics if available
    if (data.workerCount !== undefined) {
      summary += `Workers: ${formatNumber(data.workerCount)}. `;
    }

    if (data.expenditure !== undefined) {
      summary += `Expenditure: ${formatNumber(data.expenditure)} rupees. `;
    }

    if (data.workdays !== undefined) {
      summary += `Work days: ${formatNumber(data.workdays)}. `;
    }

    if (data.totalJobs !== undefined) {
      summary += `Total jobs: ${formatNumber(data.totalJobs)}. `;
    }

    if (data.completedJobs !== undefined) {
      const percentage = data.totalJobs > 0 
        ? ((data.completedJobs / data.totalJobs) * 100).toFixed(1) 
        : 0;
      summary += `Completed: ${percentage} percent. `;
    }

    if (data.state) {
      summary += `State: ${data.state}. `;
    }

    if (data.district) {
      summary += `District: ${data.district}. `;
    }

    return summary;
  };

  /**
   * Announce data via voice
   */
  const announceData = async () => {
    if (!enabled) return;

    try {
      const summary = generateDataSummary();
      if (summary) {
        await voiceService.speak(summary, i18n.language, 0.9, 1.0);
      }
    } catch (error) {
      console.error('Voice feedback error:', error);
    }
  };

  /**
   * Announce error message
   */
  const announceError = async (errorMessage) => {
    if (!enabled) return;

    try {
      const message = `Error: ${errorMessage}. Please try again.`;
      await voiceService.speak(message, i18n.language, 1.0, 1.2);
    } catch (error) {
      console.error('Voice error announcement failed:', error);
    }
  };

  /**
   * Auto-announce when data changes (only if enabled)
   */
  useEffect(() => {
    if (enabled && data) {
      // Add small delay to ensure UI has rendered
      const timer = setTimeout(announceData, 1000);
      return () => clearTimeout(timer);
    }
  }, [data, enabled, i18n.language]);

  return {
    announceData,
    announceError,
    generateDataSummary
  };
};

export default useVoiceFeedback;