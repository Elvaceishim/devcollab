import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about DevCollab
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;