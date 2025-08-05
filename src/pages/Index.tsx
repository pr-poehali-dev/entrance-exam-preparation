import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Типы данных
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

interface TestResult {
  id: number;
  date: string;
  score: number;
  totalQuestions: number;
  category: string;
  timeSpent: number;
}

const Index = () => {
  // Состояние приложения
  const [currentView, setCurrentView] = useState<'dashboard' | 'test' | 'results'>('dashboard');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [testStartTime, setTestStartTime] = useState<number>(0);
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);

  // Примеры вопросов
  const questions: Question[] = [
    {
      id: 1,
      question: "Какой элемент в HTML используется для создания заголовка первого уровня?",
      options: ["<title>", "<h1>", "<header>", "<head>"],
      correctAnswer: 1,
      explanation: "Элемент <h1> используется для создания заголовка первого уровня в HTML. Это самый важный заголовок на странице.",
      category: "HTML"
    },
    {
      id: 2,
      question: "Какое свойство CSS используется для изменения цвета текста?",
      options: ["text-color", "font-color", "color", "text-style"],
      correctAnswer: 2,
      explanation: "Свойство 'color' в CSS используется для изменения цвета текста элемента.",
      category: "CSS"
    },
    {
      id: 3,
      question: "Какой метод JavaScript используется для добавления элемента в конец массива?",
      options: ["append()", "push()", "add()", "insert()"],
      correctAnswer: 1,
      explanation: "Метод push() добавляет один или несколько элементов в конец массива и возвращает новую длину массива.",
      category: "JavaScript"
    },
    {
      id: 4,
      question: "Что означает аббревиатура CSS?",
      options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
      correctAnswer: 1,
      explanation: "CSS расшифровывается как Cascading Style Sheets (каскадные таблицы стилей).",
      category: "CSS"
    },
    {
      id: 5,
      question: "Какой тег HTML используется для создания ссылки?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correctAnswer: 1,
      explanation: "Тег <a> (anchor) используется для создания гиперссылок в HTML.",
      category: "HTML"
    }
  ];

  // История тестов
  const [testHistory, setTestHistory] = useState<TestResult[]>([
    {
      id: 1,
      date: "2024-01-15",
      score: 8,
      totalQuestions: 10,
      category: "HTML/CSS",
      timeSpent: 12
    },
    {
      id: 2,
      date: "2024-01-14",
      score: 6,
      totalQuestions: 8,
      category: "JavaScript",
      timeSpent: 15
    },
    {
      id: 3,
      date: "2024-01-13",
      score: 9,
      totalQuestions: 10,
      category: "HTML/CSS",
      timeSpent: 10
    }
  ]);

  // Статистика
  const totalTests = testHistory.length;
  const avgScore = testHistory.reduce((sum, test) => sum + (test.score / test.totalQuestions * 100), 0) / totalTests;
  const bestScore = Math.max(...testHistory.map(test => test.score / test.totalQuestions * 100));

  // Функция начала теста
  const startTest = () => {
    setCurrentView('test');
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setTestStartTime(Date.now());
    setCurrentAnswer(null);
  };

  // Функция ответа на вопрос
  const handleAnswer = (answerIndex: number) => {
    setCurrentAnswer(answerIndex);
  };

  // Функция перехода к следующему вопросу
  const nextQuestion = () => {
    if (currentAnswer !== null) {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestionIndex] = currentAnswer;
      setSelectedAnswers(newAnswers);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentAnswer(null);
      } else {
        finishTest(newAnswers);
      }
    }
  };

  // Функция завершения теста
  const finishTest = (answers: number[]) => {
    const score = answers.reduce((total, answer, index) => {
      return total + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);

    const timeSpent = Math.round((Date.now() - testStartTime) / 1000 / 60);
    
    const newResult: TestResult = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      score,
      totalQuestions: questions.length,
      category: "Смешанный",
      timeSpent
    };

    setTestHistory([newResult, ...testHistory]);
    setCurrentView('results');
    setShowResults(true);
  };

  // Функция возврата к дашборду
  const backToDashboard = () => {
    setCurrentView('dashboard');
    setShowResults(false);
  };

  // Рендер дашборда
  const renderDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Платформа подготовки к экзаменам
          </h1>
          <p className="text-lg text-gray-600">
            Проверьте свои знания и отслеживайте прогресс
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Icon name="Target" size={24} className="text-primary" />
                Средний балл
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {avgScore.toFixed(1)}%
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Icon name="Trophy" size={24} className="text-yellow-500" />
                Лучший результат
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-500">
                {bestScore.toFixed(1)}%
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Icon name="BookOpen" size={24} className="text-green-500" />
                Тестов пройдено
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">
                {totalTests}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Кнопка начала теста */}
        <div className="text-center mb-8">
          <Button onClick={startTest} size="lg" className="px-12 py-4 text-lg">
            <Icon name="Play" size={24} className="mr-2" />
            Начать новый тест
          </Button>
        </div>

        {/* История тестов */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="History" size={24} />
              История тестов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testHistory.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="FileText" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{test.category}</div>
                      <div className="text-sm text-gray-500">{test.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">
                      {test.score}/{test.totalQuestions}
                    </div>
                    <div className="text-sm text-gray-500">
                      {test.timeSpent} мин
                    </div>
                  </div>
                  <Badge variant={test.score / test.totalQuestions >= 0.8 ? "default" : "secondary"}>
                    {((test.score / test.totalQuestions) * 100).toFixed(0)}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Рендер теста
  const renderTest = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Button variant="outline" onClick={backToDashboard}>
                  <Icon name="ArrowLeft" size={20} className="mr-2" />
                  Назад
                </Button>
                <Badge variant="secondary">
                  {currentQuestionIndex + 1} из {questions.length}
                </Badge>
              </div>
              <Progress value={progress} className="mb-4" />
              <CardTitle className="text-xl">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={currentAnswer?.toString()} onValueChange={(value) => handleAnswer(parseInt(value))}>
                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="cursor-pointer text-base flex-1 p-3 rounded-lg hover:bg-gray-50">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
              
              <div className="mt-8 flex justify-end">
                <Button 
                  onClick={nextQuestion} 
                  disabled={currentAnswer === null}
                  size="lg"
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Завершить тест' : 'Следующий'}
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Рендер результатов
  const renderResults = () => {
    const score = selectedAnswers.reduce((total, answer, index) => {
      return total + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    const percentage = (score / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Результаты теста */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Результаты теста</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-6xl font-bold text-primary mb-4">
                {percentage.toFixed(0)}%
              </div>
              <div className="text-xl text-gray-600 mb-6">
                {score} из {questions.length} правильных ответов
              </div>
              <Button onClick={backToDashboard} size="lg">
                <Icon name="Home" size={20} className="mr-2" />
                Вернуться к дашборду
              </Button>
            </CardContent>
          </Card>

          {/* Разбор ответов */}
          <Card>
            <CardHeader>
              <CardTitle>Разбор ответов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {questions.map((question, index) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div key={question.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start gap-3 mb-3">
                        <Badge variant={isCorrect ? "default" : "destructive"}>
                          {index + 1}
                        </Badge>
                        <div className="flex-1">
                          <h3 className="font-medium mb-2">{question.question}</h3>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div 
                                key={optionIndex}
                                className={`p-3 rounded-lg border ${
                                  optionIndex === question.correctAnswer 
                                    ? 'bg-green-50 border-green-200' 
                                    : optionIndex === userAnswer && !isCorrect
                                    ? 'bg-red-50 border-red-200'
                                    : 'bg-gray-50 border-gray-200'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {optionIndex === question.correctAnswer && (
                                    <Icon name="Check" size={16} className="text-green-600" />
                                  )}
                                  {optionIndex === userAnswer && !isCorrect && (
                                    <Icon name="X" size={16} className="text-red-600" />
                                  )}
                                  <span>{option}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-start gap-2">
                              <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
                              <div>
                                <strong className="text-blue-900">Объяснение:</strong>
                                <div className="text-blue-800">{question.explanation}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Основной рендер
  return (
    <>
      {currentView === 'dashboard' && renderDashboard()}
      {currentView === 'test' && renderTest()}
      {currentView === 'results' && renderResults()}
    </>
  );
};

export default Index;