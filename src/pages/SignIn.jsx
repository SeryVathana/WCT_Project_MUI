import { Alert, Box, Button, Input, Stack, Typography } from '@mui/joy';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';

import { useDispatch } from 'react-redux';
import { switchLogin } from '../redux/actions/loginSlice';
import { setUser } from '../redux/actions/userSlice';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

export default function SignIn() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    onAuthStateChanged(auth, (currentUser) => {
      const colRef = collection(db, 'users');

      if (currentUser) {
        dispatch(switchLogin());

        const q = query(colRef, where('email', '==', currentUser?.email));
        onSnapshot(q, (snapshot) =>
          snapshot.docs.map((doc) => {
            const user = { ...doc.data(), id: doc.id };

            dispatch(setUser(user));
          })
        );
      }
    });

    signInWithEmailAndPassword(auth, inputEmail, inputPassword)
      .then(() => {
        dispatch(switchLogin());
        const colRef = collection(db, 'users');
        const q = query(colRef, where('email', '==', inputEmail));
        onSnapshot(q, (snapshot) =>
          snapshot.docs.map((doc) => {
            const user = { ...doc.data(), id: doc.id };

            navigate('/');
            dispatch(setUser(user));
            window.location.reload(false);
          })
        );
      })
      .catch(() => {
        setIsError(true);
      });
  };

  return (
    <Stack
      gap={5}
      sx={{ margin: '100px auto', width: { xs: '100%', sm: '80%', md: '50%', lg: '40%' } }}
    >
      <Stack justifyContent={'center'} alignItems={'center'} gap={2}>
        <Typography level='h1' sx={{ fontSize: { xs: 22, sm: 28, md: 32, lg: 36 } }}>
          Welcome Back
        </Typography>
        <Typography level='h3'>Sign In</Typography>
      </Stack>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Stack gap={5} alignItems={'left'}>
          <Box>
            <h6>Email</h6>
            <Input
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              required
              placeholder='Enter Your Email'
              type='email'
              variant='outlined'
              color='neutral'
              size='md'
              sx={{ boxShadow: 'none' }}
            />
          </Box>
          <Box>
            <h6>Password </h6>
            <Input
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              required
              placeholder='Enter Your Password'
              type='password'
              variant='outlined'
              color='neutral'
              size='md'
              sx={{ boxShadow: 'none' }}
            />
          </Box>
          {isError ? (
            <Alert color={'danger'} sx={{ display: 'flex', justifyContent: 'center' }}>
              Incorrect email or password.
            </Alert>
          ) : (
            ''
          )}
          <Button type='submit' size='lg'>
            Sign In
          </Button>
        </Stack>
      </form>

      <Stack alignItems={'center'} gap={2}>
        <Typography>
          New here?{' '}
          <span>
            <Link to='/signup'>
              <Typography color='neutral'>Sign Up</Typography>
            </Link>
          </span>{' '}
          Now
        </Typography>
      </Stack>
    </Stack>
  );
}
