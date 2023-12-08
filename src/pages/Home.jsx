import { AspectRatio, Button, Grid, Stack, Typography } from '@mui/joy';
import { FaArrowRightLong } from 'react-icons/fa6';
import ItemCard from '../components/ItemCard';

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <CardContainer />
      <CardContainer />
      <CardContainer />
    </>
  );
}

function Hero() {
  return (
    <Stack alignItems={'center'} textAlign={'center'} pb={10}>
      <Typography component='h1' level={'h1'} maxWidth={650} fontSize={{ xs: 32, sm: 42, md: 56 }} fontWeight={400} mt={8} lineHeight={1.5}>
        Your only place to Buy or Sell <Typography color='primary'>anything</Typography> you want.
      </Typography>
      <Typography level='body-lg' maxWidth={600} mt={3} lineHeight={1.7} fontSize={{ xs: 14, sm: 16, md: 18 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque veritatis nam quasi accusamus est cum accusantium et nobis libero officia sapiente adipisci, esse dolorem eos harum
        exercitationem obcaecati? Labore, eaque!
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={5} mt={5}>
        <Button size='lg'>Join Us</Button>
        <Button variant='plain' size='lg' color='neutral'>
          <Typography mr={2}>Browse More</Typography> <FaArrowRightLong />
        </Button>
      </Stack>
    </Stack>
  );
}

const CategoryList = [
  {
    title: 'Example 1',
    bgImg: 'https://images.unsplash.com/photo-1701485559943-9c62773358db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    url: '#',
  },
  {
    title: 'Example 1',
    bgImg: 'https://images.unsplash.com/photo-1701485559943-9c62773358db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    url: '#',
  },
  {
    title: 'Example 1',
    bgImg: 'https://images.unsplash.com/photo-1701485559943-9c62773358db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    url: '#',
  },
  {
    title: 'Example 1',
    bgImg: 'https://images.unsplash.com/photo-1701485559943-9c62773358db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    url: '#',
  },
  {
    title: 'Example 1',
    bgImg: 'https://images.unsplash.com/photo-1701485559943-9c62773358db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    url: '#',
  },
  {
    title: 'Example 1',
    bgImg: 'https://images.unsplash.com/photo-1701485559943-9c62773358db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    url: '#',
  },
];

function Categories() {
  return (
    <Stack py={5}>
      <Stack>
        <Typography level='h2' fontWeight={400}>
          Our Top Categories
        </Typography>
      </Stack>
      <Grid container spacing={2} mt={2}>
        {CategoryList.map((category) => {
          return (
            <Grid xs={12 / 2} sm={12 / 3} md={12 / 4} lg={12 / 6} key={category.title}>
              <AspectRatio
                objectFit='cover'
                variant='outlined'
                ratio='1/1'
                sx={{
                  position: 'relative',
                  width: '100%',
                  bgcolor: 'background.level2',
                  borderRadius: 'lg',

                  '&:hover': {
                    '& img': { scale: '1.2' },
                  },
                }}
              >
                <img src={category.bgImg} alt={category.title} style={{ transition: 'all 0.2s linear' }} />
                <Typography
                  level='h3'
                  textTransform={'uppercase'}
                  letterSpacing={1}
                  sx={{ color: 'neutral.50', position: 'absolute', left: '50%', top: 20, translate: '-50% 0%', width: '100%', textAlign: 'center' }}
                >
                  {category.title}
                </Typography>
              </AspectRatio>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}

function CardContainer() {
  return (
    <Stack py={5}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography level='h2' fontWeight={400}>
          Popular Bidding
        </Typography>
        <Button variant='plain' size='lg' color='neutral'>
          <Typography mr={2}>See More</Typography> <FaArrowRightLong />
        </Button>
      </Stack>
      <Grid container spacing={2} mt={2}>
        {items.slice(0, 5).map((item) => {
          return (
            <Grid xs={12 / 1} sm={12 / 2} md={12 / 3} lg={12 / 4} xl={12 / 5} key={Math.random() * Date.now() + Math.random()} sx={{ cursor: 'pointer' }}>
              <ItemCard item={item} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}

const items = [
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
  {
    itemName: 'Headphone',
    itemDetail: 'lorem30',
    itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
    location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
    bidIncrement: 100,
    currentPrice: 3000,
  },
];
