import Footer from '../footer/footer';
import Header from '../header/header';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1 overflow-y-auto justify-center items-center">
        <main>{children}</main>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Layout;
