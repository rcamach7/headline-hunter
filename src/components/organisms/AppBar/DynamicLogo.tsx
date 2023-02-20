import { Box } from '@mui/material';
import Image from 'next/image';

export default function DynamicLogo() {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: 'flex', sm: 'none', alignItems: 'center' },
          minWidth: 50,
          pr: 1,
        }}
      >
        <Image src="/h_h.svg" alt="Headline Hunter" width={50} height={50} />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: { xs: 'none', sm: 'flex', alignItems: 'center' },
        }}
      >
        <Image
          src="/headline_hunter.svg"
          alt="Headline Hunter"
          width={200}
          height={50}
        />
      </Box>
    </>
  );
}
