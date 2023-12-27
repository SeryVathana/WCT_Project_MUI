import { useState } from 'react';
import {
  AspectRatio,
  Box,
  Button,
  Card,
  Chip,
  FormLabel,
  IconButton,
  Input,
  Snackbar,
  Stack,
  Textarea,
  Typography,
} from '@mui/joy';
import { Timestamp, addDoc } from 'firebase/firestore';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FiTrash } from 'react-icons/fi';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { v4 } from 'uuid';
import { storeDB } from '../firebaseConfig';
import Autocomplete from '@mui/joy/Autocomplete';

import { ITEM_CATEGORIES } from '../data/data';

export const CreatePost = () => {
  const user = useSelector((state) => state.user.value);
  const dataCollectionRef = collection(db, 'posts');

  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [endDate, setEndDate] = useState('');
  const [initialPrice, setInitialPrice] = useState('');
  const [bidIncrement, setBidIncrement] = useState('');

  const [imgs, setImgs] = useState([]);
  const [imgsName, setImgsName] = useState([]);

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleUpload = (e) => {
    const uploadedObject = [...e.target.files];

    uploadedObject.map((img) => {
      const fileName = `user-uploaded/${v4()}`;
      const imgs = ref(storeDB, fileName);
      uploadBytes(imgs, img).then((data) => {
        getDownloadURL(data.ref).then((val) => {
          setImgs((prev) => [...prev, val]);
          setImgsName((prev) => [...prev, fileName]);
        });
      });
    });
  };

  const handleDeleteImg = (img) => {
    const index = imgs.findIndex((item) => item == img);
    deleteObject(ref(storeDB, imgsName[index])).then(() => {
      setImgsName((prevNames) => prevNames.filter((each) => each != imgsName[index]));
      setImgs((prevImgs) => prevImgs.filter((each) => each != img));
    });
  };

  const handleSubmitData = (e) => {
    e.preventDefault();

    let cateArr = [];

    if (categories.length > 0) {
      categories.map((cat) => cateArr.push(cat.title));
    } else {
      cateArr = ['Default'];
    }

    const inputData = {
      sellerID: String(user.userId),
      sellerName: user.userName,
      sellerProfileImg: user.userPfp,
      itemName: itemName,
      itemDetail: description,
      itemImgURL: imgs,
      itemCategories: cateArr,
      postStatus: 'pending',
      location: [district, city, country],
      initialPrice: initialPrice,
      bidIncrement: bidIncrement,
      biddingHistory: [],
      startDate: new Timestamp(Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000000)),
      endDate: new Timestamp(
        Math.floor(new Date(endDate).getTime() / 1000),
        Math.floor(new Date(endDate).getTime() / 1000000)
      ),
    };

    addDoc(dataCollectionRef, inputData).then(() => {
      setOpenSnackBar(true);
      clearInput();
    });
  };

  const clearInput = () => {
    setItemName('');
    setDescription('');
    setCategories([]);
    setCity('');
    setDistrict('');
    setCountry('');
    setBidIncrement('');
    setInitialPrice('');
    setEndDate('');
    setImgs([]);
  };

  const categoriesList = [];
  ITEM_CATEGORIES.map((category) => categoriesList.push({ title: category }));

  return (
    <Stack gap={2} mt={2} width={{ xs: '100%', sm: '80%', md: '70%', lg: '50%' }} margin={'0 auto'}>
      <Typography
        level='h2'
        textAlign={'center'}
        fontSize={{ xs: 18, sm: 20, md: 22, lg: 24 }}
        mt={5}
      >
        Create Post
      </Typography>
      <form onSubmit={(e) => handleSubmitData(e)}>
        <Stack direction={'column'} gap={3}>
          <Box>
            <FormLabel>Item Name</FormLabel>
            <Input
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder='Enter Item Name'
              required
              sx={{ boxShadow: 'none' }}
            />
          </Box>
          <Box>
            <FormLabel>Item Description</FormLabel>
            <Textarea
              placeholder='Enter Item Description'
              minRows={2}
              required
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              endDecorator={
                <Typography level='body-xs' sx={{ ml: 'auto' }}>
                  {120 - description.length} character(s) left
                </Typography>
              }
              sx={{ boxShadow: 'none' }}
            />
          </Box>

          <Stack gap={1}>
            <FormLabel>Item Images</FormLabel>
            <input
              type='file'
              accept='image/png, image/jpeg, image/jpg'
              multiple
              required
              onChange={(e) => handleUpload(e)}
            />
            <Card
              sx={{
                padding: 1,
                minHeight: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {imgs.length == 0 ? (
                <>
                  <Typography>No File Chosen</Typography>
                  <Typography>{'Support files (JPG, PNG, JPEG)'}</Typography>
                </>
              ) : (
                <Typography>{imgs.length} File(s) Chosen</Typography>
              )}
              {imgs?.map((img) => {
                return (
                  <Card
                    key={Math.random() + Math.random() * Date.now()}
                    sx={{ padding: 1, width: '100%' }}
                  >
                    <Stack
                      direction={'row'}
                      overflow={'hidden'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <AspectRatio
                        objectFit='contain'
                        minHeight={100}
                        maxHeight={100}
                        sx={{ minWidth: 100, maxWidth: 250, flexGrow: 1 }}
                      >
                        <img src={img} alt='' />
                      </AspectRatio>

                      <IconButton
                        color='danger'
                        variant='outlined'
                        onClick={() => handleDeleteImg(img)}
                      >
                        <FiTrash />
                      </IconButton>
                    </Stack>
                  </Card>
                );
              })}
            </Card>
          </Stack>

          <Stack>
            <FormLabel>Item Categories</FormLabel>
            <Autocomplete
              id='tags-default'
              multiple
              placeholder='Categories'
              options={categoriesList}
              sx={{ boxShadow: 'none' }}
              getOptionLabel={(option) => option.title}
              onChange={(e, newValue) => setCategories(newValue)}
              renderTags={(tags, getTagProps) => {
                return tags.map((item, index) => (
                  <Chip
                    key={index}
                    variant='solid'
                    color='primary'
                    endDecorator={'x'}
                    {...getTagProps({ index })}
                  >
                    {item.title}
                  </Chip>
                ));
              }}
            />
          </Stack>

          <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
            <Typography>Location</Typography>
            <Stack gap={1} flexGrow={1}>
              <Input
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder='Enter District'
                required
                sx={{ boxShadow: 'none' }}
              />
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='Enter City'
                required
                sx={{ boxShadow: 'none' }}
              />
              <Input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder='Enter Country'
                required
                sx={{ boxShadow: 'none' }}
              />
            </Stack>
          </Stack>
          <Box>
            <FormLabel>End Date</FormLabel>
            <Stack direction={'row'} gap={1}>
              <Input
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                type='date'
                slotProps={{
                  input: {
                    min: new Date(Date.now()).toISOString().replace(/T.*/, '').split('-').join('-'),
                  },
                }}
                required
                sx={{ boxShadow: 'none', flexGrow: 1 }}
              />
              {/* <Input type='time' onChange={(e) => console.log(e.target.value)} required sx={{ boxShadow: 'none' }} /> */}
            </Stack>
          </Box>

          <Box>
            <FormLabel>Initial Price</FormLabel>
            <Input
              value={initialPrice}
              onChange={(e) => setInitialPrice(e.target.value)}
              startDecorator={'$'}
              placeholder='Enter Initial Price'
              type='number'
              required
              sx={{ boxShadow: 'none' }}
            />
          </Box>

          <Box>
            <FormLabel>Increment Amount</FormLabel>
            <Input
              value={bidIncrement}
              onChange={(e) => setBidIncrement(e.target.value)}
              startDecorator={'$'}
              placeholder='Enter Bid Increment'
              type='number'
              required
              sx={{ boxShadow: 'none' }}
            />
          </Box>
          <Button type='submit' sx={{ width: 'fit-content', alignSelf: 'center' }}>
            Submit
          </Button>
        </Stack>
      </form>

      <Snackbar
        variant='solid'
        color='success'
        startDecorator={<IoMdCheckmarkCircleOutline style={{ fontSize: '42px' }} />}
        endDecorator={
          <IconButton color='success' onClick={() => setOpenSnackBar(false)}>
            <IoMdClose />
          </IconButton>
        }
        open={openSnackBar}
        onClose={() => {
          setOpenSnackBar(false);
        }}
      >
        <Stack>
          <Typography level='title-lg'>Post Submited.</Typography>
          <Typography>Your post need to be reviewed before going to public.</Typography>
        </Stack>
      </Snackbar>
    </Stack>
  );
};
