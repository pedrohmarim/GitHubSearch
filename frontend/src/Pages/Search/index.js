import React, { useEffect, useState } from 'react';

import Header from '../../Components/GlobalComponents/header';
import SearchFunc from '../../Components/SearchPage/SearchFunc';

export default function Search() {
  const [headerColor, setHeaderColor] = useState(false);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setHeaderColor(true);
      } else {
        setHeaderColor(false);
      }
    };

    window.addEventListener('scroll', scrollListener);
  }, []);

  return (
    <>
      <Header headerColor={headerColor} />
      <SearchFunc />
    </>
  );
}
