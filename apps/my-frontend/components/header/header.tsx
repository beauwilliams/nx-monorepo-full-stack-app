// /* eslint-disable-next-line */
// export interface HeaderProps {}

// import { useEffect, useRef, useState } from 'react';
// import Head from 'next/head';
// import Navbar from '../navbar/navbar';

// const Header = () => {
//     const [divHeight, setDivHeight] = useState(0);
//     const ref = useRef<HTMLDivElement>(null)

//     useEffect(() => {
//         setDivHeight(ref.current.clientHeight);
//     });
//     return (
//         <>

//             <header ref={ref} className="flex flex-col items-center fixed top-0 z-20 w-full">
//         <Navbar></Navbar>
//             </header>
//             <div style={{ height: `${divHeight}px` }}></div>
//         </>
//     );
// };

// export default Header;

/* eslint-disable-next-line */
export interface HeaderProps {}

import Head from 'next/head';
import Navbar from '../navbar/navbar';

const Header = () => {
  return (
    <>
      <Head>
        <title>Welcome to my full stack app!</title>
      </Head>
      <Navbar></Navbar>
    </>
  );
};

export default Header;
