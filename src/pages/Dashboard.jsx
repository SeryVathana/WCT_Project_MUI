/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import { AccordionGroup, Grid, Sheet, Stack, TabPanel, Table, Typography } from '@mui/joy';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';

import { useSelector } from 'react-redux';

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

import { CreatePost } from '../components/CreatePost';
import { ItemList } from '../components/ItemList';

function Dashboard() {
  const user = useSelector((state) => state.user.value);
  const dataCollectionRef = collection(db, 'posts');

  const [userPosts, setUserPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    onSnapshot(dataCollectionRef, (snapshot) => {
      setUserPosts(snapshot.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    onSnapshot(dataCollectionRef, (snapshot) => {
      setMyPosts(snapshot.docs?.map((doc) => ({ ...doc.data(), id: doc.id })).filter((data) => data.sellerID == user.userId));
    });
  }, []);

  return (
    <Stack mt={3}>
      <Tabs aria-label='Basic tabs' defaultValue={0} variant={'outlined'} sx={{ borderRadius: 'md' }}>
        <TabList>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} paddingX={{ xs: 0, md: 2 }} pt={2}>
            <Stack direction={{ xs: 'column', md: 'row' }} flexGrow={{ xs: 1, md: 0 }} justifyContent={'space-between'} alignItems={{ xs: 'center', md: 'end' }} gap={{ xs: 2, sm: 3, md: 4, lg: 5 }}>
              <Typography level='h2' fontSize={{ xs: 18, sm: 20, md: 22, lg: 24 }}>
                Dashboard
              </Typography>
              <Stack direction={'row'} fontSize={{ xs: 12, sm: 16 }}>
                <Tab>My Posts</Tab>
                <Tab>Profile</Tab>
                {user.userRole === 'Admin' && <Tab>User Posts</Tab>}
                <Tab sx={{ textAlign: 'center' }}>Create Post</Tab>
              </Stack>
            </Stack>
            <Typography level='body-md' sx={{ display: { xs: 'none', md: 'block' } }}>
              Role: {user.userRole}
            </Typography>
          </Stack>
        </TabList>
        <TabPanel value={user.userRole != 'Admin' && 2}>
          <CreatePost />
        </TabPanel>
        <TabPanel value={1}>
          <b>Profile</b> tab panel
        </TabPanel>
        {user.userRole === 'Admin' && (
          <TabPanel value={2} sx={{ padding: { xs: 0.5, sm: 1, md: 2 } }}>
            <Posts data={userPosts} />
          </TabPanel>
        )}
        <TabPanel value={0}>
          <Posts data={myPosts} />
        </TabPanel>
      </Tabs>
    </Stack>
  );
}

const Posts = ({ data }) => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={8} order={{ xs: 1, md: 0 }} flexGrow={1}>
        <Sheet variant='outlined' sx={{ borderRadius: 'md', padding: 1 }}>
          <Stack gap={2}>
            <Typography level='title-lg'>Posts</Typography>
            <AccordionGroup sx={{ borderRadius: 'none' }}>
              {data.map((item) => {
                return <ItemList key={item.id} data={item} />;
              })}
            </AccordionGroup>
          </Stack>
        </Sheet>
      </Grid>

      <Grid xs={12} md={4} order={{ xs: 0, md: 1 }} flexGrow={1}>
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

export default Dashboard;
