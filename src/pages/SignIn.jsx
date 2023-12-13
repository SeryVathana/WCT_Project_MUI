import { Box, Grid, Typography, Stack, Divider, Select, Option, AspectRatio, Link, } from '@mui/joy';
import Input from '@mui/joy/Input';

import Button from '@mui/joy/Button';
import * as React from 'react';

export default function SignIn() {
  return (
      <Stack gap={5} sx={{ margin: '100px auto', width:'50%' }}  >
       
          <Stack justifyContent={'center'} alignItems={'center'} >
            <Typography level='h1'>Welcome Back</Typography>
            <Typography level='h3'>Sign In</Typography>
          </Stack>
          <Box>
            <h6>Email</h6>
            <Input placeholder="Enter Your Email" variant="outlined" color="primary" />
          </Box>
          <Box>
            <h6>Password Number</h6>
            <Input placeholder="Enter Your Password" variant="outlined" color="primary" />
          </Box>
          <Box>
            <h6>Phone Number</h6>
            <Input
              placeholder="Phone number"
              
              startDecorator={
                <>
                  <Divider orientation="vertical" />
                  <Select
                    variant="plain" 
                    defaultValue={"+855"}
                    sx={{ '&:hover': { bgcolor: 'transparent' } }}
                  >
                    <Option value="+855">+855</Option>
                    <Option value="+168">+168</Option>
                    <Option value="+999">+999</Option>
                  </Select>
                </>
              }
              sx={{ width: 300 }}
            />
          </Box>
          <Stack alignItems={'center'} >
              <Button>
              Sign In
              </Button>
              <Typography >New here? <span><Link>Sign Up</Link></span> Now</Typography>
          </Stack>
      </Stack>
  );
}

