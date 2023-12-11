import { useState } from 'react';
import { storeDB } from '../firebaseConfig';

import { Stack } from '@mui/joy';

function UploadImgTest() {
  const [text, setText] = useState('');

  return (
    <Stack>
      <input onChange={(e) => setText} />
    </Stack>
  );
}

export default UploadImgTest;
