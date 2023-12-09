import { AspectRatio, Avatar, Box, Button, Container, Grid, Input, Sheet, Stack, Table, Typography } from '@mui/joy';
import { useEffect, useState } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';

function Item() {
  const [activeImg, setActiveImg] = useState(
    'https://images.unsplash.com/photo-1682687219573-3fd75f982217?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8'
  );

  const [biddingValue, setBiddingValue] = useState(100);

  function createData(name, price, date) {
    return { name, price, date };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Eclair', 262, 16.0),
    createData('Cupcake', 305, 3.7),
    createData('Gingerbread', 356, 16.0),
    createData('Chicken Nugget', 159, 6.0),
    createData('Amok', 237, 9.0),
    createData('Burgur', 262, 16.0),
    createData('Pizza', 305, 3.7),
    createData('Pepsi', 356, 16.0),
    createData('Coca', 356, 16.0),
    createData('Harry Potter', 356, 16.0),
    createData('Dog', 356, 16.0),
    createData('Chinese', 356, 16.0),
  ];

  return (
    <Box display={'grid'} gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={5} mt={5}>
      <Stack gap={1}>
        <AspectRatio ratio={16 / 9} sx={{ borderRadius: 'lg' }}>
          <img src={activeImg} alt='' />
        </AspectRatio>
        <Stack direction={'row'} gap={1} overflow={'auto'}>
          <AspectRatio ratio={4 / 3} sx={{ minWidth: '80px', borderRadius: 'sm' }}>
            <img
              src='https://images.unsplash.com/photo-1682687219573-3fd75f982217?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8'
              alt=''
              onClick={(e) => setActiveImg(e.target.src)}
            />
          </AspectRatio>
          <AspectRatio ratio={4 / 3} sx={{ minWidth: '80px', borderRadius: 'sm' }}>
            <img
              src='https://images.unsplash.com/photo-1701849484867-9058dc3964fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOXx8fGVufDB8fHx8fA%3D%3D'
              alt=''
              onClick={(e) => setActiveImg(e.target.src)}
            />
          </AspectRatio>
        </Stack>
      </Stack>

      <Stack gap={1} sx={{ gridRow: 'span 3' }}>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Avatar
            size='md'
            alt='Remy Sharp'
            src='https://images.unsplash.com/photo-1701651172545-eb93a5dde282?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D'
          />
          <Stack>
            <Typography level='title-md'>Sery Vathana</Typography>
            <Typography level='body-sm' color='primary'>
              Active <IoIosCheckmarkCircle />
            </Typography>
          </Stack>
        </Stack>
        <Typography level='h3' mt={1}>
          Headphone 19273
        </Typography>
        <Typography level='body-sm'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident quos delectus minus laudantium nesciunt incidunt nostrum quasi nam nihil accusamus. Harum aspernatur maxime eos accusamus
          at delectus repudiandae, veniam quam.
        </Typography>
        <Sheet>
          <Table variant='plain' borderAxis='none'>
            <tr>
              <td style={{ width: '30%' }}>Start Date</td>
              <td>23rd Nov 2023</td>
            </tr>
            <tr>
              <td style={{ width: '30%' }}>End Date</td>
              <td>11th Dec 2023</td>
            </tr>
            <tr>
              <td style={{ width: '30%' }}>Remaining Day</td>
              <td>3 Days : 3 Hours : 1mn</td>
            </tr>
            <tr>
              <td style={{ width: '30%' }}>Start Price</td>
              <td>$ 1800</td>
            </tr>
            <tr>
              <td style={{ width: '30%' }}>Bid Increment</td>
              <td>$ 100</td>
            </tr>
            <tr>
              <td style={{ width: '30%' }}>Bidder</td>
              <td>18 times</td>
            </tr>
            <tr>
              <td style={{ width: '30%' }}>Current Price</td>
              <td>
                <Typography level='title-lg'>$ 23700</Typography>
              </td>
            </tr>
            <tr>
              <td style={{ width: '30%' }}>Your Last Bid</td>
              <td>$ 0</td>
            </tr>
          </Table>
        </Sheet>
        <Stack direction={'row'} mt={3} gap={1}>
          <Input
            placeholder='Enter Bidding Price'
            size='lg'
            value={biddingValue}
            onChange={(e) => setBiddingValue(e.target.value)}
            startDecorator={'$'}
            sx={{ boxShadow: 'none', width: { xs: '200px', sm: '300px' } }}
          />
          <Button>Place Bid</Button>
        </Stack>
      </Stack>
      <Stack gap={2}>
        <Typography level='title-lg'>Bidding History</Typography>
        <Sheet sx={{ maxHeight: 500, overflow: 'auto' }}>
          <Table variant='plain' borderAxis='xBetween' stickyFooter={true} stickyHeader={true}>
            <thead>
              <tr>
                <th>Bidders</th>
                <th>Bid Price</th>
                <th>Bid Date</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>$ {row.price}</td>
                  <td>{new Date(Date.now()).getUTCDate() + '-' + new Date(Date.now()).getUTCMonth() + '-' + new Date(Date.now()).getUTCFullYear()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total: 100 Bidders</td>
                <td>$ 28932</td>
                <td></td>
              </tr>
            </tfoot>
          </Table>
        </Sheet>
      </Stack>
    </Box>
  );
}

export default Item;
