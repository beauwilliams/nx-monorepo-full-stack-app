import Link from 'next/link';
import { useState } from 'react';
import ThemeToggler from '../../components/theme-toggler/theme-toggler';

/* eslint-disable-next-line */
export interface NavbarProps {}


export const navLinks = [
  { name: 'Home', path: '/' },
  {
    name: 'Login',
    path: '/login',
  },
  {
    name: 'Signup',
    path: '/signup',
  },
  {
    name: 'Users',
    path: '/users',
  },
];

export const Navbar = () => {

  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <section>
    <nav className="dark:bg-gray-900 bg-gray-50 z-0 ">
      <div className="flex justify-evenly py-8 text-xl">
        {navLinks.map((link, index) => {
          return (
            <Link href={link.path} key={index}>
                <a className='hover:text-blue-800 dark:hover:text-blue-600'>{link.name}</a>
            </Link>
          );
        })}
        <ThemeToggler></ThemeToggler>
</div>
    </nav>
    </section>
  );
};

export default Navbar;
