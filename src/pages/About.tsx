import { Box, Container, Heading, Text, VStack, SimpleGrid, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaCode, FaUsers, FaRocket, FaShieldAlt } from 'react-icons/fa';

const About = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const features = [
    {
      icon: FaCode,
      title: 'Developer-First Platform',
      description: 'Built by developers, for developers. Our platform understands the unique needs of software development teams.'
    },
    {
      icon: FaUsers,
      title: 'Collaborative Workspace',
      description: 'Seamlessly collaborate with your team members in real-time, share code, and manage projects efficiently.'
    },
    {
      icon: FaRocket,
      title: 'Fast & Efficient',
      description: 'Optimized for performance, ensuring your development workflow remains smooth and uninterrupted.'
    },
    {
      icon: FaShieldAlt,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with end-to-end encryption and regular security audits.'
    }
  ];

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" mb={10}>
          <Heading as="h1" size="2xl" mb={4}>
            About DevCollab
          </Heading>
          <Text fontSize="xl" color={textColor} maxW="3xl" mx="auto">
            DevCollab is a modern developer workspace platform designed to streamline collaboration
            and enhance productivity for development teams.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
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

        <Box mt={10}>
          <Heading as="h2" size="xl" mb={6}>
            Our Mission
          </Heading>
          <Text fontSize="lg" color={textColor} mb={4}>
            At DevCollab, we're on a mission to revolutionize how development teams collaborate.
            We believe that great software is built through effective collaboration, and we're
            committed to providing the tools that make this possible.
          </Text>
          <Text fontSize="lg" color={textColor}>
            Our platform combines powerful features with an intuitive interface, making it
            easier than ever for teams to work together, share knowledge, and deliver
            exceptional software.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default About; 