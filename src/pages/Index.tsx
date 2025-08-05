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

  // Вопросы по строительству и информационным технологиям
  const questions: Question[] = [
    {
      id: 1,
      question: "Что включает в себя управление информацией в строительном проекте?",
      options: [
        "Только сбор данных о строительных материалах.",
        "Организацию и управление данными, связанными со строительным проектом: сбор, хранение, обработку и передачу информации между участниками проекта, а также использование информационных технологий для координации и контроля строительных работ.",
        "Исключительно передачу информации заказчику.",
        "Только хранение документации в бумажном виде."
      ],
      correctAnswer: 1,
      explanation: "Управление информацией в строительстве — это комплексный процесс, включающий сбор, хранение, обработку и передачу данных между всеми участниками проекта с использованием современных информационных технологий.",
      category: "Управление информацией"
    },
    {
      id: 2,
      question: "Какие процессы связаны с управлением данными в строительстве?",
      options: [
        "Только процесс составления смет.",
        "Сбор и систематизация данных на всех этапах жизненного цикла объекта, структурирование данных и внесение их в информационную модель, документирование и архивация, обновление и корректировка информации в процессе реализации проекта.",
        "Только процесс передачи данных в надзорные органы.",
        "Процессы, не связанные с анализом и обработкой данных."
      ],
      correctAnswer: 1,
      explanation: "Управление данными в строительстве охватывает весь жизненный цикл объекта: от сбора первичных данных до их архивации и обновления в процессе эксплуатации.",
      category: "Управление данными"
    },
    {
      id: 3,
      question: "Что такое BIM-технологии и как они применяются в строительстве?",
      options: [
        "Технологии, не связанные со строительством.",
        "Технологии, которые позволяют создавать и использовать единую цифровую модель объекта строительства. Они применяются для визуализации и анализа объектов, оптимизации процессов проектирования и строительства, управления информацией на всех этапах жизненного цикла объекта.",
        "Методы расчёта нагрузки на фундамент.",
        "Системы для автоматического составления смет."
      ],
      correctAnswer: 1,
      explanation: "BIM (Building Information Modeling) — это технология создания и использования единой цифровой модели объекта, которая содержит всю необходимую информацию о конструкции, материалах, инженерных системах и других параметрах объекта.",
      category: "BIM-технологии"
    },
    {
      id: 4,
      question: "В чём преимущество использования облачных вычислений в строительстве?",
      options: [
        "Они требуют значительных локальных вычислительных мощностей.",
        "Они позволяют упростить обмен информацией между участниками проекта, обеспечить доступ к данным и приложениям из любой точки мира, снизить затраты на приобретение и обслуживание собственного серверного оборудования, гибко масштабировать вычислительные ресурсы.",
        "Облачные вычисления применимы только в IT-сфере.",
        "Их использование приводит к увеличению затрат на инфраструктуру."
      ],
      correctAnswer: 1,
      explanation: "Облачные вычисления в строительстве обеспечивают гибкость, экономию на оборудовании и возможность удаленной работы с проектными данными для всех участников проекта.",
      category: "Облачные технологии"
    },
    {
      id: 5,
      question: "Какие задачи позволяют решать информационные модели объектов капитального строительства?",
      options: [
        "Только расчёт стоимости строительства.",
        "Визуализация проекта, анализ коллизий между элементами проекта, расчёт объёмов работ и материалов, оптимизация проектных решений, подготовка проектной документации, координация работы подрядчиков, управление объектом на всех этапах жизненного цикла.",
        "Только создание 3D-моделей зданий.",
        "Только контроль соблюдения строительных норм."
      ],
      correctAnswer: 1,
      explanation: "Информационные модели объектов строительства решают широкий спектр задач на всех этапах жизненного цикла — от проектирования до эксплуатации и демонтажа объекта.",
      category: "Информационное моделирование"
    },
    {
      id: 6,
      question: "Что такое системный анализ в строительстве?",
      options: [
        "Процесс изучения отдельных компонентов без учёта их взаимодействия.",
        "Процесс исследования и оценки строительных систем с целью выявления их свойств, структуры и поведения для оптимизации процессов проектирования и строительства.",
        "Анализ только информационных систем.",
        "Процесс, используемый только в сфере IT."
      ],
      correctAnswer: 1,
      explanation: "Системный анализ в строительстве позволяет комплексно исследовать строительные системы, учитывая их многогранность и сложность для достижения поставленных целей.",
      category: "Системный анализ"
    },
    {
      id: 7,
      question: "Какие общие требования предъявляются к современным вычислительным системам?",
      options: [
        "Только увеличение объёма оперативной памяти.",
        "Повышение быстродействия и снижение стоимости арифметических операций и единицы памяти, разработка программных средств общения с ЭВМ, возможность решения сложных прикладных и математических задач.",
        "Отсутствие необходимости в программных средствах.",
        "Ограничение возможностей решения сложных задач."
      ],
      correctAnswer: 1,
      explanation: "Современные вычислительные системы должны обеспечивать высокое быстродействие при низкой стоимости, иметь удобные средства взаимодействия и возможность решения сложных задач.",
      category: "Вычислительные системы"
    },
    {
      id: 8,
      question: "Что такое архитектура компьютерных сетей?",
      options: [
        "Совокупность только физических компонентов сети.",
        "Сложная структура, которая включает различные сервисы и протоколы для обеспечения работы Интернета и других глобальных сервисов, элементы сети, средства объединения устройств, системы адресации и механизмы управления.",
        "Набор правил для работы с локальными сетями.",
        "Система, не включающая механизмы управления."
      ],
      correctAnswer: 1,
      explanation: "Архитектура компьютерных сетей представляет собой комплексную структуру, объединяющую различные компоненты и технологии для обеспечения эффективного взаимодействия между устройствами.",
      category: "Сетевые технологии"
    },
    {
      id: 9,
      question: "Как автоматизированные системы помогают в управлении ресурсами и процессами?",
      options: [
        "Не оказывают никакого влияния.",
        "Помогают повысить эффективность и точность работы, сократить время на выполнение рутинных задач, уменьшить вероятность ошибок, оптимизировать использование материалов, техники и рабочей силы.",
        "Используются только для учёта рабочего времени.",
        "Помогают только в планировании закупок."
      ],
      correctAnswer: 1,
      explanation: "Автоматизированные системы значительно повышают эффективность управления за счет автоматизации рутинных процессов, снижения ошибок и оптимизации использования ресурсов.",
      category: "Автоматизация"
    },
    {
      id: 10,
      question: "В чём роль систем искусственного интеллекта в управлении строительством?",
      options: [
        "ИИ не используется в строительной отрасли.",
        "ИИ помогает анализировать большие объёмы данных, оптимизировать проектные и строительные процессы, прогнозировать результаты, оценивать риски, предоставлять рекомендации по выбору стратегий, автоматизировать часть проектных работ.",
        "Системы ИИ применяются только для создания 3D-моделей.",
        "Роль ИИ ограничивается обработкой финансовых отчётов."
      ],
      correctAnswer: 1,
      explanation: "Искусственный интеллект в строительстве обеспечивает интеллектуальную поддержку принятия решений, автоматизацию сложных процессов и повышение эффективности управления проектами.",
      category: "Искусственный интеллект"
    },
    {
      id: 11,
      question: "Что такое реляционная модель данных?",
      options: [
        "Способ организации данных в виде графов.",
        "Способ организации и хранения данных, основанный на математических принципах реляционной алгебры; данные представляются в виде таблиц. Для работы с реляционными базами данных используется язык SQL.",
        "Иерархическая структура данных.",
        "Сетевая модель данных."
      ],
      correctAnswer: 1,
      explanation: "Реляционная модель представляет данные в виде связанных таблиц и использует SQL для выполнения запросов, что обеспечивает эффективное управление информацией.",
      category: "Базы данных"
    },
    {
      id: 12,
      question: "Какие меры используются для обеспечения информационной безопасности?",
      options: [
        "Никаких мер не используется.",
        "Технические меры (шифрование, аутентификация, контроль доступа), архивирование и резервирование информации, создание защитных атрибутов и защищённых сетевых соединений, антивирусная защита, классификация угроз и рисков.",
        "Только установка паролей на компьютеры.",
        "Только физическое ограничение доступа в серверные помещения."
      ],
      correctAnswer: 1,
      explanation: "Информационная безопасность обеспечивается комплексом технических и организационных мер, включающих шифрование, аутентификацию, контроль доступа и защиту от различных угроз.",
      category: "Информационная безопасность"
    },
    {
      id: 13,
      question: "Что такое объектно-ориентированный подход в программировании?",
      options: [
        "Подход, который рассматривает программу как набор команд.",
        "Подход, который рассматривает программу в качестве набора объектов, взаимодействующих между собой. Основные понятия: абстракция, инкапсуляция, наследование, полиморфизм.",
        "Подход, который использует только математические алгоритмы.",
        "Подход, основанный на использовании только готовых библиотек."
      ],
      correctAnswer: 1,
      explanation: "Объектно-ориентированное программирование основано на концепции объектов и классов, что позволяет создавать более структурированный и поддерживаемый код.",
      category: "Программирование"
    },
    {
      id: 14,
      question: "Что такое локальная сеть и как она организуется?",
      options: [
        "Сеть, которая объединяет компьютеры в разных странах.",
        "Сеть, которая состоит из ряда элементов, обеспечивающих взаимодействие между компьютерами и другими устройствами; использует систему адресации для идентификации устройств и передачи данных, позволяет совместно использовать ресурсы.",
        "Сеть только для подключения принтеров.",
        "Сеть без использования технологий и средств объединения устройств."
      ],
      correctAnswer: 1,
      explanation: "Локальная сеть объединяет устройства в ограниченной географической области и обеспечивает совместное использование ресурсов и обмен данными между участниками сети.",
      category: "Локальные сети"
    },
    {
      id: 15,
      question: "Как информационная модель облегчает совместную работу участников строительного проекта?",
      options: [
        "Усложняет обмен документацией между участниками.",
        "Обеспечивает доступ всех участников проекта к актуальным данным, способствует согласованности решений и снижению количества ошибок, улучшает координацию между различными этапами проекта, сокращает время на обмен документацией.",
        "Ограничивает доступ к проектной документации.",
        "Не влияет на процесс совместной работы."
      ],
      correctAnswer: 1,
      explanation: "Единая информационная модель обеспечивает всем участникам проекта доступ к актуальной информации, что значительно улучшает координацию работ и снижает количество ошибок.",
      category: "Совместная работа"
    }
  ];

  // История тестов
  const [testHistory, setTestHistory] = useState<TestResult[]>([
    {
      id: 1,
      date: "2024-01-15",
      score: 12,
      totalQuestions: 15,
      category: "Информационные технологии в строительстве",
      timeSpent: 18
    },
    {
      id: 2,
      date: "2024-01-14",
      score: 10,
      totalQuestions: 12,
      category: "BIM-технологии",
      timeSpent: 15
    },
    {
      id: 3,
      date: "2024-01-13",
      score: 14,
      totalQuestions: 15,
      category: "Управление данными",
      timeSpent: 20
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
      category: "Информационные технологии в строительстве",
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
            Подготовка к экзамену по информационным технологиям в строительстве
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
            Начать тест ({questions.length} вопросов)
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
        <div className="max-w-4xl mx-auto">
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
              <div className="mb-2">
                <Badge variant="outline" className="text-xs">
                  {currentQuestion.category}
                </Badge>
              </div>
              <CardTitle className="text-xl leading-relaxed">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={currentAnswer?.toString()} onValueChange={(value) => handleAnswer(parseInt(value))}>
                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mt-1" />
                      <Label htmlFor={`option-${index}`} className="cursor-pointer text-base flex-1 p-3 rounded-lg hover:bg-gray-50 leading-relaxed">
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
                          <div className="mb-2">
                            <Badge variant="outline" className="text-xs mb-2">
                              {question.category}
                            </Badge>
                          </div>
                          <h3 className="font-medium mb-3 leading-relaxed">{question.question}</h3>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div 
                                key={optionIndex}
                                className={`p-3 rounded-lg border text-sm leading-relaxed ${
                                  optionIndex === question.correctAnswer 
                                    ? 'bg-green-50 border-green-200' 
                                    : optionIndex === userAnswer && !isCorrect
                                    ? 'bg-red-50 border-red-200'
                                    : 'bg-gray-50 border-gray-200'
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  {optionIndex === question.correctAnswer && (
                                    <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                  )}
                                  {optionIndex === userAnswer && !isCorrect && (
                                    <Icon name="X" size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                                  )}
                                  <span>{option}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-start gap-2">
                              <Icon name="Info" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                              <div className="text-sm">
                                <strong className="text-blue-900">Объяснение:</strong>
                                <div className="text-blue-800 leading-relaxed">{question.explanation}</div>
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