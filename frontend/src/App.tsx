import { Component, lazy } from 'solid-js';
import { Navigate, Route, Routes, Outlet } from '@solidjs/router';
import { MetaProvider, Title } from '@solidjs/meta';

// Components
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Themer from './components/Themer/Themer';

// Site Routes
const BlogIndex = lazy(() => import('./pages/BlogIndex/BlogIndex'));
const Blog = lazy(() => import('./pages/Blog/Blog'));
const SeriesIndex = lazy(() => import('./pages/SeriesIndex/SeriesIndex'));
const Series = lazy(() => import('./pages/Series/Series'));
const Category = lazy(() => import('./pages/Category/Category'));
const About = lazy(() => import('./pages/About/About'));

// Admin Routes
const Admin = lazy(() => import('./admin/Admin'));

const App: Component = () => {
  return (
    <>
      <Routes>
        <Route path="/" component={SiteHeader}>
          <SiteRoutes />
        </Route>
        <Route path="/admin" component={AdminHeader}>
          <AdminRoutes />
        </Route>
      </Routes>
    </>
  );
};

const SiteHeader: Component = () => {
  return (
    <>
      <Themer></Themer>
      <Header></Header>
      <Navbar></Navbar>
      <Outlet />
    </>
  );
};

const AdminHeader: Component = () => {
  return (
    <>
      {/* <Themer></Themer> */}
      <Header></Header>
      <Outlet />
    </>
  );
};

const SiteRoutes: Component = () => {
  return (
    <>
      <Route path="/blog" element={<BlogIndex />}></Route>
      <Route path="/blog/:blog" element={<Blog />}></Route>
      <Route path="/series" element={<SeriesIndex />}></Route>
      <Route path="/series/:series" element={<Series />}></Route>
      <Route path="/category/:category" element={<Category />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/" element={<Navigate href="/blog"></Navigate>}></Route>
      <Route path="*" element={<h1>404</h1>}></Route>
    </>
  );
};

const AdminRoutes: Component = () => {
  return (
    <>
      <Route path="/" element={<Admin />}></Route>
    </>
  );
};

export default App;
