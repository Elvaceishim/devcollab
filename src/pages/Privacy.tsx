import React from 'react';

const Privacy: React.FC = () => {
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {section.title}
              </h2>
              <div className="text-gray-600 whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Privacy;