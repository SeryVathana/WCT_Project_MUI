import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Item from './pages/Item';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path='/browse' element={<Browse />} />
      <Route path='/item' element={<Item />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
