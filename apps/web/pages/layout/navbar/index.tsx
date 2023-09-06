import { useRouter } from 'next/router';
import { removeToken } from 'apps/web/services/auth';
import useNavbar from './hooks';
import { Box, Flex, Icon, Tooltip } from '@chakra-ui/react';
import { ROUTES } from 'apps/web/services/routing/routes/constants';

const Navbar = () => {
  const { menuItems } = useNavbar();
  const router = useRouter();

  const handleClick = (route:string) => {
    if (route === ROUTES.LOGOUT) {
      removeToken();
    }
    router.push(route);
  };

  return (
    <Flex as="nav" direction="row" alignItems="center" justifyContent="center">
      {menuItems.map(({ icon: IconComponent, id, isActive, route }) => (
        <Tooltip label={id} key={id} hasArrow>
          <Box mx={2} fontSize="2xl" cursor="pointer" onClick={()=>handleClick(route)} _hover={{ color: 'blue.500' }}>
            <Icon as={IconComponent} w={8} h={8}  />
          </Box>
        </Tooltip>
      ))}
    </Flex>
  );
};

export default Navbar;
