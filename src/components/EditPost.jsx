/* eslint-disable react/prop-types */
import { AspectRatio, Box, Button, Card, Chip, FormLabel, IconButton, Input, Modal, ModalDialog, ModalOverflow, Snackbar, Stack, Textarea, Typography } from '@mui/joy';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
// import { useSelector } from 'react-redux';
import Autocomplete from '@mui/joy/Autocomplete';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FiTrash } from 'react-icons/fi';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { v4 } from 'uuid';
import { db, storeDB } from '../firebaseConfig';

export const EditPost = ({ curData, setCurData, openEditForm, setOpenEditForm }) => {
  // const user = useSelector((state) => state.user.value);
  const dataPostsRef = doc(db, 'posts', curData?.id);

  const [itemName, setItemName] = useState(curData?.itemName);
  const [description, setDescription] = useState(curData?.itemDetail);
  const [categories, setCategories] = useState([]);
  const [district, setDistrict] = useState(curData?.location[0]);
  const [city, setCity] = useState(curData?.location[1]);
  const [country, setCountry] = useState(curData?.location[2]);
  const [endDate, setEndDate] = useState('');
  const [initialPrice, setInitialPrice] = useState(curData?.initialPrice);
  const [bidIncrement, setBidIncrement] = useState(curData?.bidIncrement);

  const [imgs, setImgs] = useState(curData?.itemImgURL);
  const [imgsName, setImgsName] = useState([]);

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleUpload = (e) => {
    const uploadedObject = [...e.target.files];

    uploadedObject.map((img) => {
      const fileName = `user-uploaded/${v4()}`;
      const imgs = ref(storeDB, fileName);
      uploadBytes(imgs, img).then((data) => {
        console.log('uploaded');
        getDownloadURL(data.ref).then((val) => {
          setImgs((prev) => [...prev, val]);
          setImgsName((prev) => [...prev, fileName]);
        });
      });
    });
  };

  const handleDeleteImg = (img) => {
    const index = imgs.findIndex((item) => item == img);
    console.log(imgsName[index]);
    deleteObject(ref(storeDB, imgsName[index])).then(() => {
      setImgsName((prevNames) => prevNames.filter((each) => each != imgsName[index]));
      setImgs((prevImgs) => prevImgs.filter((each) => each != img));
    });
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    const inputData = {
      id: curData.id,
      sellerID: curData.sellerID,
      sellerName: curData.sellerName,
      sellerProfileImg: curData.sellerProfileImg,
      itemName: itemName,
      itemDetail: description,
      itemImgURL: imgs,
      itemCategories: categories,
      postStatus: curData.postStatus,
      location: [district, city, country],
      initialPrice: initialPrice,
      bidIncrement: bidIncrement,
      biddingHistory: curData.biddingHistory,
      startDate: curData.startDate,
      endDate: curData.endDate,
      // endDate: new Timestamp(Math.floor(new Date(endDate).getTime() / 1000), Math.floor(new Date(endDate).getTime() / 1000000)),
    };

    updateDoc(dataPostsRef, inputData).then(() => {
      setCurData(inputData);
      setOpenSnackBar(true);
      clearInput();
      setOpenEditForm(false);
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

  const categoriesList = [{ title: 'Electronics' }, { title: 'Vehicle' }];

  return (
    <Modal open={openEditForm} onClose={() => setOpenEditForm(false)}>
      <ModalOverflow>
        <ModalDialog sx={{ width: '100%' }}>
          <Stack gap={2} mt={2} width={{ xs: '100%', sm: '80%', md: '70%', lg: '50%' }} margin={'0 auto'}>
            <Typography level='h2' textAlign={'center'} fontSize={{ xs: 18, sm: 20, md: 22, lg: 24 }} mt={5}>
              Edit Post
            </Typography>
            <form onSubmit={(e) => handleSubmitData(e)}>
              <Stack direction={'column'} gap={3}>
                <Box>
                  <FormLabel>Item Name</FormLabel>
                  <Input value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder='Enter Item Name' sx={{ boxShadow: 'none' }} />
                </Box>
                <Box>
                  <FormLabel>Item Description</FormLabel>
                  <Textarea
                    placeholder='Enter Item Description'
                    minRows={2}
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                    endDecorator={
                      <Typography level='body-xs' sx={{ ml: 'auto' }}>
                        {120 - description?.length} character(s) left
                      </Typography>
                    }
                    sx={{ boxShadow: 'none' }}
                  />
                </Box>

                <Stack gap={1}>
                  <FormLabel>Item Images</FormLabel>
                  <input type='file' accept='image/png, image/jpeg, image/jpg' multiple onChange={(e) => handleUpload(e)} />
                  <Card sx={{ padding: 1, minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                        <Card key={Math.random() + Math.random() * Date.now()} sx={{ padding: 1, width: '100%' }}>
                          <Stack direction={'row'} overflow={'hidden'} justifyContent={'space-between'} alignItems={'center'}>
                            <AspectRatio objectFit='contain' minHeight={100} maxHeight={100} sx={{ minWidth: 100, maxWidth: 250, flexGrow: 1 }}>
                              <img src={img} alt='' />
                            </AspectRatio>

                            <IconButton color='danger' variant='outlined' onClick={() => handleDeleteImg(img)}>
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
                    placeholder='Favorites'
                    options={categoriesList}
                    getOptionLabel={(option) => option.title}
                    onChange={(e, newValue) => setCategories(newValue)}
                    renderTags={(tags, getTagProps) => {
                      return tags.map((item, index) => (
                        <Chip key={index} variant='solid' color='primary' endDecorator={'x'} {...getTagProps({ index })}>
                          {item.title}
                        </Chip>
                      ));
                    }}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
                  <Typography>Location</Typography>
                  <Stack gap={1} flexGrow={1}>
                    <Input value={district} onChange={(e) => setDistrict(e.target.value)} placeholder='Enter District' sx={{ boxShadow: 'none' }} />
                    <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter City' sx={{ boxShadow: 'none' }} />
                    <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder='Enter Country' sx={{ boxShadow: 'none' }} />
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
                      sx={{ boxShadow: 'none', flexGrow: 1 }}
                    />
                    {/* <Input type='time' onChange={(e) => console.log(e.target.value)}  sx={{ boxShadow: 'none' }} /> */}
                  </Stack>
                </Box>

                <Box>
                  <FormLabel>Initial Price</FormLabel>
                  <Input value={initialPrice} onChange={(e) => setInitialPrice(e.target.value)} startDecorator={'$'} placeholder='Enter Initial Price' type='number' sx={{ boxShadow: 'none' }} />
                </Box>

                <Box>
                  <FormLabel>Increment Amount</FormLabel>
                  <Input value={bidIncrement} onChange={(e) => setBidIncrement(e.target.value)} startDecorator={'$'} placeholder='Enter Bid Increment' type='number' sx={{ boxShadow: 'none' }} />
                </Box>
                <Stack direction={'row'} justifyContent={'end'} gap={2}>
                  <Button color='danger' variant='outlined' onClick={() => setOpenEditForm(false)} sx={{ width: 'fit-content', alignSelf: 'center' }}>
                    Cancle
                  </Button>
                  <Button type='submit' sx={{ width: 'fit-content', alignSelf: 'center' }}>
                    Save Edit
                  </Button>
                </Stack>
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
                <Typography level='title-lg'>Post Updated.</Typography>
                {/* <Typography>Your post need to be reviewed before going to public.</Typography> */}
              </Stack>
            </Snackbar>
          </Stack>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};
