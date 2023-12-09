import { Box, Button, DialogTitle, Divider, Drawer, IconButton, Input, Link, List, ListItemButton, ModalClose, Sheet, Stack, Typography } from '@mui/joy';
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
        {/* <Input
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
        /> */}

        <SearchDrawer />

        <Button sx={{ display: { xs: 'none', sm: 'inline-block' } }}>Register</Button>
        <Button sx={{ display: { xs: 'none', sm: 'inline-block' } }} color='neutral' variant='outlined'>
          Log In
        </Button>

        <ModeToggle />

        <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
          <MobileDrawer />
        </Box>
      </Stack>
    </Stack>
  );
}

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import BigCardContainer from './BigCardContainer';

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
          <NavLink to={'/'} style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}>
            <ListItemButton sx={{ textAlign: 'end', display: 'flex', justifyContent: 'center' }}>Home</ListItemButton>
          </NavLink>
          <NavLink to={'/browse'} style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}>
            <ListItemButton sx={{ textAlign: 'end', display: 'flex', justifyContent: 'center' }}>Browse</ListItemButton>
          </NavLink>
          <NavLink to={'/about'} style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}>
            <ListItemButton sx={{ textAlign: 'end', display: 'flex', justifyContent: 'center' }}>About</ListItemButton>
          </NavLink>
          <NavLink to={'/contact'} style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}>
            <ListItemButton sx={{ textAlign: 'end', display: 'flex', justifyContent: 'center' }}>Contact</ListItemButton>
          </NavLink>
          <Divider />
          <NavLink to={'/login'} style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}>
            <ListItemButton sx={{ textAlign: 'end', display: 'flex', justifyContent: 'center' }}>Login</ListItemButton>
          </NavLink>
          <NavLink to={'/register'} style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}>
            <ListItemButton sx={{ textAlign: 'end', display: 'flex', justifyContent: 'center' }}>Register</ListItemButton>
          </NavLink>
        </List>
      </Drawer>
    </>
  );
}

function SearchDrawer() {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [data, setData] = useState([]);
  const [backUpData, setBackUpData] = useState([]);

  const fetchData = async () => {
    await axios
      .get('http://localhost:3000/items')
      .then((res) => {
        // setData(res.data);
        setBackUpData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleSearchItem(value) {
    setSearchValue(value);
    if (value !== '' && value.length >= 3) {
      const searchResult = backUpData?.filter((item) => item.itemName.toLowerCase().includes(value));
      setData(searchResult);
    }
    if (value == '') {
      setData([]);
    }
  }

  return (
    <>
      <IconButton variant='outlined' onClick={() => setOpen(true)}>
        <IoSearchOutline />
      </IconButton>
      <Drawer
        size='lg'
        variant='plain'
        anchor='top'
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          content: {
            sx: {
              height: '100vh',
              bgcolor: 'transparent',
              p: { md: 3, sm: 0 },
              boxShadow: 'none',
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: 'md',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <DialogTitle>Search</DialogTitle>
          <ModalClose />
          <Input
            placeholder='Search Item'
            value={searchValue}
            onChange={(e) => handleSearchItem(e.target.value)}
            endDecorator={<IoSearchOutline />}
            sx={{
              // display: { xs: 'none', lg: 'flex' },
              maxWidth: 500,
              boxShadow: 'none',
              '&::before': {
                display: 'none',
              },
              '&:focus-within': {
                outline: '1px solid',
              },
            }}
          />
          <BigCardContainer currentItems={data} />
        </Sheet>
      </Drawer>
    </>
  );
}
