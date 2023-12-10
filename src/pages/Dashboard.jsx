/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  AspectRatio,
  Avatar,
  Box,
  Button,
  Chip,
  FormLabel,
  Grid,
  Input,
  Sheet,
  Stack,
  TabPanel,
  Table,
  Textarea,
  Typography,
} from '@mui/joy';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { useSelector } from 'react-redux';

function Dashboard() {
  const user = useSelector((state) => state.user.value);
  return (
    <Stack mt={3}>
      <Tabs aria-label='Basic tabs' defaultValue={0} variant={'outlined'} sx={{ borderRadius: 'md' }}>
        <TabList>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} paddingX={2} pt={2}>
            <Stack direction={'row'} alignItems={'end'} gap={5}>
              <Typography level='h2'>Dashboard</Typography>
              <Stack direction={'row'}>
                <Tab>Create Post</Tab>
                <Tab>Profile</Tab>
                {user.userRole === 'Admin' && <Tab>Posts</Tab>}
                <Tab>Activities</Tab>
              </Stack>
            </Stack>
            <Typography level='body-md'>Role: {user.userRole}</Typography>
          </Stack>
        </TabList>
        <TabPanel value={0}>
          <CreatePostTab />
        </TabPanel>
        <TabPanel value={1}>
          <b>Profile</b> tab panel
        </TabPanel>
        {user.userRole === 'Admin' && (
          <TabPanel value={2}>
            <PendingPosts />
          </TabPanel>
        )}
        <TabPanel value={3}>
          <b>Activities</b> tab panel
        </TabPanel>
      </Tabs>
    </Stack>
  );
}

const PendingPosts = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    await axios
      .get('http://localhost:3000/items')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid xs={8}>
        <Sheet variant='outlined' sx={{ borderRadius: 'md', padding: 1 }}>
          <Stack gap={2}>
            <Typography level='title-lg'>Posts</Typography>
            <AccordionGroup sx={{ borderRadius: 'none' }}>
              {data.map((item) => {
                return <ItemList key={item.id} item={item} />;
              })}
            </AccordionGroup>
          </Stack>
        </Sheet>
      </Grid>

      <Grid xs={4}>
        <Sheet variant='outlined' sx={{ borderRadius: 'md' }}>
          <Table variant='plain' borderAxis='none'>
            <thead>
              <tr>
                <th>Summary</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>All Posts</td>
                <td>1000 posts</td>
              </tr>
              <tr>
                <td>Accepted Posts</td>
                <td>850 posts</td>
              </tr>
              <tr>
                <td>Rejected Posts</td>
                <td>50 posts</td>
              </tr>
              <tr>
                <td>Pending Posts</td>
                <td>100 posts</td>
              </tr>
            </tbody>
          </Table>
        </Sheet>
      </Grid>
    </Grid>
  );
};

const ItemList = ({ item }) => {
  const [activeImg, setActiveImg] = useState(item.itemImgURL[0]);

  const dateFormat = (date) => {
    const unformatDate = new Date(date);
    return unformatDate.getDate() + ' ' + unformatDate.toLocaleString('default', { month: 'short' }) + ' ' + unformatDate.getFullYear();
  };

  return (
    <Accordion>
      <AccordionSummary>
        <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
          <Stack direction={'row'} gap={2} alignItems={'center'}>
            <AspectRatio ratio={4 / 3} sx={{ minWidth: '50px', borderRadius: 'xs' }}>
              <img src={item.itemImgURL[0]} alt='' />
            </AspectRatio>
            <Stack>
              <Typography level='title-lg'>{item.itemName}</Typography>
              <Typography level='body-sm'>By: {item.sellerName}</Typography>
            </Stack>
          </Stack>
          <Typography level='body-sm'>{dateFormat(item.startDate)}</Typography>
          <Chip color='warning'>Pending</Chip>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Avatar size='md' alt='Remy Sharp' src='' />
              <Stack>
                <Typography level='title-md'>{item.sellerName}</Typography>
                <Typography level='body-sm' color='primary'>
                  Active <IoIosCheckmarkCircle />
                </Typography>
              </Stack>
            </Stack>
            <Stack gap={1}>
              <Typography level='h3' mt={2}>
                {item.itemName}
              </Typography>
              <Typography></Typography>
              <Typography level='body-sm'>{item.itemDetail}</Typography>
            </Stack>
            <Sheet sx={{ mt: 5 }}>
              <Table variant='plain' borderAxis='none'>
                <tbody>
                  <tr>
                    <td>Location</td>
                    <td>{item.location.join(', ')}</td>
                  </tr>
                  <tr>
                    <td>Start Date</td>
                    <td>{dateFormat(item.startDate)}</td>
                  </tr>
                  <tr>
                    <td>End Date</td>
                    <td>{dateFormat(item.endDate)}</td>
                  </tr>
                  <tr>
                    <td>Remaining Day</td>
                    <td>3 Days : 3 Hours : 1mn</td>
                  </tr>
                  <tr>
                    <td>Start Price</td>
                    <td>$ {item.initialPrice.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Bid Increment</td>
                    <td>$ {item.bidIncrement.toLocaleString()}</td>
                  </tr>
                </tbody>
              </Table>
            </Sheet>
            <Stack direction={'row'} gap={2} mt={3}>
              <Button>Approve</Button>
              <Button color='danger'>Reject</Button>
            </Stack>
          </Grid>

          <Grid xs={6}>
            <Stack gap={1}>
              <AspectRatio ratio={16 / 9} sx={{ borderRadius: 'sm' }}>
                <img src={activeImg} alt='' />
              </AspectRatio>
              <Stack direction={'row'} gap={1} overflow={'auto'}>
                {item.itemImgURL?.map((img) => {
                  return (
                    <AspectRatio key={Math.random()} ratio={4 / 3} sx={{ minWidth: '80px', borderRadius: 'xs' }}>
                      <img src={img} alt='' onClick={(e) => setActiveImg(e.target.src)} />
                    </AspectRatio>
                  );
                })}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

const CreatePostTab = () => {
  const [text, setText] = useState('');
  return (
    <Stack gap={2} mt={2} width={'30%'}>
      <Typography level='h2'>Create Post</Typography>
      <form>
        <Stack direction={'column'} gap={3}>
          <Box>
            <FormLabel>Item Name</FormLabel>
            <Input placeholder='Enter Item Name' required sx={{ boxShadow: 'none' }} />
          </Box>
          <Box>
            <FormLabel>Item Description</FormLabel>
            <Textarea
              placeholder='Enter Item Description'
              minRows={2}
              required
              value={text}
              inputProps={{ maxLength: 12 }}
              onChange={(event) => {
                setText(event.target.value);
              }}
              endDecorator={
                <Typography level='body-xs' sx={{ ml: 'auto' }}>
                  {120 - text.length} character(s) left
                </Typography>
              }
              sx={{ boxShadow: 'none' }}
            />
          </Box>

          <Box>File Upload</Box>

          <Stack direction={'row'} gap={2}>
            <Typography>Location</Typography>
            <Stack gap={1}>
              <Input placeholder='Enter District' required sx={{ boxShadow: 'none' }} />
              <Input placeholder='Enter City' required sx={{ boxShadow: 'none' }} />
              <Input placeholder='Enter Country' required sx={{ boxShadow: 'none' }} />
            </Stack>
          </Stack>
          <Box>
            <FormLabel>End Date</FormLabel>
            <Stack direction={'row'} gap={1}>
              <Input
                type='date'
                slotProps={{
                  input: {
                    // min: '2018-06-07',
                    // max: '2018-06-14',
                  },
                }}
                required
                sx={{ boxShadow: 'none', flexGrow: 1 }}
              />
              <Input
                type='time'
                slotProps={{
                  input: {
                    // min: '2018-06-07',
                    // max: '2018-06-14',
                  },
                }}
                required
                sx={{ boxShadow: 'none' }}
              />
            </Stack>
          </Box>

          <Box>
            <FormLabel>Initial Price</FormLabel>
            <Input startDecorator={'$'} placeholder='Enter Initial Price' type='number' required sx={{ boxShadow: 'none' }} />
          </Box>

          <Box>
            <FormLabel>Increment Amount</FormLabel>
            <Input startDecorator={'$'} placeholder='Enter Bid Increment' type='number' required sx={{ boxShadow: 'none' }} />
          </Box>

          <Button type='submit' sx={{ width: 'fit-content' }}>
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default Dashboard;
