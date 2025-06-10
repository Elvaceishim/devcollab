import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';

const Privacy = () => {
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const sections = [
    {
      title: 'Information We Collect',
      content: `We collect information that you provide directly to us, including:
      • Account information (name, email, password)
      • Profile information (avatar, bio, preferences)
      • Usage data (how you interact with our platform)
      • Communication data (messages, comments, feedback)`
    },
    {
      title: 'How We Use Your Information',
      content: `We use the information we collect to:
      • Provide, maintain, and improve our services
      • Process your transactions
      • Send you technical notices and support messages
      • Communicate with you about products, services, and events
      • Monitor and analyze trends and usage
      • Detect, prevent, and address technical issues`
    },
    {
      title: 'Information Sharing',
      content: `We do not sell your personal information. We may share your information with:
      • Service providers who perform services on our behalf
      • Business partners with your consent
      • Legal authorities when required by law
      • Other users as part of the platform's functionality`
    },
    {
      title: 'Data Security',
      content: `We implement appropriate technical and organizational measures to protect your personal information, including:
      • Encryption of data in transit and at rest
      • Regular security assessments
      • Access controls and authentication
      • Secure data storage and backup procedures`
    },
    {
      title: 'Your Rights',
      content: `You have the right to:
      • Access your personal information
      • Correct inaccurate data
      • Request deletion of your data
      • Object to processing of your data
      • Export your data
      • Withdraw consent at any time`
    },
    {
      title: 'Cookies and Tracking',
      content: `We use cookies and similar tracking technologies to:
      • Remember your preferences
      • Understand how you use our platform
      • Improve our services
      • Provide personalized content
      You can control cookie settings through your browser preferences.`
    },
    {
      title: 'Changes to This Policy',
      content: `We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.`
    },
    {
      title: 'Contact Us',
      content: `If you have any questions about this privacy policy, please contact us at:
      Email: privacy@devcollab.com
      Address: 123 Developer Way, Tech City, TC 12345`
    }
  ];

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" mb={10}>
          <Heading as="h1" size="2xl" mb={4}>
            Privacy Policy
          </Heading>
          <Text fontSize="xl" color={textColor} maxW="3xl" mx="auto">
            Last Updated: {new Date().toLocaleDateString()}
          </Text>
        </Box>

        {sections.map((section, index) => (
          <Box key={index} mb={8}>
            <Heading as="h2" size="xl" mb={4}>
              {section.title}
            </Heading>
            <Text
              color={textColor}
              fontSize="lg"
              whiteSpace="pre-line"
            >
              {section.content}
            </Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Privacy; 