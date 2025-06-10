import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Link,
  IconButton,
  HStack
} from '@chakra-ui/react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW="6xl"
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© 2024 DevCollab. All rights reserved</Text>
        <Stack direction="row" spacing={6}>
          <Link as={RouterLink} to="/about">About</Link>
          <Link as={RouterLink} to="/faq">FAQ</Link>
          <Link as={RouterLink} to="/contact">Contact</Link>
          <Link as={RouterLink} to="/privacy">Privacy</Link>
        </Stack>
        <HStack spacing={4}>
          <IconButton
            aria-label="GitHub"
            icon={<FaGithub />}
            variant="ghost"
            onClick={() => window.open('https://github.com', '_blank')}
          />
          <IconButton
            aria-label="Twitter"
            icon={<FaTwitter />}
            variant="ghost"
            onClick={() => window.open('https://twitter.com', '_blank')}
          />
          <IconButton
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
            variant="ghost"
            onClick={() => window.open('https://linkedin.com', '_blank')}
          />
        </HStack>
      </Container>
    </Box>
  );
};

export default Footer; 