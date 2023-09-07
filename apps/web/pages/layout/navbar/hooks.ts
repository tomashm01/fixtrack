import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { FaHome, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import { ROUTES } from '../../../services/routing/routes/constants';

const useNavbar = (role: string) => {
  const { pathname } = useRouter();
  
  const isActive = (route: string) => pathname === route;
  
  const menuItems = useMemo(() => [
    {
      icon: FaHome,
      id: 'Página principal',
      isActive: isActive(ROUTES.HOME),
      route: ROUTES.HOME,
      roles: ['ADMIN', 'CLIENTE', 'TECNICO'],
    },
    {
      icon: FaUserAlt,
      id: 'Usuarios',
      isActive: isActive(ROUTES.USER),
      route: ROUTES.USER,
      roles: ['ADMIN'],
    },
    {
      icon: FaSignOutAlt,
      id: 'Cerrar sesión',
      isActive: isActive(ROUTES.LOGOUT),
      route: ROUTES.LOGOUT,
      roles: ['ADMIN', 'CLIENTE', 'TECNICO'],
    },
  ], [isActive, role]);

  return { menuItems };
};

export default useNavbar;
