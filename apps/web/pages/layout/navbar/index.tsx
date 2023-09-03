import { Box } from '@chakra-ui/react';
import useNavbar from './hooks';

const Navbar = () => {
  const { menuItems } = useNavbar();

  return (
    <Box as="nav">
      {menuItems.map(({ icon: Icon, id, isActive, route }) => (
        <Box
          key={id}
        >
          <Icon />
        </Box>
      ))}
    </Box>
  );
};

export default Navbar;
