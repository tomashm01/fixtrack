import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { FaHome } from 'react-icons/fa';

import { ROUTES } from '../../../services/routing/routes/constants';



const useNavbar = () => {
  const { pathname } = useRouter();

  const isActive = (route: string) => pathname === route;

  const menuItems = useMemo(
    () => [
      {
        icon: FaHome, 
        id: 'home',
        isActive: isActive(ROUTES.HOME),
        route: ROUTES.HOME,
      },
    ],
    [isActive],
  );

  return { menuItems };
};

export default useNavbar;
