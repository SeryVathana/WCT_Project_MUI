/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AspectRatio,
  Avatar,
  Button,
  Chip,
  Grid,
  Sheet,
  Stack,
  Table,
  Typography,
} from '@mui/joy';
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { db } from '../firebaseConfig';
import { IoMdTime } from 'react-icons/io';
import { EditPost } from './EditPost';

export const ItemList = ({ data }) => {
  const user = useSelector((state) => state.user.value);

  const [item, setItem] = useState(data);
  const [activeImg, setActiveImg] = useState(item.itemImgURL[0]);
  const curDocRef = doc(db, 'posts', item.id);
  const newDocRef = doc(db, 'items', item.id);

  const isUsersPost = data.sellerID == user.userId;

  const [openEditForm, setOpenEditForm] = useState(false);
  const [editingData, setEditingData] = useState();

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
      deleteDoc(doc(db, 'items', item?.id));
      console.log('Update Data');
    });
  };

  return (
    <Accordion>
      <AccordionSummary>
        <Stack
          direction={'row'}
          gap={2}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Stack direction={'row'} gap={2} alignItems={'center'}>
            <AspectRatio
              ratio={4 / 3}
              objectFit='cover'
              sx={{ minWidth: { xs: '80px', md: '100px' }, borderRadius: 'xs' }}
            >
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
            <Chip
              sx={{
                display: { xs: 'flex', md: 'none' },
                padding: 1,
                aspectRatio: '1/1',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              color='warning'
            >
              <IoMdTime />
            </Chip>
          ) : (
            <Chip
              sx={{
                display: { xs: 'flex', md: 'none' },
                padding: 1,
                aspectRatio: '1/1',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              color='success'
            >
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
                        return cate + ', ';
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
              {user.userRole == 'Admin' && (
                <>
                  <Button disabled={item.postStatus === 'accepted'} onClick={() => AcceptPost()}>
                    Approve
                  </Button>
                  <Button
                    disabled={item.postStatus === 'pending'}
                    onClick={() => RejectPost()}
                    color='danger'
                  >
                    Reject
                  </Button>
                </>
              )}
              {isUsersPost && item.postStatus == 'pending' && (
                <Button
                  color='neutral'
                  onClick={() => {
                    setOpenEditForm(true);
                    setEditingData(item);
                  }}
                >
                  Edit
                </Button>
              )}

              {isUsersPost && item.postStatus != 'pending' && (
                <Button color='neutral' disabled>
                  {"Your post has been accepted. You can't edit now."}
                </Button>
              )}
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
                    <AspectRatio
                      key={Math.random()}
                      ratio={4 / 3}
                      sx={{ minWidth: '80px', borderRadius: 'xs' }}
                    >
                      <img src={img} alt='' onClick={(e) => setActiveImg(e.target.src)} />
                    </AspectRatio>
                  );
                })}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </AccordionDetails>
      {openEditForm && (
        <EditPost
          curData={editingData}
          setCurData={setItem}
          openEditForm={openEditForm}
          setOpenEditForm={setOpenEditForm}
        />
      )}
    </Accordion>
  );
};
