import {
  Box,
  Button,
  Stack,
  useColorModeValue,
  useDisclosure,
  IconButton,
  HStack,
  useColorMode,
  Text
} from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <Box>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Box
          ml={{ base: -2 }}
          display={{ base: 'block', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          >
            {isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
          </IconButton>
        </Box>
        <div className="flex flex-1 items-center justify-center md:justify-start">
        <Box className="flex flex-1 items-center justify-center md:justify-start">
          <Text
            textAlign={useColorModeValue('left', 'center')}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
            as={RouterLink}
            to="/"
            fontSize="xl"
            fontWeight="bold"
          >
            DevCollab
          </Text>

          <Box display={{ base: 'none', md: 'block' }} ml={10}>
            <Stack direction={'row'} spacing={4}>
              <Button
                as={RouterLink}
                to="/about"
                variant={'ghost'}
                fontSize={'sm'}
                fontWeight={500}
              >
                About
              </Button>
              <Button
                as={RouterLink}
                to="/faq"
                variant={'ghost'}
                fontSize={'sm'}
                fontWeight={500}
              >
                FAQ
              </Button>
              <Button
                as={RouterLink}
                to="/contact"
                variant={'ghost'}
                fontSize={'sm'}
                fontWeight={500}
              >
                Contact
              </Button>
            </Stack>
          </Box>
        </Box>
        <Stack
        <Stack
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
            aria-label="Toggle color mode"
            onClick={toggleColorMode}
            variant="ghost"
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </IconButton>
          {user ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                {user.email}
              </MenuButton>
              <MenuList>
                <MenuItem as={RouterLink} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem value="signout" onClick={handleSignOut}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <HStack spacing={4}>
              <Button
                as={RouterLink}
                to="/login"
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
              >
                Sign In
              </Button>
              <Button
                as={RouterLink}
              <Button
                as={RouterLink}
                to="/register"
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'blue.400'}
                _hover={{
                  bg: 'blue.300',
                }}
              >
                Sign Up
              </Button>
        </Stack>
      </div>

      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'none' }}
        pb={4}
        px={4}
      >
        <Stack as={'nav'} spacing={4}>
          <Button
            as={RouterLink}
            to="/about"
            variant={'ghost'}
            fontSize={'sm'}
            fontWeight={500}
          >
            About
          </Button>
          <Button
            as={RouterLink}
            to="/faq"
            variant={'ghost'}
            fontSize={'sm'}
            fontWeight={500}
          >
            FAQ
          </Button>
          <Button
            as={RouterLink}
            to="/contact"
            variant={'ghost'}
            fontSize={'sm'}
            fontWeight={500}
          >
            Contact
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Navbar; 