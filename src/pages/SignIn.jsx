import { Grid, Stack, Typography } from '@mui/joy';

export default function SignIn() {
  return (
    <Grid container columns={3} sx={{ marginTop: '100px' }}>
      <Grid xs={2}>
        <Stack justifyContent={'center'} alignItems={'center'}>
          <Typography level='h1'>Welcome Back</Typography>
          <Typography level='h3'>Sign In</Typography>
        </Stack>
      </Grid>
      <Grid xs={1}></Grid>
    </Grid>
  );
}
