import { Box } from '@mui/material';
import Link from 'next/link';
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
        <Link href="/">
          <a>
            <Image
              src="/h_h.svg"
              alt="Headline Hunter"
              width={50}
              height={50}
            />
          </a>
        </Link>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: { xs: 'none', sm: 'flex', alignItems: 'center' },
        }}
      >
        <Link href="/">
          <a>
            <Image
              src="/headline_hunter.svg"
              alt="Headline Hunter"
              width={200}
              height={50}
            />
          </a>
        </Link>
      </Box>
    </>
  );
}
