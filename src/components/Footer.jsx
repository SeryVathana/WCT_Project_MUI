/* eslint-disable react/prop-types */
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Link,
  Stack,
  Typography,
} from '@mui/joy';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Footer() {
  const user = useSelector((state) => state.user.value);
  return (
    <Stack py={5}>
      <Divider />
      <Grid container my={5} spacing={5}>
        <Grid xs={12} sm={6} columns={2} pr={{ xs: 5, md: 20 }}>
          <Stack gap={1}>
            <Typography level='title-lg' color='primary'>
              Auctionaire
            </Typography>
            <Typography level='body-sm' mb={3}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, eligendi!
            </Typography>
            {user.userId == 0 && <EmailSubscribe />}
          </Stack>
        </Grid>
        <LinkContainer title='Site Map' data={links} />
        <LinkContainer title='Site Map' data={links} />
        <LinkContainer title='Site Map' data={links} />
      </Grid>
      <Divider />
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt={5}>
        <Stack direction={'row'} gap={5}>
          <Link color='neutral'>Terms & Conditions</Link>
          <Link color='neutral'>Privacy & Policy</Link>
        </Stack>
        <Typography color='neutral'>Copyright - Vathana & Samnang - 2023</Typography>
      </Stack>
    </Stack>
  );
}

function EmailSubscribe() {
  const [data, setData] = useState({
    email: '',
    status: 'initial',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setData((current) => ({ ...current, status: 'loading' }));
    try {
      // Replace timeout with real backend operation
      setTimeout(() => {
        setData({ email: '', status: 'sent' });
      }, 1500);
    } catch (error) {
      setData((current) => ({ ...current, status: 'failure' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} id='demo'>
      <FormControl>
        <FormLabel>Auctionaire Newsletter</FormLabel>
        <Input
          sx={{ '--Input-decoratorChildHeight': '45px', boxShadow: 'none' }}
          placeholder='example@gmail.com'
          type='email'
          required
          value={data.email}
          onChange={(event) => setData({ email: event.target.value, status: 'initial' })}
          error={data.status === 'failure'}
          endDecorator={
            <Button
              variant='solid'
              color='primary'
              loading={data.status === 'loading'}
              type='submit'
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Subscribe
            </Button>
          }
        />
        {data.status === 'failure' && (
          <FormHelperText sx={(theme) => ({ color: theme.vars.palette.danger[400] })}>
            Oops! something went wrong, please try again later.
          </FormHelperText>
        )}

        {data.status === 'sent' && (
          <FormHelperText sx={(theme) => ({ color: theme.vars.palette.primary[400] })}>
            You are all set!
          </FormHelperText>
        )}
      </FormControl>
    </form>
  );
}

const links = [
  {
    title: 'example',
    url: '#',
  },
  {
    title: 'example',
    url: '#',
  },
  {
    title: 'example',
    url: '#',
  },
  {
    title: 'example',
    url: '#',
  },
  {
    title: 'example',
    url: '#',
  },
];

function LinkContainer({ title = 'Untitled', data }) {
  return (
    <Grid xs={6} md={3} lg={2}>
      <Stack gap={1}>
        <Typography level='title-lg'>{title}</Typography>
        <Stack gap={1}>
          {data.map((link) => {
            return (
              <Link
                key={Math.random() * Math.random() + Math.random()}
                color='neutral'
                href={link.url}
              >
                {link.title}
              </Link>
            );
          })}
        </Stack>
      </Stack>
    </Grid>
  );
}
