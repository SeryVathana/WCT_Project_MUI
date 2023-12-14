import { useState } from 'react';
import { v4 } from 'uuid';
import { storeDB } from '../firebaseConfig';

import { AspectRatio, Card, IconButton, Stack } from '@mui/joy';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { FiTrash } from 'react-icons/fi';

function UploadImgTest() {
  const [imgs, setImgs] = useState([]);
  const [imgsName, setImgsName] = useState([]);

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

  return (
    <Stack>
      <input type='file' multiple onChange={(e) => handleUpload(e)} />
      {imgs?.map((img) => {
        return (
          <Card key={Math.random() + Math.random() * Date.now()} sx={{ padding: 1 }}>
            <Stack direction={'row'} overflow={'hidden'} justifyContent={'space-between'} alignItems={'center'}>
              <AspectRatio ratio={1 / 2} minHeight={100} maxHeight={100} sx={{ minWidth: '20%' }}>
                <img src={img} alt='' />
              </AspectRatio>
              <IconButton color='danger' variant='outlined' onClick={() => handleDeleteImg(img)}>
                <FiTrash />
              </IconButton>
            </Stack>
          </Card>
        );
      })}
    </Stack>
  );
}

export default UploadImgTest;
