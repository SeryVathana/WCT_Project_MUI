import { Avatar, Box, Button, DialogTitle, Divider, Drawer, Dropdown, IconButton, Input, List, Menu, MenuButton, MenuItem, ModalClose, Sheet, Stack, Typography } from '@mui/joy';
import ModeToggle from './ModeToggle';

import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import BigCardContainer from './BigCardContainer';

import { useDispatch, useSelector } from 'react-redux';
import { switchLogin } from '../redux/actions/loginSlice';

import { FiUser } from 'react-icons/fi';
import { IoMenu, IoSearchOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';

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
    url: '/',
  },
  {
    title: 'Contact',
    url: '/',
  },
];

export default function Header() {
  const isLoggedIn = useSelector((state) => state.login.value);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ position: 'relative', top: '0', pt: 3, pb: 1, zIndex: 10, overflow: 'hidden' }}>
      <Stack direction='row' gap={10}>
        <Typography level='h4' color='primary'>
          Auctionaire
        </Typography>
        <Stack direction='row' alignItems={'center'} gap={5} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {navLinks.map((link) => {
            return (
              <NavLink key={link.title} to={link.url} style={{ textDecoration: 'none' }}>
                <Typography color='neutral' sx={{ '&:hover': { color: 'primary.500' } }}>
                  {link.title}
                </Typography>
              </NavLink>
            );
          })}
        </Stack>
      </Stack>
      <Stack direction={'row'} gap={{ xs: 1, md: 2 }}>
        <SearchDrawer />

        {!isLoggedIn && (
          <>
            <Button
              sx={{ display: { xs: 'none', sm: 'inline-block' } }}
              onClick={() => {
                navigate('/signup');
              }}
            >
              Register
            </Button>
            <Button
              sx={{ display: { xs: 'none', sm: 'inline-block' } }}
              color='neutral'
              variant='outlined'
              onClick={() => {
                navigate('/signin');
              }}
            >
              Log In
            </Button>
          </>
        )}

        <ModeToggle />

        {isLoggedIn && (
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Dropdown>
              <MenuButton variant='plain' sx={{ padding: '0 10px' }}>
                <Stack direction={'row'} alignItems={'center'} gap={2}>
                  <Avatar size='sm' src={user.userPfp} />
                  <Typography level='title-sm'>{user.userName}</Typography>
                </Stack>
              </MenuButton>
              <Menu>
                <MenuItem>
                  <NavLink to={'/dashboard'} style={{ textDecoration: 'none' }}>
                    <Stack direction={'row'} alignItems={'center'} gap={1} color='neutral' underline='none'>
                      <Typography mb={0.5}>
                        <FiUser />
                      </Typography>
                      <Typography>Dashboard</Typography>
                    </Stack>
                  </NavLink>
                </MenuItem>
                <MenuItem disabled>
                  <NavLink to={'/'} style={{ textDecoration: 'none' }}>
                    <Stack direction={'row'} alignItems={'center'} gap={1} color='neutral' underline='none'>
                      <Typography mb={0.5}>
                        <IoSettingsOutline />
                      </Typography>
                      <Typography>Setting</Typography>
                    </Stack>
                  </NavLink>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    signOut(auth);
                    navigate('/');
                    dispatch(switchLogin());
                  }}
                >
                  <NavLink to={'/dashboard'} style={{ textDecoration: 'none' }}>
                    <Stack direction={'row'} alignItems={'center'} gap={1} color='neutral' underline='none'>
                      <Typography mb={0.5}>
                        <MdLogout />
                      </Typography>
                      <Typography>Log Out</Typography>
                    </Stack>
                  </NavLink>
                </MenuItem>
              </Menu>
            </Dropdown>
          </Box>
        )}

        <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
          <MobileDrawer />
        </Box>
      </Stack>
    </Stack>
  );
}

function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.login.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
            <Typography sx={{ textAlign: 'end', display: 'flex', justifyContent: 'center' }}>Home</Typography>
          </NavLink>
          <NavLink to={'/browse'} style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}>
            <Typography sx={{ textAlign: 'end', display: 'flex', justifyContent: 'center' }}>Browse</Typography>
          </NavLink>
          <NavLink to={'/about'} style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}>
            <Typography sx={{ textAlign: 'end', display: 'flex', justifyContent: 'center' }}>About</Typography>
          </NavLink>
          <NavLink to={'/contact'} style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}>
            <Typography sx={{ textAlign: 'end', display: 'flex', justifyContent: 'center' }}>Contact</Typography>
          </NavLink>
          <Divider />
          {!isLoggedIn ? (
            <>
              {/* <NavLink to={'/login'} style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}> */}
              <Typography
                onClick={() => {
                  setOpen(false);
                  navigate('/signin');
                }}
                sx={{ textAlign: 'end', display: 'flex', justifyContent: 'center' }}
              >
                Log In
              </Typography>
              {/* </NavLink> */}
              <NavLink to={'/signup'} style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}>
                <Typography sx={{ textAlign: 'end', display: 'flex', justifyContent: 'center' }}>Register</Typography>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={'/dashboard'} style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}>
                <Typography sx={{ textAlign: 'end', display: 'flex', justifyContent: 'center' }}>Dashboard</Typography>
              </NavLink>
              <NavLink to={'/'} style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}>
                <Typography sx={{ textAlign: 'end', display: 'flex', justifyContent: 'center' }}>Setting</Typography>
              </NavLink>

              <Typography
                onClick={() => {
                  setOpen(false);
                  signOut(auth);
                  navigate('/');
                  dispatch(switchLogin());
                }}
                sx={{ textAlign: 'end', display: 'flex', justifyContent: 'center' }}
              >
                Log Out
              </Typography>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
}

import { auth, db } from '../firebaseConfig';

import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

function SearchDrawer() {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const colRef = collection(db, 'items');

  const [data, setData] = useState([]);
  // const [backUpData, setBackUpData] = useState([]);

  function handleSearchItem(value) {
    setSearchValue(value);
    // console.log(value);
    const q = query(colRef, where('itemName', '>=', value.toLowerCase()), where('itemName', '<=', '~'));
    const q1 = query(colRef, where('itemName', '>=', value.toUpperCase()), where('itemName', '<=', '~'));
    if (value !== '' && value.length >= 3) {
      onSnapshot(q, (snapshot) => {
        setData(snapshot.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
        // setBackUpData(snapshot.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      onSnapshot(q1, (snapshot) => {
        setData(snapshot.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
        // setBackUpData(snapshot.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
      });

      // const searchResult = backUpData?.filter((item) => item.itemName.toLowerCase().includes(value.toLowerCase()));
      // setData(searchResult);
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
