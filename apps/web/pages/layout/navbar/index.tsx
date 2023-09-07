import { useRouter } from 'next/router';
import { removeToken } from 'apps/web/services/auth';
import useNavbar from './hooks';
import { Box, Flex, Icon, Image, Text, Tooltip } from '@chakra-ui/react';
import { ROUTES } from 'apps/web/services/routing/routes/constants';

interface NavbarProps {
  role: string;
}

const Navbar = ({role}: NavbarProps) => {
  const { menuItems } = useNavbar(role);
  const router = useRouter();

  const handleClick = (route: string) => {
    if (route === ROUTES.LOGOUT) {
      removeToken();
    }
    router.push(route);
  };

  return (
    <Flex gap={2} paddingTop={5} justifyContent="center"> 
        {menuItems.filter(item => item.roles.includes(role)).map(({ icon: IconComponent, id, isActive, route }) => (
          <Tooltip label={id} key={id} hasArrow>
            <Box mx={2} fontSize="2xl" cursor="pointer" onClick={() => handleClick(route)} _hover={{ color: 'blue.500' }}>
              <Icon as={IconComponent} w={8} h={8} />
            </Box>
          </Tooltip>
        ))}
    </Flex>
  );
  
};

export default Navbar;
