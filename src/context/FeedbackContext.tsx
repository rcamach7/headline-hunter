import { createContext } from 'react';
import { useState, useEffect, useContext } from 'react';

export const FeedbackContext = createContext({});

export const useFeedbackContext = () => {
  const feedbackContext = useContext(FeedbackContext);
  if (feedbackContext === null) {
    throw new Error('Error retrieving context for feedback');
  }
  return feedbackContext;
};

export const FeedbackProvider = ({ children }) => {
  return (
    <FeedbackContext.Provider value={{}}>{children}</FeedbackContext.Provider>
  );
};
