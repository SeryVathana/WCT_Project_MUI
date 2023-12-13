import { Box, Typography,  Divider, Select, Option, Link, } from '@mui/joy';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';

import Button from '@mui/joy/Button';
import * as React from 'react';

export default function SignUp() {
  return (
      <Stack gap={5} sx={{ margin: '100px auto', width:'50%' }}  >
       
          <Stack justifyContent={'center'} alignItems={'center'} >
            <Typography level='h1'>Sign Up</Typography>
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"} gap={2}>
            <Stack flexGrow={1}>
              <h6>First Name</h6>
              <Input placeholder="Enter Your First name" variant="outlined" color="primary" />
            </Stack>
            <Stack flexGrow={1}>
              <h6>Last Name</h6>
              <Input placeholder="Enter Your Last Name" variant="outlined" color="primary" />
            </Stack>
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

          <Stack direction={"row"} justifyContent={"space-between"} gap={2} alignItems={'end'} width={'300px'}> 
            <Stack flexGrow={1}  width={'50px'} >
              <h6 width={'100px'}>Date of Birth</h6>
              <Input  placeholder=" Day" variant="outlined" color="primary"  />
            </Stack>
            <Stack flexGrow={1} width={'50px'}>
              
              <Input placeholder=" Mouth" variant="outlined" color="primary" />
            </Stack>
            <Stack flexGrow={1} width={'50px'} >
             
              <Input placeholder=" Year" variant="outlined" color="primary" />
            </Stack>
          </Stack>

          <Stack direction={"row"} justifyContent={"space-between"} gap={2} alignItems={'end'} width={'100%'} > 
            <Stack flexGrow={1} width={'30%'} >
              <h6>Credit Card</h6>
              <Input placeholder="XXXX XXXX XXXX" variant="outlined" color="primary"  />
            </Stack>
            <Stack flexGrow={1} width={'5%'}alignItems={'center'} >
              <h6>Expired Date</h6>
              <Input placeholder=" MM/YYYY" variant="outlined" color="primary" />
            </Stack>
            <Stack flexGrow={1} width={'5%'}>
              <h6>CVV</h6>
              <Input placeholder=" XXXX" variant="outlined" color="primary" />
            </Stack>
          </Stack>

          <Stack alignItems={'center'} direction={"row"} gap={2} >

              <Stack >
              <Button>
              term and Conditions
              </Button>
              </Stack>

              <Stack>
              <Button>
              Sign In
              </Button>
              </Stack>

          </Stack>

          <Stack alignItems={'center'} >
              <Button>
              Sign In
              </Button>
              <Typography >New here? <span><Link>Sign Up</Link></span> Now</Typography>
          </Stack>
      </Stack>
  );
}

