/* eslint-disable react/prop-types */
import { AspectRatio, Button, Divider, Stack, Typography } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

export const BidList = ({ data }) => {
  const navigate = useNavigate();
  const item = data;

  return (
    <Button variant='plain' color='neutral' onClick={() => navigate(`/item/${item.id}`)}>
      <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
        <Stack direction={'row'} gap={2} alignItems={'center'}>
          <AspectRatio ratio={4 / 3} objectFit='cover' sx={{ minWidth: { xs: '80px', md: '100px' }, borderRadius: 'xs' }}>
            <img src={item.itemImgURL[0]} alt='' />
          </AspectRatio>
          <Stack>
            <Typography level='title-lg' textAlign={'start'}>
              {item.itemName}
            </Typography>
            <Typography level='body-sm' textAlign={'start'}>
              {item.sellerName}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider sx={{ mt: 1 }} />
    </Button>
  );
};
