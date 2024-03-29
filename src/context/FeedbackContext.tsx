import { useState, useContext, createContext, useCallback } from 'react';
import { Stack, Box } from '@mui/material';
import { v4 } from 'uuid';

import { Alert } from '@/components/atoms';
import { AlertMessage } from '@/lib/types';

export const FeedbackContext = createContext({
  addAlertMessage: (alertMessage: AlertMessage) => {},
});

export const useFeedbackContext = () => {
  const feedbackContext = useContext(FeedbackContext);
  if (feedbackContext === null) {
    throw new Error('Error retrieving context for feedback');
  }
  return feedbackContext;
};

export const FeedbackProvider = ({ children }) => {
  const [alertMessages, setAlertMessages] = useState<AlertMessage[]>([]);

  const addAlertMessage = (alertMessage: AlertMessage) => {
    alertMessage.variant = alertMessage.variant || 'filled';

    if (!alertMessage.id) {
      alertMessage.id = v4();
    }
    setAlertMessages((prevAlertMessages) => [
      ...prevAlertMessages,
      alertMessage,
    ]);
  };

  const removeAlertMessage = useCallback((id: string) => {
    setAlertMessages((prevAlertMessages) =>
      prevAlertMessages.filter((alertMessage) => alertMessage.id !== id)
    );
  }, []);

  return (
    <FeedbackContext.Provider value={{ addAlertMessage }}>
      {children}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          zIndex: (theme) => theme.zIndex.tooltip,
          paddingBottom: 1,
          paddingLeft: 1,
        }}
      >
        <Stack spacing={1}>
          {alertMessages.map((alertMessage) => {
            return (
              <Alert
                key={alertMessage.id}
                id={alertMessage.id}
                severity={alertMessage.severity}
                variant={alertMessage.variant}
                text={alertMessage.text}
                alertTitle={alertMessage.alertTitle}
                removeSelf={(id) => {
                  removeAlertMessage(id);
                }}
              />
            );
          })}
        </Stack>
      </Box>
    </FeedbackContext.Provider>
  );
};
