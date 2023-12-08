import { useColorScheme } from '@mui/joy/styles';

import { LuSunMedium } from 'react-icons/lu';
import { LuMoon } from 'react-icons/lu';
import { IconButton } from '@mui/joy';

export default function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <IconButton variant='outlined' color='neutral' onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
      {mode === 'dark' ? <LuMoon /> : <LuSunMedium />}
    </IconButton>
  );
}
