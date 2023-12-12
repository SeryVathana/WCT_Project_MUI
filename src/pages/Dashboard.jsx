/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  AspectRatio,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Sheet,
  Snackbar,
  Stack,
  TabPanel,
  Table,
  Textarea,
  Typography,
} from '@mui/joy';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';
import { Timestamp, addDoc, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { IoIosCheckmarkCircle, IoMdClose } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa6';

import { useSelector } from 'react-redux';

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FiTrash } from 'react-icons/fi';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoMdTime } from 'react-icons/io';

import { v4 } from 'uuid';
import { storeDB } from '../firebaseConfig';

import Autocomplete from '@mui/joy/Autocomplete';

function Dashboard() {
  const user = useSelector((state) => state.user.value);
  const dataCollectionRef = collection(db, 'posts');

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onSnapshot(dataCollectionRef, (snapshot) => {
      setPosts(snapshot.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  return (
    <Stack mt={3}>
      <Tabs aria-label='Basic tabs' defaultValue={0} variant={'outlined'} sx={{ borderRadius: 'md' }}>
        <TabList>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} paddingX={{ xs: 0, md: 2 }} pt={2}>
            <Stack direction={{ xs: 'column', md: 'row' }} flexGrow={{ xs: 1, md: 0 }} justifyContent={'space-between'} alignItems={{ xs: 'center', md: 'end' }} gap={{ xs: 2, sm: 3, md: 4, lg: 5 }}>
              <Typography level='h2' fontSize={{ xs: 18, sm: 20, md: 22, lg: 24 }}>
                Dashboard
              </Typography>
              <Stack direction={'row'} fontSize={{ xs: 12, sm: 16 }}>
                <Tab sx={{ textAlign: 'center' }}>Create Post</Tab>
                <Tab>Profile</Tab>
                {user.userRole === 'Admin' && <Tab>Posts</Tab>}
                <Tab>Activities</Tab>
              </Stack>
            </Stack>
            <Typography level='body-md' sx={{ display: { xs: 'none', md: 'block' } }}>
              Role: {user.userRole}
            </Typography>
          </Stack>
        </TabList>
        <TabPanel value={0}>
          <CreatePostTab />
        </TabPanel>
        <TabPanel value={1}>
          <b>Profile</b> tab panel
        </TabPanel>
        {user.userRole === 'Admin' && (
          <TabPanel value={2} sx={{ padding: { xs: 0.5, sm: 1, md: 2 } }}>
            <Posts data={posts} />
          </TabPanel>
        )}
        <TabPanel value={3}>
          <b>Activities</b> tab panel
        </TabPanel>
      </Tabs>
    </Stack>
  );
}

const Posts = ({ data }) => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={8} order={{ xs: 1, md: 0 }} flexGrow={1}>
        <Sheet variant='outlined' sx={{ borderRadius: 'md', padding: 1 }}>
          <Stack gap={2}>
            <Typography level='title-lg'>Posts</Typography>
            <AccordionGroup sx={{ borderRadius: 'none' }}>
              {data.map((item) => {
                return <ItemList key={item.id} data={item} />;
              })}
            </AccordionGroup>
          </Stack>
        </Sheet>
      </Grid>

      <Grid xs={12} md={4} order={{ xs: 0, md: 1 }} flexGrow={1}>
        <Sheet variant='outlined' sx={{ borderRadius: 'md' }}>
          <Table variant='plain' borderAxis='none'>
            <thead>
              <tr>
                <th>Summary</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>All Posts</td>
                <td>1000 posts</td>
              </tr>
              <tr>
                <td>Accepted Posts</td>
                <td>850 posts</td>
              </tr>
              <tr>
                <td>Rejected Posts</td>
                <td>50 posts</td>
              </tr>
              <tr>
                <td>Pending Posts</td>
                <td>100 posts</td>
              </tr>
            </tbody>
          </Table>
        </Sheet>
      </Grid>
    </Grid>
  );
};

const ItemList = ({ data }) => {
  const [item, setItem] = useState(data);
  const [activeImg, setActiveImg] = useState(item.itemImgURL[0]);
  const curDocRef = doc(db, 'posts', item.id);
  const newDocRef = doc(db, 'items', item.id);

  const dateFormat = (date) => {
    return new Date(date?.seconds * 1000).toLocaleString();
  };

  const AcceptPost = async () => {
    const newData = {
      ...item,
      postStatus: 'accepted',
    };

    await updateDoc(curDocRef, newData).then(() => {
      setItem(newData);
      setDoc(newDocRef, newData);
      console.log('Update Data');
    });
  };

  const RejectPost = async () => {
    const newData = {
      ...item,
      postStatus: 'pending',
    };

    await updateDoc(curDocRef, newData).then(() => {
      setItem(newData);
      deleteDoc(doc(db, 'items', item.id));
      console.log('Update Data');
    });
  };

  return (
    <Accordion>
      <AccordionSummary>
        <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
          <Stack direction={'row'} gap={2} alignItems={'center'}>
            <AspectRatio ratio={4 / 3} objectFit='cover' sx={{ minWidth: { xs: '80px', md: '100px' }, borderRadius: 'xs' }}>
              <img src={item.itemImgURL[0]} alt='' />
            </AspectRatio>
            <Stack>
              <Typography level='title-lg'>{item.itemName}</Typography>
              <Typography level='body-sm'>{item.sellerName}</Typography>
              <Typography level='body-sm'>{dateFormat(item.startDate)}</Typography>
            </Stack>
          </Stack>
          {item.postStatus == 'pending' ? (
            <Chip sx={{ display: { xs: 'none', md: 'flex' } }} color='warning'>
              Pending
            </Chip>
          ) : (
            <Chip sx={{ display: { xs: 'none', md: 'flex' } }} color='success'>
              Accepted
            </Chip>
          )}
          {item.postStatus == 'pending' ? (
            <Chip sx={{ display: { xs: 'flex', md: 'none' }, padding: 1, aspectRatio: '1/1', alignItems: 'center', justifyContent: 'center' }} color='warning'>
              <IoMdTime />
            </Chip>
          ) : (
            <Chip sx={{ display: { xs: 'flex', md: 'none' }, padding: 1, aspectRatio: '1/1', alignItems: 'center', justifyContent: 'center' }} color='success'>
              <FaCheck />
            </Chip>
          )}
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} order={1}>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Avatar size='md' alt='Remy Sharp' src='' />
              <Stack>
                <Typography level='title-md'>{item.sellerName}</Typography>
                <Typography level='body-sm' color='primary'>
                  Active <IoIosCheckmarkCircle />
                </Typography>
              </Stack>
            </Stack>
            <Stack gap={1}>
              <Typography level='h3' mt={2}>
                {item.itemName}
              </Typography>
              <Typography level='body-sm'>{item.itemDetail}</Typography>
            </Stack>
            <Sheet sx={{ mt: 5 }}>
              <Table variant='plain' borderAxis='none'>
                <tbody>
                  <tr>
                    <td>Categories</td>
                    <td>
                      {item.itemCategories.map((cate) => {
                        return cate.title + ', ';
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td>Location</td>
                    <td>{item.location.join(', ')}</td>
                  </tr>
                  <tr>
                    <td>Start Date</td>
                    <td>{dateFormat(item.startDate)}</td>
                  </tr>
                  <tr>
                    <td>End Date</td>
                    <td>{dateFormat(item.endDate)}</td>
                  </tr>
                  <tr>
                    <td>Remaining Day</td>
                    <td>3 Days : 3 Hours : 1mn</td>
                  </tr>
                  <tr>
                    <td>Start Price</td>
                    <td>$ {Number(item.initialPrice).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Bid Increment</td>
                    <td>$ {Number(item.bidIncrement).toLocaleString()}</td>
                  </tr>
                </tbody>
              </Table>
            </Sheet>
            <Stack direction={'row'} gap={2} mt={3}>
              <Button disabled={item.postStatus === 'accepted'} onClick={() => AcceptPost()}>
                Approve
              </Button>
              <Button disabled={item.postStatus === 'pending'} onClick={() => RejectPost()} color='danger'>
                Reject
              </Button>
            </Stack>
          </Grid>

          <Grid xs={12} sm={6} order={0}>
            <Stack gap={1}>
              <AspectRatio ratio={16 / 9} objectFit='contain' sx={{ borderRadius: 'sm' }}>
                <img src={activeImg} alt='' />
              </AspectRatio>
              <Stack direction={'row'} gap={1} overflow={'auto'}>
                {item.itemImgURL?.map((img) => {
                  return (
                    <AspectRatio key={Math.random()} ratio={4 / 3} sx={{ minWidth: '80px', borderRadius: 'xs' }}>
                      <img src={img} alt='' onClick={(e) => setActiveImg(e.target.src)} />
                    </AspectRatio>
                  );
                })}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

const CreatePostTab = () => {
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
      sellerID: String(user.userId),
      sellerName: user.userName,
      sellerProfileImg: 'https://images.pexels.com/photos/1490844/pexels-photo-1490844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      itemName: itemName,
      itemDetail: description,
      itemImgURL: imgs,
      itemCategories: categories,
      postStatus: 'pending',
      location: [district, city, country],
      initialPrice: initialPrice,
      bidIncrement: bidIncrement,
      biddingHistory: [],
      startDate: new Timestamp(Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000000)),
      endDate: new Timestamp(Math.floor(new Date(endDate).getTime() / 1000), Math.floor(new Date(endDate).getTime() / 1000000)),
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

  const categoriesList = [{ title: 'Electronics' }, { title: 'Vehicle' }];

  return (
    <Stack gap={2} mt={2} width={{ xs: '100%', sm: '80%', md: '70%', lg: '50%' }} margin={'0 auto'}>
      <Typography level='h2' textAlign={'center'} fontSize={{ xs: 18, sm: 20, md: 22, lg: 24 }} mt={5}>
        Create Post
      </Typography>
      <form onSubmit={(e) => handleSubmitData(e)}>
        <Stack direction={'column'} gap={3}>
          <Box>
            <FormLabel>Item Name</FormLabel>
            <Input value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder='Enter Item Name' required sx={{ boxShadow: 'none' }} />
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
            <input type='file' accept='image/png, image/jpeg, image/jpg' multiple required onChange={(e) => handleUpload(e)} />
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
              <Input value={district} onChange={(e) => setDistrict(e.target.value)} placeholder='Enter District' required sx={{ boxShadow: 'none' }} />
              <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter City' required sx={{ boxShadow: 'none' }} />
              <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder='Enter Country' required sx={{ boxShadow: 'none' }} />
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
            <Input value={initialPrice} onChange={(e) => setInitialPrice(e.target.value)} startDecorator={'$'} placeholder='Enter Initial Price' type='number' required sx={{ boxShadow: 'none' }} />
          </Box>

          <Box>
            <FormLabel>Increment Amount</FormLabel>
            <Input value={bidIncrement} onChange={(e) => setBidIncrement(e.target.value)} startDecorator={'$'} placeholder='Enter Bid Increment' type='number' required sx={{ boxShadow: 'none' }} />
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

export default Dashboard;
