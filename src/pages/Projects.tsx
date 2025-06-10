import { Box, Container, Heading, Text, SimpleGrid, Card, CardBody, Button, HStack, VStack, Badge } from '@chakra-ui/react';
import { Users, Star, Clock } from 'lucide-react';

const Projects = () => {
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
              Collaborative Projects
            </Heading>
            <Text fontSize="xl" color="gray.600">
              Join exciting projects or create your own. Collaborate with developers worldwide.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {/* Project Cards */}
            <Card
              bg="white"
              borderRadius="xl"
              boxShadow="xl"
              _hover={{ transform: 'translateY(-4px)', transition: 'all 0.3s' }}
            >
              <CardBody>
                <VStack align="stretch" spacing={4}>
                  <HStack justify="space-between">
                    <Badge colorScheme="purple" px={3} py={1} borderRadius="full">
                      Open Source
                    </Badge>
                    <HStack>
                      <Star color="yellow.500" />
                      <Text>4.8</Text>
                    </HStack>
                  </HStack>
                  
                  <Heading size="md">AI-Powered Code Review</Heading>
                  <Text color="gray.600">
                    Building an AI system to automate code reviews and suggest improvements.
                  </Text>
                  
                  <HStack spacing={4}>
                    <HStack>
                      <Users />
                      <Text>5/8</Text>
                    </HStack>
                    <HStack>
                      <Clock />
                      <Text>2 months</Text>
                    </HStack>
                  </HStack>

                  <Button
                    bgGradient="linear(to-r, primary.600, secondary.600)"
                    color="white"
                    _hover={{
                      bgGradient: "linear(to-r, primary.700, secondary.700)",
                    }}
                  >
                    View Project
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

export default Projects; 