/* eslint-disable react/prop-types */
import { AspectRatio, Button, Card, Stack, Typography } from '@mui/joy';
import { Link } from 'react-router-dom';

export default function ItemCard({ item }) {
  let currentPrice = Number(item.initialPrice);

  item.biddingHistory.map((data) => {
    currentPrice += Number(data.bidPrice);
  });

  return (
    <Card variant='plain' sx={{ padding: 1 }}>
      <Stack direction={{ xs: 'row', sm: 'column' }} gap={2}>
        <AspectRatio
          minHeight={200}
          sx={{
            borderRadius: 'md',
            minWidth: '100px',
            width: { xs: '180px', sm: '100%' },
            // flexGrow: 1,
            overflow: 'hidden',
            '&:hover': {
              '& img': { scale: '1.2' },
            },
          }}
        >
          <img src={item.itemImgURL} srcSet={item.itemImgURL + '2x'} loading='lazy' alt='' style={{ transition: 'all 0.2s linear' }} />
        </AspectRatio>

        <Stack gap={1} justifyContent={'space-between'} flexGrow={1}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Link to={`/item/${item.id}`} style={{ textDecoration: 'none' }}>
              <Typography level='title-lg' sx={{ height: 'fit-content', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1, overflow: 'hidden' }}>
                {item.itemName}
              </Typography>
            </Link>
          </Stack>
          <Typography level='body-sm' sx={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1, overflow: 'hidden' }}>
            {item.location.join(' | ')}
          </Typography>
          <Typography level='body-sm'>Bid Increment: ${item.bidIncrement}</Typography>
          <Typography level='body-md' sx={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1, overflow: 'hidden' }}>
            Current: ${Number(currentPrice).toLocaleString()}
          </Typography>
          <Stack direction={{ xs: 'column-reverse', sm: 'row' }} justifyContent={'space-between'} alignItems={{ xs: 'start', sm: 'center' }} gap={1} mt={{ xs: 0, sm: 1 }}>
            <Typography level='body-sm'>3d : 3h : 3mn</Typography>
            <Link to={`/item/${item.id}`}>
              <Button variant='outlined' color='neutral' size='md'>
                Place Bid
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
