import React, { useState } from 'react';
import { Target, ArrowRight, CheckCircle } from 'lucide-react';
import { MatchmakingQuiz as Quiz, QuizQuestion } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import Button from '../common/Button';
import Card from '../common/Card';

const MatchmakingQuiz: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { getProjectRecommendations } = useData();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const quiz: Quiz = {
    id: 'matchmaking-v1',
    title: 'Find Your Perfect Project Match',
    description: 'Answer a few questions to get personalized project recommendations',
    questions: [
      {
        id: 'experience',
        question: 'What\'s your current experience level?',
        type: 'multiple-choice',
        options: ['Junior (0-2 years)', 'Mid-level (2-5 years)', 'Senior (5+ years)', 'Lead/Architect (8+ years)'],
        required: true
      },
      {
        id: 'interests',
        question: 'What type of projects interest you most?',
        type: 'multiple-choice',
        options: ['Web Applications', 'Mobile Apps', 'AI/Machine Learning', 'Blockchain/Web3', 'DevOps/Infrastructure', 'Games', 'Open Source Tools'],
        required: true
      },
      {
        id: 'commitment',
        question: 'How much time can you commit per week?',
        type: 'multiple-choice',
        options: ['5-10 hours (Part-time)', '10-20 hours (Significant)', '20+ hours (Full-time)', 'Flexible/Variable'],
        required: true
      },
      {
        id: 'teamSize',
        question: 'What team size do you prefer?',
        type: 'multiple-choice',
        options: ['Solo (1-2 people)', 'Small team (3-5 people)', 'Medium team (6-10 people)', 'Large team (10+ people)'],
        required: true
      },
      {
        id: 'motivation',
        question: 'What motivates you most?',
        type: 'multiple-choice',
        options: ['Learning new technologies', 'Building portfolio', 'Earning money', 'Making impact', 'Networking'],
        required: true
      },
      {
        id: 'workStyle',
        question: 'How do you prefer to work?',
        type: 'multiple-choice',
        options: ['Structured with clear deadlines', 'Flexible and creative', 'Fast-paced and agile', 'Research and experimentation'],
        required: true
      }
    ]
  };

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [quiz.questions[currentQuestion].id]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    const quizResult = {
      id: Math.random().toString(36).substr(2, 9),
      quizType: 'matchmaking' as const,
      answers,
      recommendations: generateRecommendations(),
      completedAt: new Date().toISOString()
    };

    if (user) {
      const updatedQuizResults = [...(user.quizResults || []), quizResult];
      updateProfile({ quizResults: updatedQuizResults });
    }

    setRecommendations(quizResult.recommendations || []);
    setIsCompleted(true);
  };

  const generateRecommendations = (): string[] => {
    const recs: string[] = [];
    
    // Based on experience level
    if (answers.experience?.includes('Junior')) {
      recs.push('Look for "Beginner-friendly" projects with good documentation');
      recs.push('Consider contributing to open source projects to build your portfolio');
    } else if (answers.experience?.includes('Senior')) {
      recs.push('Consider leading a project or mentoring junior developers');
      recs.push('Look for complex, challenging projects that match your expertise');
    }

    // Based on interests
    if (answers.interests?.includes('AI/Machine Learning')) {
      recs.push('Search for projects tagged with "Machine Learning", "AI", or "Data Science"');
    }
    if (answers.interests?.includes('Web Applications')) {
      recs.push('Look for React, Vue, or Angular projects');
    }

    // Based on commitment
    if (answers.commitment?.includes('Part-time')) {
      recs.push('Filter for projects with "part-time" or "flexible" time commitment');
    }

    // Based on motivation
    if (answers.motivation?.includes('Earning money')) {
      recs.push('Focus on "Freelance" and "Startup" project types');
    } else if (answers.motivation?.includes('Learning')) {
      recs.push('Look for projects using technologies you want to learn');
    }

    return recs;
  };

  if (!user) {
    return (
      <Card className="p-8 text-center">
        <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign in Required</h3>
        <p className="text-gray-600">Please sign in to take the matchmaking quiz</p>
      </Card>
    );
  }

  if (isCompleted) {
    return (
      <Card className="p-8">
        <div className="text-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
          <p className="text-gray-600">Here are your personalized recommendations:</p>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700">{rec}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button onClick={() => window.location.href = '/dashboard'}>
            Browse Projects
          </Button>
        </div>
      </Card>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{quiz.title}</h2>
          <span className="text-sm text-gray-500">
            {currentQuestion + 1} of {quiz.questions.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h3>
        
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                answers[question.id] === option
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  answers[question.id] === option
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-gray-300'
                }`}>
                  {answers[question.id] === option && (
                    <div className="w-full h-full rounded-full bg-white scale-50" />
                  )}
                </div>
                <span className="text-gray-900">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        
        <Button
          onClick={nextQuestion}
          disabled={!answers[question.id]}
          className="flex items-center space-x-2"
        >
          <span>{currentQuestion === quiz.questions.length - 1 ? 'Complete' : 'Next'}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default MatchmakingQuiz;