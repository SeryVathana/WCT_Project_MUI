import { Box, Button, Checkbox, FormHelperText, Grid, Input, Stack, Typography } from '@mui/joy';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';

export default function SignUp() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [inUseEmail, setInUsedEmail] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [birthDateError, setBirthDateError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmitData = async (e) => {
    e.preventDefault();

    if (Number(firstName)) {
      setFirstNameError(true);
      return;
    } else {
      firstName.split('').map((each) => {
        if (Number(each)) {
          setFirstNameError(true);
          return;
        } else {
          setFirstNameError(false);
        }
      });
    }

    if (Number(lastName)) {
      setLastNameError(true);
      return;
    } else {
      lastName.split('').map((each) => {
        if (Number(each)) {
          setLastNameError(true);
          return;
        } else {
          setLastNameError(false);
        }
      });
    }

    if (!Number(phoneNum)) {
      setPhoneError(true);
      return;
    } else {
      setPhoneError(false);
    }

    if (Number(birthDate.split('-')[0]) > 2024 - 19) {
      setBirthDateError(true);
      return;
    } else {
      setBirthDateError(false);
    }

    const userData = {
      firstName,
      lastName,
      email,
      pfImgURL: 'https://memes.co.in/memes/update/uploads/2021/12/InShot_20211209_222013681.jpg',
      phoneNum,
      role: 'user',
      biddingHistory: [],
      birthDate,
    };

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setInUsedEmail(false);
        const colRef = collection(db, 'users');
        addDoc(colRef, userData).then(() => {
          navigate('/');
        });
      })
      .catch((err) => {
        setInUsedEmail(err.code == 'auth/email-already-in-use');
      });
  };

  return (
    <form onSubmit={(e) => handleSubmitData(e)}>
      <Stack
        gap={5}
        sx={{ margin: '50px auto', width: { xs: '100%', sm: '80%', md: '50%', lg: '40%' } }}
      >
        <Stack justifyContent={'center'} alignItems={'center'}>
          <Typography level='h1'>Sign Up</Typography>
        </Stack>

        <Grid container spacing={2} flexGrow={1}>
          <Grid xs={12} sm={6}>
            <h6>First Name</h6>
            <Input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
              type='text'
              placeholder='Enter Your First name'
              variant='outlined'
              color='neutral'
              size='md'
              sx={{ boxShadow: 'none' }}
              pattern='[A-Za-z]'
            />
            {firstNameError && (
              <>
                <FormHelperText>
                  <Typography color='danger'>Invalid first name.</Typography>
                </FormHelperText>
              </>
            )}
          </Grid>
          <Grid xs={12} sm={6}>
            <h6>Last Name</h6>
            <Input
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder='Enter Your Last Name'
              variant='outlined'
              color='neutral'
              size='md'
              sx={{ boxShadow: 'none' }}
            />
            {lastNameError && (
              <FormHelperText>
                <Typography color='danger'>Invalid last name.</Typography>
              </FormHelperText>
            )}
          </Grid>
        </Grid>

        <Box>
          <h6>Email</h6>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            required
            placeholder='Enter Your Email'
            variant='outlined'
            color='neutral'
            size='md'
            sx={{ boxShadow: 'none' }}
          />
          {inUseEmail && (
            <FormHelperText>
              <Typography color='danger'>This email already in use.</Typography>
            </FormHelperText>
          )}
        </Box>

        <Box>
          <h6>Password</h6>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            required
            placeholder='Enter Your Password'
            variant='outlined'
            color='neutral'
            size='md'
            sx={{ boxShadow: 'none' }}
          />
        </Box>
        <Box>
          <h6>Phone Number</h6>
          <Input
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
            required
            placeholder='Phone number'
            // startDecorator={
            //   <Select
            //     variant='plain'
            //     defaultValue={'+855'}
            //     sx={{ '&:hover': { bgcolor: 'transparent' } }}
            //   >
            //     <Option value='+855'>+855</Option>
            //     <Option value='+168'>+168</Option>
            //     <Option value='+999'>+999</Option>
            //   </Select>
            // }
            color='neutral'
            size='md'
            sx={{ boxShadow: 'none' }}
          />
          {phoneError && (
            <FormHelperText>
              <Typography color='danger'>Invalid Phone number.</Typography>
            </FormHelperText>
          )}
        </Box>

        <Stack>
          <h6>Date of Birth</h6>
          <Input
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
            type='date'
            slotProps={{
              input: {
                max: `${2024 - 19}-12-31`,
              },
            }}
            color='neutral'
            size='md'
            sx={{ boxShadow: 'none' }}
          />
          {birthDateError && (
            <FormHelperText>
              <Typography color='danger'>Invalid or User must be 18 or above.</Typography>
            </FormHelperText>
          )}
        </Stack>

        <Stack gap={2}>
          <Checkbox size='sm' label='Term and Conditions' required />
          <Checkbox size='sm' label='Subscribe to our newsletter' />
        </Stack>
        <Button size='lg' type='submit'>
          Sign Up
        </Button>
        <Stack alignItems={'center'} gap={2}>
          <Typography>
            Already have an account?{' '}
            <span>
              <Link to='/signin'>
                <Typography color='neutral'>Sign In</Typography>
              </Link>
            </span>{' '}
            Now
          </Typography>
        </Stack>
      </Stack>
    </form>
  );
}
