import { Box, Button, Divider, Drawer, IconButton, Input, Link, List, ListItemButton, ModalClose, Stack, Typography } from '@mui/joy';
import { IoMenu, IoSearchOutline } from 'react-icons/io5';
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
        <Stack direction='row' gap={5} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {navLinks.map((link) => {
            return (
              <Link component={'a'} key={link.title} href={link.url} color='neutral' underline='none' sx={{ '&:hover': { color: 'primary.500' } }}>
                {link.title}
              </Link>
            );
          })}
        </Stack>
      </Stack>
      <Stack direction={'row'} gap={{ xs: 1, md: 2 }}>
        <Input
          placeholder='Search Item'
          endDecorator={<IoSearchOutline />}
          sx={{
            display: { xs: 'none', lg: 'flex' },

            boxShadow: 'none',
            '&::before': {
              display: 'none',
            },
            '&:focus-within': {
              outline: '1px solid',
            },
          }}
        />

        <Button sx={{ display: { xs: 'none', sm: 'inline-block' } }}>Register</Button>
        <Button sx={{ display: { xs: 'none', sm: 'inline-block' } }} color='neutral' variant='outlined'>
          Log In
        </Button>

        <IconButton variant='outlined' sx={{ display: { xs: 'inline-block', lg: 'none' } }}>
          <IoSearchOutline />
        </IconButton>

        <ModeToggle />

        <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
          <MobileDrawer />
        </Box>
      </Stack>
    </Stack>
  );
}

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function MobileDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton variant='outlined' color='neutral' onClick={() => setOpen(true)}>
        <IoMenu />
      </IconButton>
      <Drawer open={open} anchor='right' size='lg' onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            ml: 'auto',
            mt: 1,
            mr: 2,
          }}
        >
          <ModalClose id='close-icon' sx={{ position: 'initial' }} />
        </Box>
        <List
          size='lg'
          component='nav'
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <NavLink to={'/'} style={{ textDecoration: 'none' }}>
            <ListItemButton sx={{ textAlign: 'end', display: 'flex', justifyContent: 'center' }}>Home</ListItemButton>
          </NavLink>
          <NavLink to={'/browse'} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
            <ListItemButton>Browse</ListItemButton>
          </NavLink>
          <NavLink to={'/about'} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
            <ListItemButton>About</ListItemButton>
          </NavLink>
          <NavLink to={'/contact'} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
            <ListItemButton>Contact</ListItemButton>
          </NavLink>
          <Divider />
          <NavLink to={'/login'} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
            <ListItemButton>Login</ListItemButton>
          </NavLink>
          <NavLink to={'/register'} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
            <ListItemButton>Register</ListItemButton>
          </NavLink>
        </List>
      </Drawer>
    </>
  );
}
