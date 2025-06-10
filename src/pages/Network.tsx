import React from 'react';
import { Box, Container, Heading, Text, SimpleGrid, Card, CardBody, Button, HStack, VStack, Avatar, Badge } from '@chakra-ui/react';
import { Code2, Users, Star, MapPin } from 'lucide-react';

const Network = () => {
  return (
    <Box minH="100vh" bgGradient="linear(to-br, primary.50, white, secondary.50)">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center" mb={8}>
            <Heading
              as="h1"
              size="2xl"
              bgGradient="linear(to-r, primary.600, secondary.600)"
              bgClip="text"
              mb={4}
            >
              Developer Network
            </Heading>
            <Text fontSize="xl" color="gray.600">
              Connect with developers, share skills, and grow your professional network.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {/* Developer Cards */}
            <Card
              bg="white"
              borderRadius="xl"
              boxShadow="xl"
              _hover={{ transform: 'translateY(-4px)', transition: 'all 0.3s' }}
            >
              <CardBody>
                <VStack align="stretch" spacing={4}>
                  <HStack spacing={4}>
                    <Avatar
                      size="lg"
                      name="Sarah Chen"
                      src="https://bit.ly/sarah-chen"
                    />
                    <VStack align="start" spacing={1}>
                      <Heading size="md">Sarah Chen</Heading>
                      <Text color="gray.600">Full Stack Developer</Text>
                      <HStack>
                        <MapPin size={16} />
                        <Text fontSize="sm">San Francisco, CA</Text>
                      </HStack>
                    </VStack>
                  </HStack>

                  <HStack wrap="wrap" spacing={2}>
                    <Badge colorScheme="purple">React</Badge>
                    <Badge colorScheme="blue">Node.js</Badge>
                    <Badge colorScheme="green">Python</Badge>
                    <Badge colorScheme="orange">AWS</Badge>
                  </HStack>

                  <Text color="gray.600" noOfLines={2}>
                    Passionate about building scalable web applications and mentoring junior developers.
                  </Text>

                  <Button
                    bgGradient="linear(to-r, primary.600, secondary.600)"
                    color="white"
                    _hover={{
                      bgGradient: "linear(to-r, primary.700, secondary.700)",
                    }}
                  >
                    Connect
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Network;