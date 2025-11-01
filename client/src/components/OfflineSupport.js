import React, { useEffect, useState } from 'react';
import { Snackbar, Alert, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const OfflineSupport = () => {
  const { t } = useTranslation();
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);

  useEffect(() => {
    // Register service worker for offline support
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setShowUpdateNotification(true);
              }
            });
          });
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

    // Handle online/offline events
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleUpdate = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.update();
      });
    }
    setShowUpdateNotification(false);
  };

  return (
    <>
      <Snackbar
        open={isOffline}
        message={t('offline.message')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert severity="warning" sx={{ width: '100%' }}>
          {t('offline.message')}
        </Alert>
      </Snackbar>

      <Snackbar
        open={showUpdateNotification}
        message={t('update.available')}
        action={
          <Button color="secondary" size="small" onClick={handleUpdate}>
            {t('update.now')}
          </Button>
        }
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="info" sx={{ width: '100%' }}>
          {t('update.available')}
        </Alert>
      </Snackbar>
    </>
  );
};

export default OfflineSupport;