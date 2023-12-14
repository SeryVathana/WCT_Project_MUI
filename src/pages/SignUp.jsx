import { Box, Button, Checkbox, Grid, Input, Link, Option, Select, Stack, Typography } from '@mui/joy';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db } from '../firebaseConfig';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleSubmitData = async (e) => {
    e.preventDefault();

    const userData = {
      firstName,
      lastName,
      email,
      pfImgURL: 'https://memes.co.in/memes/update/uploads/2021/12/InShot_20211209_222013681.jpg',
      phoneNum,
      //   birthDate: new Timestamp(Math.floor(new Date(birthDate).getTime() / 1000), Math.floor(new Date(birthDate).getTime() / 1000000)),
    };

    const signUpData = {
      email,
      password,
    };

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const colRef = collection(db, 'users');
        addDoc(colRef, userData).then(() => {
          console.log('Completed');
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={(e) => handleSubmitData(e)}>
      <Stack gap={5} sx={{ margin: '50px auto', width: { xs: '100%', sm: '80%', md: '50%', lg: '40%' } }}>
        <Stack justifyContent={'center'} alignItems={'center'}>
          <Typography level='h1'>Sign Up</Typography>
        </Stack>

        <Grid container spacing={2} flexGrow={1}>
          <Grid xs={12} sm={6}>
            <h6>First Name</h6>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder='Enter Your First name'
              variant='outlined'
              color='neutral'
              size='md'
              sx={{ boxShadow: 'none' }}
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <h6>Last Name</h6>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required placeholder='Enter Your Last Name' variant='outlined' color='neutral' size='md' sx={{ boxShadow: 'none' }} />
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
            startDecorator={
              <Select variant='plain' defaultValue={'+855'} sx={{ '&:hover': { bgcolor: 'transparent' } }}>
                <Option value='+855'>+855</Option>
                <Option value='+168'>+168</Option>
                <Option value='+999'>+999</Option>
              </Select>
            }
            color='neutral'
            size='md'
            sx={{ boxShadow: 'none', pl: 0 }}
          />
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
                max: '2005-12-31',
              },
            }}
            color='neutral'
            size='md'
            sx={{ boxShadow: 'none' }}
          />
        </Stack>
        {/* <Grid container spacing={2} alignItems={'end'}>
        <Grid xs={4}>
        <Input placeholder=' Day' variant='outlined' color='neutral' size='md' sx={{ boxShadow: 'none' }} />
        </Grid>
        <Grid xs={4}>
        <Input placeholder=' Mouth' variant='outlined' color='neutral' size='md' sx={{ boxShadow: 'none' }} />
        </Grid>
        <Grid xs={4}>
        <Input placeholder=' Year' variant='outlined' color='neutral' size='md' sx={{ boxShadow: 'none' }} />
        </Grid>
    </Grid> */}

        {/* <Grid container alignItems={'end'} width={'100%'} gap={2}>
        <Grid xs={12} md={7}>
        <h6>Credit Card</h6>
        <Input placeholder='XXXX XXXX XXXX' variant='outlined' color='neutral' size='md' sx={{ boxShadow: 'none' }} />
        </Grid>
        <Grid xs={2} flexGrow={1} alignItems={'center'}>
        <h6>Expire Date</h6>
        <Input placeholder=' MM/YYYY' variant='outlined' color='neutral' size='md' sx={{ boxShadow: 'none' }} />
        </Grid>
        <Grid xs={2} flexGrow={1}>
        <h6>CVV</h6>
        <Input placeholder=' XXXX' variant='outlined' color='neutral' size='md' sx={{ boxShadow: 'none' }} />
        </Grid>
    </Grid> */}

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
              <Link>Sign In</Link>
            </span>{' '}
            Now
          </Typography>
        </Stack>
      </Stack>
    </form>
  );
}
