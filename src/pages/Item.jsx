import { AspectRatio, Avatar, Box, Button, Input, Sheet, Stack, Table, Typography } from '@mui/joy';

import { Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

import { useEffect, useState } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function Item() {
  const user = useSelector((state) => state.user.value);
  const param = useParams();
  const navigate = useNavigate();
  const docRef = doc(db, 'items', param.id);

  const [data, setData] = useState([]);
  const [activeImg, setActiveImg] = useState('');
  const [biddingValue, setBiddingValue] = useState(0);
  const [lastBidder, setLastBidder] = useState();

  let currentPrice = Number(data.initialPrice);
  data.biddingHistory?.map((data) => {
    currentPrice += Number(data.bidPrice);
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const getData = async () => {
      const docSnap = await getDoc(docRef);
      setData({ ...docSnap.data(), id: docSnap.id });
      setActiveImg(docSnap.data().itemImgURL[0]);
      setBiddingValue(docSnap.data().bidIncrement);
      setLastBidder(docSnap.data()?.biddingHistory[docSnap.data().biddingHistory?.length - 1]);
    };

    getData();
  }, []);

  const BidPrice = async () => {
    if (user.userId == 0) {
      navigate('/signin');
      return;
    }

    if (biddingValue < data.bidIncrement) {
      return;
    }

    const newData = {
      ...data,
      biddingHistory: [
        ...data.biddingHistory,
        {
          bidderID: user.userId,
          bidderName: user.userName,
          bidPrice: Number(biddingValue),
          bidDate: new Timestamp(Math.floor(Date.now() / 1000), Date.now() / 1000000),
        },
      ],
    };

    await updateDoc(docRef, newData).then(() => {
      setData(newData);
      setLastBidder(newData?.biddingHistory[newData.biddingHistory?.length - 1]);
      console.log('Value of an Existing Document Field has been updated');

      const bidHis = [...user.userBiddingHistory];
      bidHis.push(data.id);

      updateDoc(doc(db, 'users', user.userId), {
        email: user.userEmail,
        firstName: user.userFirstName,
        lastName: user.userLastName,
        pfImgURL: user.userPfp,
        role: user.userRole,
        biddingHistory: bidHis,
      });
    });
  };

  const dateFormat = (date) => {
    return new Date(date?.seconds * 1000).toLocaleString();
  };

  return (
    <Box display={'grid'} gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={5} mt={5}>
      <Stack gap={1}>
        <AspectRatio ratio={16 / 9} objectFit='contain' sx={{ borderRadius: 'lg' }}>
          <img src={activeImg} alt='' />
        </AspectRatio>
        <Stack direction={'row'} gap={1} overflow={'auto'}>
          {data.itemImgURL?.map((img) => {
            return (
              <AspectRatio
                key={Math.random()}
                ratio={4 / 3}
                sx={{ minWidth: '80px', borderRadius: 'sm' }}
              >
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
        <Stack>
          <Typography>Description: </Typography>
          <Typography level='body-sm'>{data.itemDetail}</Typography>
        </Stack>
        <Typography mt={3}>Details: </Typography>
        <Sheet>
          <Table variant='plain' borderAxis='none'>
            <tbody>
              <tr>
                <td style={{ width: '30%' }}>Start Date</td>
                <td>{dateFormat(data.startDate)}</td>
              </tr>
              <tr>
                <td style={{ width: '30%' }}>End Date</td>
                <td>{dateFormat(data.endDate)}</td>
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
                  <Typography level='title-lg'>
                    $ {Number(currentPrice).toLocaleString()}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td style={{ width: '30%' }}>Your Last Bid</td>
                <td>$ {lastBidder?.id === user.userId && lastBidder.bidPrice}</td>
              </tr>
            </tbody>
          </Table>
        </Sheet>

        {data.sellerID != user.userId ? (
          <>
            <Stack direction={'row'} mt={3} gap={1}>
              <Input
                placeholder='Enter Bidding Price'
                size='lg'
                type='number'
                disabled={lastBidder?.bidderID === user.userId}
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
                disabled={lastBidder?.bidderID === user.userId}
                onClick={(e) => {
                  e.preventDefault();
                  BidPrice(data);
                }}
              >
                Place Bid
              </Button>
            </Stack>
            {lastBidder?.bidderID === user.userId && (
              <Typography color='warning' level='body-sm'>
                Your are the last bidder, you cannot bid again.
              </Typography>
            )}
          </>
        ) : (
          ''
        )}
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
                <tr key={Math.random()}>
                  <td>{row.bidderName}</td>
                  <td>$ {Number(row.bidPrice).toLocaleString()}</td>
                  <td>{dateFormat(row.bidDate)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total: {data.biddingHistory?.length} Bidders</td>
                <td>$ {Number(currentPrice).toLocaleString()}</td>
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
