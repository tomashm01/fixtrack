import { useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  FaHome,
  FaMobileAlt,
  FaShoppingCart,
  FaSignOutAlt,
  FaUserAlt
} from 'react-icons/fa';
import { ROUTES } from '../../../services/routing/routes/constants';

const useNavbar = (role: string) => {
  const { pathname } = useRouter();

  const isActive = (route: string) => pathname === route;

  const menuItems = useMemo(
    () => [
      {
        icon: FaHome,
        id: 'Página principal',
        isActive: isActive(ROUTES.HOME),
        route: ROUTES.HOME,
        roles: ['ADMIN', 'CLIENTE', 'TECNICO']
      },
      {
        icon: FaShoppingCart,
        id: 'Reparaciones',
        isActive: isActive(ROUTES.WORDK_ORDER),
        route: ROUTES.WORDK_ORDER,
        roles: ['ADMIN', 'TECNICO']
      },
      {
        icon: FaUserAlt,
        id: 'Usuarios',
        isActive: isActive(ROUTES.USER),
        route: ROUTES.USER,
        roles: ['ADMIN']
      },
      {
        icon: FaUserAlt,
        id: 'Perfil',
        isActive: isActive(ROUTES.PROFILE),
        route: ROUTES.PROFILE,
        roles: ['CLIENTE', 'TECNICO']
      },
      {
        icon: FaMobileAlt,
        id: 'Dispositivos',
        isActive: isActive(ROUTES.DEVICE),
        route: ROUTES.DEVICE,
        roles: ['ADMIN', 'CLIENTE']
      },
      {
        icon: FaSignOutAlt,
        id: 'Cerrar sesión',
        isActive: isActive(ROUTES.LOGOUT),
        route: ROUTES.LOGOUT,
        roles: ['ADMIN', 'CLIENTE', 'TECNICO']
      }
    ],
    [isActive, role]
  );

  return { menuItems };
};

export default useNavbar;
