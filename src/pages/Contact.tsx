import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  useColorModeValue,
  SimpleGrid,
  Icon
} from '@chakra-ui/react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      
      toast({
        title: 'Message sent!',
        description: "We'll get back to you soon.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: "Something went wrong. Please try again.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email',
      content: 'support@devcollab.com'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      content: '+1 (555) 123-4567'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Address',
      content: '123 Developer Way, Tech City, TC 12345'
    }
  ];

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" mb={10}>
          <Heading as="h1" size="2xl" mb={4}>
            Contact Us
          </Heading>
          <Text fontSize="xl" color={textColor} maxW="3xl" mx="auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={10}>
          {contactInfo.map((info, index) => (
            <Box
              key={index}
              p={6}
              bg={bgColor}
              rounded="lg"
              shadow="md"
              textAlign="center"
            >
              <Icon as={info.icon} w={8} h={8} color="blue.500" mb={4} />
              <Heading as="h3" size="md" mb={2}>
                {info.title}
              </Heading>
              <Text color={textColor}>{info.content}</Text>
            </Box>
          ))}
        </SimpleGrid>

        <Box
          as="form"
          onSubmit={handleSubmit}
          p={8}
          bg={bgColor}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Subject</FormLabel>
              <Input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={6}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="full"
              isLoading={isSubmitting}
            >
              Send Message
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Contact; 