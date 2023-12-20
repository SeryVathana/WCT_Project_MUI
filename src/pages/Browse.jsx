// import axios from 'axios';

/* eslint-disable react/prop-types */
import { Button, FormControl, FormLabel, IconButton, Option, Select, Stack, Typography } from '@mui/joy';
import { useEffect, useState } from 'react';
import BigCardContainer from '../components/BigCardContainer';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const categories = [
  'Default',
  'Electronics',
  'Vehicle',
  'Clothing',
  'Shoes',
  'Home and Furniture',
  'Books',
  'Toys and Games',
  'Beauty and Personal Care',
  'Sports and Outdoors',
  'Jewelry',
  'Automotive',
  'Health and Wellness',
  'Appliances',
  'Pet Supplies',
  'Office Supplies',
  'Food and Grocery',
  'Music and Movies',
  'Crafts and Hobbies',
  'Garden and Outdoor',
  'Baby and Kids',
  'Travel and Luggage',
  'Fitness and Exercise',
];

export default function Browse() {
  const [data, setData] = useState([]);
  const [backUpData, setBackUpData] = useState([]);
  const [categoryValue, setCategoryValue] = useState(categories[0]);

  const dataCollectionRef = collection(db, 'items');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const firstIndex = currentPage * itemsPerPage - itemsPerPage;
  const lastIndex = firstIndex + itemsPerPage;

  const currentItems = data.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const getData = async () => {
      const resData = await getDocs(dataCollectionRef);
      setData(resData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setBackUpData(resData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getData();
    window.scrollTo(0, 0);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChangeCategories = (inputCategory) => {
    setCategoryValue(inputCategory);

    if (inputCategory !== 'Default') {
      const filterdData = backUpData.filter((item) => item?.itemCategories?.includes(inputCategory));
      setData(filterdData);
    } else {
      setData(backUpData);
    }
  };

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
