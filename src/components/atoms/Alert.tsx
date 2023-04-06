import { Alert as MuiAlert, AlertTitle } from '@mui/material';
import { useEffect } from 'react';

interface Props {
  severity: 'error' | 'info' | 'success' | 'warning';
  text: string;
  variant: 'filled' | 'outlined' | 'standard';
  alertTitle?: string;
  id: string;
  removeSelf: (id: string) => void;
}

export default function Alert({
  id,
  severity,
  text,
  variant,
  alertTitle,
  removeSelf,
}: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeSelf(id);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [id, removeSelf]);

  return (
    <MuiAlert
      severity={severity}
      variant={variant}
      onClose={() => removeSelf(id)}
    >
      {alertTitle && <AlertTitle>{alertTitle}</AlertTitle>}
      {text}
    </MuiAlert>
  );
}
