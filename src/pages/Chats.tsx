import React from 'react';
import { Box, Container, Heading, Text, Grid, GridItem, VStack, HStack, Avatar, Input, Button, Card, CardBody } from '@chakra-ui/react';
import { Send, Search, Users } from 'lucide-react';

const Chats = () => {
  return (
    <Box minH="100vh" bgGradient="linear(to-br, primary.50, white, secondary.50)">
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns={{ base: '1fr', lg: '300px 1fr' }} gap={6}>
          {/* Sidebar */}
          <GridItem>
            <Card bg="white" borderRadius="xl" boxShadow="xl">
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Heading size="md" bgGradient="linear(to-r, primary.600, secondary.600)" bgClip="text">
                    Conversations
                  </Heading>
                  
                  <HStack>
                    <Input
                      placeholder="Search chats..."
                      size="sm"
                      borderRadius="lg"
                      bg="gray.50"
                    />
                    <Button
                      size="sm"
                      bgGradient="linear(to-r, primary.600, secondary.600)"
                      color="white"
                      _hover={{
                        bgGradient: "linear(to-r, primary.700, secondary.700)",
                      }}
                    >
                      <Search size={16} />
                    </Button>
                  </HStack>

                  {/* Chat List */}
                  <VStack spacing={3} align="stretch">
                    <HStack
                      p={3}
                      borderRadius="lg"
                      _hover={{ bg: 'gray.50' }}
                      cursor="pointer"
                    >
                      <Avatar size="sm" name="Team Alpha" />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="medium">Team Alpha</Text>
                        <Text fontSize="sm" color="gray.500">Last message...</Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>

          {/* Chat Area */}
          <GridItem>
            <Card bg="white" borderRadius="xl" boxShadow="xl" h="calc(100vh - 100px)">
              <CardBody>
                <VStack h="full" spacing={4}>
                  {/* Chat Header */}
                  <HStack w="full" p={4} borderBottom="1px" borderColor="gray.100">
                    <Avatar size="md" name="Team Alpha" />
                    <VStack align="start" spacing={0}>
                      <Heading size="md">Team Alpha</Heading>
                      <Text fontSize="sm" color="gray.500">5 members</Text>
                    </VStack>
                  </HStack>

                  {/* Messages Area */}
                  <Box flex={1} w="full" overflowY="auto">
                    {/* Messages will go here */}
                  </Box>

                  {/* Message Input */}
                  <HStack w="full" p={4} borderTop="1px" borderColor="gray.100">
                    <Input
                      placeholder="Type a message..."
                      size="lg"
                      borderRadius="lg"
                      bg="gray.50"
                    />
                    <Button
                      size="lg"
                      bgGradient="linear(to-r, primary.600, secondary.600)"
                      color="white"
                      _hover={{
                        bgGradient: "linear(to-r, primary.700, secondary.700)",
                      }}
                    >
                      <Send size={20} />
                    </Button>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Chats; 