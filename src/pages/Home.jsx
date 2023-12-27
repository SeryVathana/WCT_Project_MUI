/* eslint-disable react/prop-types */
import { Box, Button, Grid, Stack, Typography } from '@mui/joy';
// import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';

import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';

import heroImg from '../../public/assets/hero.png';

export default function Home() {
  const [data, setData] = useState([]);
  const dataCollectionRef = collection(db, 'items');

  useEffect(() => {
    const getData = async () => {
      const resData = await getDocs(dataCollectionRef);
      setData(resData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getData();
  }, []);

  return (
    <>
      <Hero />
      <CardContainer items={data} />
    </>
  );
}

function Hero() {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  return (
    <Grid container alignItems={'center'}>
      <Grid xs={12} lg={6}>
        <Stack
          alignItems={{ xs: 'center', lg: 'start' }}
          textAlign={{ xs: 'center', lg: 'start' }}
          pb={10}
        >
          <Typography
            component='h1'
            level={'h1'}
            maxWidth={650}
            fontSize={{ xs: 32, sm: 42, md: 56 }}
            fontWeight={400}
            mt={8}
            lineHeight={1.5}
          >
            Your only place to Buy or Sell <Typography color='primary'>anything</Typography> you
            want.
          </Typography>
          <Typography
            level='body-lg'
            maxWidth={600}
            mt={3}
            lineHeight={1.7}
            fontSize={{ xs: 14, sm: 16, md: 18 }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque veritatis nam quasi
            accusamus est cum accusantium et nobis libero officia sapiente adipisci, esse dolorem
            eos harum exercitationem obcaecati? Labore, eaque!
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} gap={5} mt={5}>
            <Button
              size='lg'
              onClick={(e) => {
                e.preventDefault();

                navigate(user.userId == 0 ? '/signup' : '/dashboard');
              }}
            >
              {user.userId == 0 ? 'Join Us' : 'Dashboard'}
            </Button>

            <Link to={'/browse'}>
              <Button variant='plain' size='lg' color='neutral'>
                <Typography mr={2}>Browse More</Typography> <FaArrowRightLong />
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Grid>
      <Grid
        xs={12}
        md={6}
        display={{ xs: 'none', lg: 'flex' }}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box width={'60%'} overflow={'hidden'}>
          <img src={heroImg} style={{ width: '100%', transform: 'rotateY(180deg)' }} />
        </Box>
      </Grid>
    </Grid>
  );
}

function CardContainer({ items }) {
  const navigate = useNavigate();
  return (
    <Stack py={5}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography level='h2' fontWeight={400} fontSize={{ xs: '20px', md: '28px' }}>
          Random Pick For You
        </Typography>
        <Button variant='plain' size='lg' color='neutral' onClick={() => navigate('/browse')}>
          <Typography mr={{ xs: 1, sm: 2 }} fontSize={{ xs: '10px', sm: '14px', md: '18px' }}>
            See More
          </Typography>{' '}
          <FaArrowRightLong />
        </Button>
      </Stack>
      <Grid container spacing={2} mt={2}>
        {items?.slice(0, 5).map((item) => {
          return (
            <Grid
              xs={12 / 1}
              sm={12 / 2}
              md={12 / 3}
              lg={12 / 4}
              xl={12 / 5}
              key={item.id}
              sx={{ cursor: 'pointer' }}
            >
              <ItemCard item={item} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
