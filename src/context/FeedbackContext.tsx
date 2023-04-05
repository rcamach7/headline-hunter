import { useState, useContext, createContext } from 'react';
import { Stack, Box } from '@mui/material';
import { v4 } from 'uuid';

import { Alert } from '@/components/atoms';

type AlertMessage = {
  id?: string;
  severity: 'error' | 'info' | 'success' | 'warning';
  variant: 'filled' | 'outlined' | 'standard';
  text: string;
  alertTitle?: string;
};

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
    if (!alertMessage.id) {
      alertMessage.id = v4();
    }
    setAlertMessages((prevAlertMessages) => [
      ...prevAlertMessages,
      alertMessage,
    ]);
  };

  const removeAlertMessage = (id: string) => {
    setAlertMessages((prevAlertMessages) =>
      prevAlertMessages.filter((alertMessage) => alertMessage.id !== id)
    );
  };

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
        <Stack>
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
