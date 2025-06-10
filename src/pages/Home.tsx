import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Image
} from '@chakra-ui/react';
import { FaCode, FaUsers, FaRocket, FaShieldAlt } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const features = [
    {
      icon: FaCode,
      title: 'Code Collaboration',
      description: 'Real-time code editing and collaboration with your team members.'
    },
    {
      icon: FaUsers,
      title: 'Team Management',
      description: 'Organize your team, manage roles, and track progress efficiently.'
    },
    {
      icon: FaRocket,
      title: 'Fast Development',
      description: 'Streamlined workflow for faster development and deployment.'
    },
    {
      icon: FaShieldAlt,
      title: 'Secure Platform',
      description: 'Enterprise-grade security with end-to-end encryption.'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={20}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="center" textAlign="center">
            <Heading
              as="h1"
              size="2xl"
              bgGradient="linear(to-r, blue.400, blue.600)"
              bgClip="text"
              fontWeight="extrabold"
            >
              Developer Workspace Platform
            </Heading>
            <Text fontSize="xl" color={textColor} maxW="2xl">
              Collaborate, code, and create together. DevCollab provides the tools you need
              to build amazing software with your team.
            </Text>
            <HStack spacing={4}>
              <Button
                as={RouterLink}
                to="/register"
                colorScheme="blue"
                size="lg"
                px={8}
              >
                Get Started
              </Button>
              <Button
                as={RouterLink}
                to="/about"
                variant="outline"
                size="lg"
                px={8}
              >
                Learn More
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={20}>
        <VStack spacing={12}>
          <Box textAlign="center">
            <Heading as="h2" size="xl" mb={4}>
              Why Choose DevCollab?
            </Heading>
            <Text fontSize="lg" color={textColor} maxW="2xl" mx="auto">
              Our platform is designed to make collaboration seamless and efficient
              for development teams of all sizes.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
            {features.map((feature, index) => (
              <Box
                key={index}
                p={6}
                bg={bgColor}
                rounded="lg"
                shadow="md"
                transition="transform 0.2s"
                _hover={{ transform: 'translateY(-5px)' }}
              >
                <Icon as={feature.icon} w={10} h={10} color="blue.500" mb={4} />
                <Heading as="h3" size="md" mb={2}>
                  {feature.title}
                </Heading>
                <Text color={textColor}>{feature.description}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* CTA Section */}
      <Box bg={useColorModeValue('blue.50', 'blue.900')} py={20}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="center" textAlign="center">
            <Heading as="h2" size="xl">
              Ready to Get Started?
            </Heading>
            <Text fontSize="lg" color={textColor} maxW="2xl">
              Join thousands of developers who are already using DevCollab to build
              amazing software together.
            </Text>
            <Button
              as={RouterLink}
              to="/register"
              colorScheme="blue"
              size="lg"
              px={8}
            >
              Sign Up Now
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 