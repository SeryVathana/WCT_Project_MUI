import { Container } from '@mui/joy';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <Container maxWidth='xl'>
      <Header />

      <Outlet />

      <Footer />
    </Container>
  );
}
