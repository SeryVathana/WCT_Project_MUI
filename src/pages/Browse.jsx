import axios from 'axios';

/* eslint-disable react/prop-types */
import { Button, FormControl, FormLabel, IconButton, Option, Select, Stack, Typography } from '@mui/joy';
import { useEffect, useState } from 'react';
import BigCardContainer from '../components/BigCardContainer';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const categories = [
  'Default',
  'Electronics',
  'Vehicle',
  // { label: 'Clothing', url: '#' },
  // { label: 'Shoes', url: '#' },
  // { label: 'Home and Furniture', url: '#' },
  // { label: 'Books', url: '#' },
  // { label: 'Toys and Games', url: '#' },
  // { label: 'Beauty and Personal Care', url: '#' },
  // { label: 'Sports and Outdoors', url: '#' },
  // { label: 'Jewelry', url: '#' },
  // { label: 'Automotive', url: '#' },
  // { label: 'Health and Wellness', url: '#' },
  // { label: 'Appliances', url: '#' },
  // { label: 'Pet Supplies', url: '#' },
  // { label: 'Office Supplies', url: '#' },
  // { label: 'Food and Grocery', url: '#' },
  // { label: 'Music and Movies', url: '#' },
  // { label: 'Crafts and Hobbies', url: '#' },
  // { label: 'Garden and Outdoor', url: '#' },
  // { label: 'Baby and Kids', url: '#' },
  // { label: 'Travel and Luggage', url: '#' },
  // { label: 'Fitness and Exercise', url: '#' },
];

export default function Browse() {
  const [data, setData] = useState([]);
  const [backUpData, setBackUpData] = useState([]);

  const [categoryValue, setCategoryValue] = useState(categories[0]);

  function handleChangeCategories(inputCategory) {
    setCategoryValue(inputCategory);

    if (inputCategory !== 'Default') {
      const filterdData = backUpData.filter((item) => item?.itemCategories?.includes(inputCategory));
      setData(filterdData);
    } else {
      setData(backUpData);
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const firstIndex = currentPage * itemsPerPage - itemsPerPage;
  const lastIndex = firstIndex + itemsPerPage;

  const currentItems = data.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const fetchData = async () => {
    await axios
      .get('http://localhost:3000/items')
      .then((res) => {
        setData(res.data);
        setBackUpData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Stack mt={5}>
      <Typography level='h2' mb={5}>
        Browse
      </Typography>
      <Stack
        direction={{ xs: 'column-reverse', sm: 'row' }}
        gap={5}
        justifyContent={'space-between'}
        alignItems={{ xs: 'start', sm: 'end', md: 'center' }}
        sx={{ overflowX: 'hidden', overflowY: 'hidden' }}
      >
        <Stack direction={'row'} gap={1}>
          <IconButton
            variant='plain'
            size='sm'
            color='neutral'
            disabled={currentPage === 1}
            sx={{ userSelect: 'none', fontSize: { xs: '12px', sm: 'inherit' }, padding: { xs: '5px 10px', sm: 'auto' } }}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <IoIosArrowBack />
          </IconButton>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              variant={index + 1 === currentPage ? 'solid' : 'plain'}
              size='sm'
              color='neutral'
              key={index}
              sx={{ userSelect: 'none', fontSize: { xs: '12px', sm: 'inherit' }, padding: { xs: '5px 10px', sm: 'auto' } }}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <IconButton
            variant='plain'
            size='sm'
            color='neutral'
            disabled={currentPage === totalPages}
            sx={{ userSelect: 'none', fontSize: { xs: '12px', sm: 'inherit' }, padding: { xs: '5px 10px', sm: 'auto' } }}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <IoIosArrowForward />
          </IconButton>
        </Stack>
        <Stack direction={{ xs: 'row', md: 'row' }} gap={{ xs: 1, md: 5 }}>
          <FormControl>
            <Stack direction={{ xs: 'column', md: 'row' }} alignItems={'start'} gap={{ xs: 0, md: 2 }}>
              <FormLabel sx={{ height: '36px', margin: '0' }}>
                <Typography>Category: </Typography>
              </FormLabel>
              <Select
                defaultValue='default'
                value={categoryValue}
                onChange={(event, newValue) => {
                  handleChangeCategories(newValue);
                }}
                sx={{ width: { xs: '180px', sm: '150px', md: '200px' }, boxShadow: 'none', fontSize: { xs: '12px', sm: '12px', md: '14px', lg: '16px' } }}
              >
                {categories.map((category) => {
                  return (
                    <Option value={category} key={category}>
                      {category}
                    </Option>
                  );
                })}
              </Select>
            </Stack>
          </FormControl>
          <FormControl>
            <Stack direction={{ xs: 'column', md: 'row' }} alignItems={'start'} gap={{ xs: 0, md: 2 }}>
              <FormLabel sx={{ height: '36px', margin: '0' }}>
                <Typography>Sort by: </Typography>
              </FormLabel>
              <Select defaultValue='default' sx={{ boxShadow: 'none', fontSize: { xs: '12px', sm: '12px', md: '14px', lg: '16px' } }}>
                <Option value='default'>Default</Option>
                <Option value='name'>Name</Option>
                <Option value='newest'>Newest</Option>
                <Option value='oldest'>Oldest</Option>
                <Option value='popular'>Popular</Option>
                <Option value='end'>Almost End</Option>
              </Select>
            </Stack>
          </FormControl>
        </Stack>
      </Stack>
      <BigCardContainer currentItems={currentItems} />
      <Stack direction={'row'} gap={1} mt={2}>
        <IconButton
          variant='plain'
          size='sm'
          color='neutral'
          disabled={currentPage === 1}
          sx={{ userSelect: 'none', fontSize: { xs: '12px', sm: 'inherit' }, padding: { xs: '5px 10px', sm: 'auto' } }}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <IoIosArrowBack />
        </IconButton>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            variant={index + 1 === currentPage ? 'solid' : 'plain'}
            size='sm'
            color='neutral'
            key={index}
            sx={{ userSelect: 'none', fontSize: { xs: '12px', sm: 'inherit' }, padding: { xs: '5px 10px', sm: 'auto' } }}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <IconButton
          variant='plain'
          size='sm'
          color='neutral'
          disabled={currentPage === totalPages}
          sx={{ userSelect: 'none', fontSize: { xs: '12px', sm: 'inherit' }, padding: { xs: '5px 10px', sm: 'auto' } }}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <IoIosArrowForward />
        </IconButton>
      </Stack>
    </Stack>
  );
}

// const items = [
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },

//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
//   {
//     itemName: 'Headphone',
//     itemDetail: 'lorem30',
//     itemImgURL: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
//     location: ['Siem Reap', 'Siem Reap', 'Cambodia'],
//     bidIncrement: 100,
//     currentPrice: 3000,
//   },
// ];
