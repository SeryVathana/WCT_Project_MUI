import { Stack, Typography } from '@mui/joy';
import { Link } from 'react-router-dom';

function Notfound() {
  return (
    <Stack height={'50vh'} alignItems={'center'} justifyContent={'center'}>
      <Typography level='h1' fontSize={'60px'} color='danger' letterSpacing={'5px'}>
        404
      </Typography>
      <Typography textAlign={'center'}>
        Page is not found <br /> or under construction.
      </Typography>

      <Link to={'/'} style={{ marginTop: '10px' }}>
        Home Page
      </Link>
    </Stack>
  );
}

export default Notfound;
