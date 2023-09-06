import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';

import { ROUTES } from '../../../services/routing/routes/constants';

const useNavbar = () => {
  const { pathname } = useRouter();

  const isActive = (route: string) => pathname === route;

  const menuItems = useMemo(
    () => [
      {
        icon: FaHome, 
        id: 'Página principal',
        isActive: isActive(ROUTES.HOME),
        route: ROUTES.HOME,
      },
      {
        icon: FaSignOutAlt, 
        id: 'Cerrar sesión',
        isActive: isActive(ROUTES.LOGOUT),
        route: ROUTES.LOGOUT,
      }
    ],
    [isActive],
  );

  return { menuItems };
};

export default useNavbar;
