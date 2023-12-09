/* eslint-disable react/prop-types */
import { Grid } from '@mui/joy';
import ItemCard from './ItemCard';

export default function BigCardContainer({ currentItems }) {
  return (
    <Grid container spacing={2} mt={1}>
      {currentItems?.map((item) => {
        return (
          <Grid xs={12 / 1} sm={12 / 2} md={12 / 3} lg={12 / 4} xl={12 / 5} key={item.id} sx={{ cursor: 'pointer' }}>
            <ItemCard item={item} />
          </Grid>
        );
      })}
    </Grid>
  );
}
