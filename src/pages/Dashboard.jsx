/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import { AccordionGroup, Grid, Sheet, Stack, TabPanel, Table, Typography } from '@mui/joy';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';

import { useSelector } from 'react-redux';

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

import { BidList } from '../components/BidList';
import { CreatePost } from '../components/CreatePost';
import { ItemList } from '../components/ItemList';

function Dashboard() {
  const user = useSelector((state) => state.user.value);
  const dataCollectionRef = collection(db, 'posts');
  const bidCollectionRef = collection(db, 'items');

  const [userPosts, setUserPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [myBids, setMyBids] = useState([]);

  useEffect(() => {
    onSnapshot(dataCollectionRef, (snapshot) => {
      setUserPosts(snapshot.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    onSnapshot(dataCollectionRef, (snapshot) => {
      setMyPosts(
        snapshot.docs
          ?.map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((data) => data.sellerID == user.userId)
      );
    });

    const userBiddingHistory = user.userBiddingHistory;

    onSnapshot(bidCollectionRef, (snapshot) => {
      const res = snapshot?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
      const tempData = [];

      userBiddingHistory?.map((bid) => res?.map((item) => item.id == bid && tempData.push(item)));

      const unique = new Set(tempData);
      setMyBids([...unique]);
    });
  }, [user]);

  return (
    <Stack mt={3}>
      <Tabs
        aria-label='Basic tabs'
        defaultValue={0}
        variant={'outlined'}
        sx={{ borderRadius: 'md' }}
      >
        <TabList>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            width={'100%'}
            paddingX={{ xs: 0, md: 2 }}
            pt={2}
          >
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              flexGrow={{ xs: 1, md: 0 }}
              justifyContent={'space-between'}
              alignItems={{ xs: 'center', md: 'end' }}
              gap={{ xs: 2, sm: 3, md: 4, lg: 5 }}
            >
              <Typography level='h2' fontSize={{ xs: 18, sm: 20, md: 22, lg: 24 }}>
                Dashboard
              </Typography>
              <Stack direction={'row'} fontSize={{ xs: 12, sm: 16 }}>
                <Tab>My Posts</Tab>
                <Tab>My Bids</Tab>
                <Tab sx={{ textAlign: 'center' }}>Create Post</Tab>
                {user.userRole === 'Admin' && <Tab>User Posts</Tab>}
              </Stack>
            </Stack>
            <Typography level='body-md' sx={{ display: { xs: 'none', md: 'block' } }}>
              Role: {user.userRole}
            </Typography>
          </Stack>
        </TabList>
        <TabPanel value={0}>
          <Posts data={myPosts} />
        </TabPanel>

        <TabPanel value={1}>
          <Bids data={myBids} />
        </TabPanel>
        <TabPanel value={2}>
          <CreatePost />
        </TabPanel>
        {user.userRole === 'Admin' && (
          <TabPanel value={3} sx={{ padding: { xs: 0.5, sm: 1, md: 2 } }}>
            <Posts data={userPosts} />
          </TabPanel>
        )}
      </Tabs>
    </Stack>
  );
}

const Posts = ({ data }) => {
  const [acceptedData, setAcceptedData] = useState(0);
  const [pendingData, setPendingData] = useState(0);

  useEffect(() => {
    setAcceptedData(0);
    setPendingData(0);
    data.map((eachItem) =>
      eachItem.postStatus === 'accepted'
        ? setAcceptedData((prev) => prev + 1)
        : setPendingData((prev) => prev + 1)
    );
  }, [data]);

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={8} order={{ xs: 1, md: 0 }} flexGrow={1}>
        <Sheet variant='outlined' sx={{ borderRadius: 'md', padding: 1 }}>
          <Stack gap={2}>
            <Typography level='title-lg' mt={2} ml={2}>
              Posts
            </Typography>
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
                <td>{data.length} posts</td>
              </tr>
              <tr>
                <td>Accepted Posts</td>
                <td>{acceptedData} posts</td>
              </tr>

              <tr>
                <td>Pending Posts</td>
                <td>{pendingData} posts</td>
              </tr>
            </tbody>
          </Table>
        </Sheet>
      </Grid>
    </Grid>
  );
};

const Bids = ({ data }) => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={8} order={{ xs: 1, md: 0 }} flexGrow={1}>
        <Sheet variant='outlined' sx={{ borderRadius: 'md', padding: 1 }}>
          <Stack gap={2}>
            <Typography level='title-lg' mt={2} ml={2}>
              Last Bids
            </Typography>
            <Stack sx={{ borderRadius: 'none' }}>
              {data.map((item) => {
                return <BidList key={item.id} data={item} />;
              })}
            </Stack>
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
                <td>All Bids</td>
                <td>{data.length} items</td>
              </tr>
              <tr>
                <td>Outbid</td>
                <td>0 items</td>
              </tr>
              <tr>
                <td>Last Bidder</td>
                <td>0 items</td>
              </tr>
              <tr>
                <td>Success Bid</td>
                <td>0 items</td>
              </tr>
            </tbody>
          </Table>
        </Sheet>
      </Grid>
    </Grid>
  );
};
export default Dashboard;
