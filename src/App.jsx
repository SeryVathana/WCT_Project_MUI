import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Item from './pages/Item';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import UploadImgTest from './tests/UploadImgTest';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/actions/userSlice';
import { switchLogin } from './redux/actions/loginSlice';
import Notfound from './pages/Notfound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path='/browse' element={<Browse />} />
      <Route path='/item/:id' element={<Item />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/test' element={<UploadImgTest />} />
      <Route path='/*' element={<Notfound />} />
    </Route>
  )
);

export default function App() {
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (currentUser) => {
    const colRef = collection(db, 'users');

    if (currentUser) {
      dispatch(switchLogin());

      const q = query(colRef, where('email', '==', currentUser?.email));
      onSnapshot(q, (snapshot) =>
        snapshot.docs.map((doc) => {
          const user = { ...doc.data(), id: doc.id };

          dispatch(setUser(user));
        })
      );
    }
  });

  return <RouterProvider router={router} />;
}
