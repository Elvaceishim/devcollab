import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
  useDisclosure,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  Text
} from '@chakra-ui/react';
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
      <Flex
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
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
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

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
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
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />
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
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
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
            </HStack>
          )}
        </Stack>
      </Flex>

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