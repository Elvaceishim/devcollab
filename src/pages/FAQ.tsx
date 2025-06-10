import {
  Box,
  Container,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue
} from '@chakra-ui/react';

const FAQ = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const faqs = [
    {
      question: 'What is DevCollab?',
      answer: 'DevCollab is a modern developer workspace platform that helps teams collaborate more effectively. It provides tools for code sharing, project management, and team communication in one integrated platform.'
    },
    {
      question: 'How do I get started with DevCollab?',
      answer: 'Getting started is easy! Simply sign up for an account, create a workspace, and invite your team members. You can then start creating projects, sharing code, and collaborating with your team.'
    },
    {
      question: 'Is DevCollab free to use?',
      answer: 'DevCollab offers both free and premium plans. The free plan includes basic features suitable for small teams, while premium plans offer advanced features and larger storage capacity for growing teams.'
    },
    {
      question: 'How secure is my data on DevCollab?',
      answer: 'Security is our top priority. We use industry-standard encryption, regular security audits, and follow best practices to ensure your data is protected. All data is encrypted both in transit and at rest.'
    },
    {
      question: 'Can I integrate DevCollab with other tools?',
      answer: 'Yes! DevCollab offers integrations with popular development tools and services, including GitHub, GitLab, Slack, and more. Check our documentation for a complete list of available integrations.'
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'We offer comprehensive support through our documentation, community forums, and email support. Premium users also get access to priority support and dedicated account management.'
    }
  ];

  return (
    <Container maxW="container.xl" py={10}>
      <Box textAlign="center" mb={10}>
        <Heading as="h1" size="2xl" mb={4}>
          Frequently Asked Questions
        </Heading>
        <Text fontSize="xl" color={textColor} maxW="3xl" mx="auto">
          Find answers to common questions about DevCollab
        </Text>
      </Box>

      <Accordion allowMultiple>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} border="none" mb={4}>
            <Box
              bg={bgColor}
              rounded="lg"
              shadow="md"
              p={4}
            >
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading as="h3" size="md">
                    {faq.question}
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text color={textColor}>{faq.answer}</Text>
              </AccordionPanel>
            </Box>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};

export default FAQ; 