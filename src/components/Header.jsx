import { Button, Input, Link, Stack, Typography } from '@mui/joy';
import { IoSearchOutline } from 'react-icons/io5';
import ModeToggle from './ModeToggle';

const navLinks = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Browse',
    url: '/browse',
  },
  {
    title: 'About',
    url: '#',
  },
  {
    title: 'Contact',
    url: '#',
  },
];

export default function Header() {
  return (
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ position: 'relative', top: '0', pt: 3, pb: 1, zIndex: 10, overflow: 'hidden' }}>
      <Stack direction='row' gap={10}>
        <Typography level='h4' color='primary'>
          Auctionaire
        </Typography>
        <Stack direction='row' gap={5}>
          {navLinks.map((link) => {
            return (
              <Link component={'a'} key={link.title} href={link.url} color='neutral' underline='none' sx={{ '&:hover': { color: 'primary.500' } }}>
                {link.title}
              </Link>
            );
          })}
        </Stack>
      </Stack>
      <Stack direction={'row'} gap={2}>
        <Input
          placeholder='Search Item'
          endDecorator={<IoSearchOutline />}
          sx={{
            boxShadow: 'none',
            '&::before': {
              display: 'none',
            },
            '&:focus-within': {
              outline: '1px solid',
            },
          }}
        />

        <Button>Register</Button>
        <Button color='neutral' variant='outlined'>
          Log In
        </Button>
        <ModeToggle />
      </Stack>
    </Stack>
  );
}
