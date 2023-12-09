import { AspectRatio, Avatar, Box, Button, Input, Sheet, Stack, Table, Typography } from '@mui/joy';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { useParams } from 'react-router-dom';

function Item() {
  const param = useParams();

  const [data, setData] = useState([]);
  const [activeImg, setActiveImg] = useState('');
  const [biddingValue, setBiddingValue] = useState(0);

  let currentPrice = data.initialPrice;

  data.biddingHistory?.map((data) => {
    currentPrice += Number(data.bidPrice);
  });

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3000/items/${param.id}`)
        .then((res) => {
          setData(res.data);
          setActiveImg(res.data.itemImgURL[0]);
          setBiddingValue(res.data.bidIncrement);
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, [param.id]);

  function BidPrice(data, value) {
    if (value < data.bidIncrement) {
      return;
    }

    data.biddingHistory.push({
      id: Date.now(),
      bidder: 'John',
      bidPrice: Number(value),
      bidDate: new Date(Date.now()),
    });

    axios
      .put(`http://localhost:3000/items/${data.id}`, data)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Box display={'grid'} gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={5} mt={5}>
      <Stack gap={1}>
        <AspectRatio ratio={16 / 9} sx={{ borderRadius: 'lg' }}>
          <img src={activeImg} alt='' />
        </AspectRatio>
        <Stack direction={'row'} gap={1} overflow={'auto'}>
          {data.itemImgURL?.map((img) => {
            return (
              <AspectRatio key={Math.random()} ratio={4 / 3} sx={{ minWidth: '80px', borderRadius: 'sm' }}>
                <img src={img} alt='' onClick={(e) => setActiveImg(e.target.src)} />
              </AspectRatio>
            );
          })}
        </Stack>
      </Stack>

      <Stack gap={1} sx={{ gridRow: 'span 3' }}>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Avatar size='md' alt='Remy Sharp' src={data.sellerProfileImg} />
          <Stack>
            <Typography level='title-md'>{data.sellerName}</Typography>
            <Typography level='body-sm' color='primary'>
              Active <IoIosCheckmarkCircle />
            </Typography>
          </Stack>
        </Stack>
        <Typography level='h3' mt={1}>
          {data.itemName}
        </Typography>
        <Typography level='body-sm'>{data.itemDetail}</Typography>
        <Sheet>
          <Table variant='plain' borderAxis='none'>
            <tbody>
              <tr>
                <td style={{ width: '30%' }}>Start Date</td>
                <td>{data.startDate}</td>
              </tr>
              <tr>
                <td style={{ width: '30%' }}>End Date</td>
                <td>{data.endDate}</td>
              </tr>
              <tr>
                <td style={{ width: '30%' }}>Remaining Day</td>
                <td>3 Days : 3 Hours : 1mn</td>
              </tr>
              <tr>
                <td style={{ width: '30%' }}>Start Price</td>
                <td>$ {data.initialPrice}</td>
              </tr>
              <tr>
                <td style={{ width: '30%' }}>Bid Increment</td>
                <td>$ {data.bidIncrement}</td>
              </tr>
              <tr>
                <td style={{ width: '30%' }}>Bidder</td>
                <td>{data.biddingHistory?.length} times</td>
              </tr>
              <tr>
                <td style={{ width: '30%' }}>Current Price</td>
                <td>
                  <Typography level='title-lg'>$ {currentPrice}</Typography>
                </td>
              </tr>
              <tr>
                <td style={{ width: '30%' }}>Your Last Bid</td>
                <td>$ 0</td>
              </tr>
            </tbody>
          </Table>
        </Sheet>
        <Stack direction={'row'} mt={3} gap={1}>
          <Input
            placeholder='Enter Bidding Price'
            size='lg'
            type='number'
            value={biddingValue}
            slotProps={{
              input: {
                min: 100,
                step: 1,
              },
            }}
            onChange={(e) => setBiddingValue(e.target.value)}
            startDecorator={'$'}
            sx={{ boxShadow: 'none', width: { xs: '200px', sm: '300px' } }}
          />
          <Button
            type='submit'
            onClick={(e) => {
              e.preventDefault();
              BidPrice(data, biddingValue, setData);
            }}
          >
            Place Bid
          </Button>
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
              {data.biddingHistory?.map((row) => (
                <tr key={row.id}>
                  <td>{row.bidder}</td>
                  <td>$ {row.bidPrice}</td>
                  <td>{row.bidDate}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total: {data.biddingHistory?.length} Bidders</td>
                <td>$ {currentPrice}</td>
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
