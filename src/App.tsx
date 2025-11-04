import { useState } from "react";
import { CourseCard } from "./components/CourseCard";
import { CourseContent, CourseModule } from "./components/CourseContent";
import { ModuleContent } from "./components/ModuleContent";
import { AssignmentView } from "./components/AssignmentView";
import { Button } from "./components/ui/button";
import { ScrollArea } from "./components/ui/scroll-area";
import { Separator } from "./components/ui/separator";
import { 
  Menu, 
  Home, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Settings, 
  User,
  GraduationCap,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface AssignmentDetails {
  id: number;
  title: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  grade?: number;
  description: string;
  submittedDate?: string;
  feedback?: string;
  files?: { name: string; url: string }[];
  submittedFiles?: { name: string; url: string }[];
}

const studentName = "Эмили Родригес";

const courses = [
  {
    id: 1,
    title: "Высшая математика",
    instructor: "Доктор Сара Джонсон",
    schedule: "Пн, Ср, Пт - 9:00",
    progress: 75,
    credits: 4,
    enrolled: 32,
    status: "in-progress" as const
  },
  {
    id: 2,
    title: "Информатика 101",
    instructor: "Проф. Майкл Чен",
    schedule: "Вт, Чт - 14:00",
    progress: 60,
    credits: 3,
    enrolled: 45,
    status: "in-progress" as const
  },
  {
    id: 3,
    title: "Английская литература",
    instructor: "Доктор Аманда Уайт",
    schedule: "Пн, Ср - 11:00",
    progress: 90,
    credits: 3,
    enrolled: 28,
    status: "in-progress" as const
  },
  {
    id: 4,
    title: "Основы физики",
    instructor: "Проф. Джеймс Андерсон",
    schedule: "Вт, Чт - 10:00",
    progress: 100,
    credits: 4,
    enrolled: 35,
    status: "completed" as const
  },
  {
    id: 5,
    title: "Всемирная история",
    instructor: "Доктор Лиза Мартинес",
    schedule: "Ср, Пт - 13:00",
    progress: 0,
    credits: 3,
    enrolled: 40,
    status: "upcoming" as const
  },
  {
    id: 6,
    title: "Лаборатория химии",
    instructor: "Проф. Роберт Тейлор",
    schedule: "Пн - 15:00",
    progress: 45,
    credits: 2,
    enrolled: 20,
    status: "in-progress" as const
  }
];

const menuItems = [
  { icon: Home, label: "Главная", href: "#" },
  { icon: BookOpen, label: "Мои курсы", href: "#", active: true },
  { icon: Calendar, label: "Расписание", href: "#" },
  { icon: GraduationCap, label: "Оценки", href: "#" },
  { icon: MessageSquare, label: "Сообщения", href: "#" },
  { icon: User, label: "Профиль", href: "#" },
  { icon: Settings, label: "Настройки", href: "#" }
];

// Данные заданий с полной информацией
const assignmentDetails: Record<number, AssignmentDetails> = {
  1: {
    id: 1,
    title: "Домашнее задание 1",
    dueDate: "10 ноя, 2024",
    status: "graded",
    grade: 95,
    description: `В этом задании вы должны продемонстрировать понимание основных концепций теории множеств и функций.

Задачи:
1. Решите 5 задач на операции с множествами (объединение, пересечение, разность)
2. Постройте графики следующих функций: f(x) = x², g(x) = sin(x), h(x) = log(x)
3. Докажите, что функция f(x) = 2x + 3 является линейной
4. Найдите область определения и область значений для функции f(x) = √(x-2)

Формат сдачи: PDF документ с решениями всех задач.`,
    submittedDate: "9 ноя, 2024",
    feedback: "Отличная работа! Все задачи решены правильно. Графики построены аккуратно и точно. Доказательство линейности функции выполнено корректно. Небольшая ошибка в обозначениях в задаче 4, но итоговый ответ верный.",
    files: [
      { name: "Задание_1_Теория_множеств.pdf", url: "#" },
      { name: "Примеры_решений.pdf", url: "#" }
    ],
    submittedFiles: [
      { name: "Решение_ДЗ1_Родригес.pdf", url: "#" }
    ]
  },
  2: {
    id: 2,
    title: "Домашнее задание 2",
    dueDate: "17 ноя, 2024",
    status: "submitted",
    description: `Практическое применение производных в решении задач оптимизации.

Задачи:
1. Найдите производные следующих функций:
   - f(x) = x³ + 2x² - 5x + 7
   - g(x) = sin(x) · cos(x)
   - h(x) = e^(2x) · ln(x)
   
2. Найдите критические точки и определите экстремумы функции f(x) = x³ - 3x² + 2

3. Задача оптимизации: Фермер хочет огородить прямоугольный участок площадью 1000 м². Какие размеры участка минимизируют длину забора?

4. Исследуйте функцию f(x) = (x²-4)/(x-2) и постройте её график.

Формат сдачи: PDF документ с подробными решениями.`,
    submittedDate: "16 ноя, 2024",
    files: [
      { name: "Задание_2_Производные.pdf", url: "#" },
      { name: "Формулы_дифференцирования.pdf", url: "#" }
    ],
    submittedFiles: [
      { name: "ДЗ2_Производные_Родригес.pdf", url: "#" }
    ]
  },
  3: {
    id: 3,
    title: "Домашнее задание 3",
    dueDate: "24 ноя, 2024",
    status: "pending",
    description: `Вычисление интегралов и их применение в решении практических задач.

Задачи:
1. Найдите неопределённые интегралы:
   - ∫(3x² + 2x - 1)dx
   - ∫sin(2x)dx
   - ∫(e^x + 1/x)dx
   
2. Вычислите определённые интегралы:
   - ∫₀² (x² + 1)dx
   - ∫₁⁴ √x dx
   
3. Найдите площадь фигуры, ограниченной кривой y = x² и прямой y = 4

4. Вычислите объём тела вращения, полученного вращением кривой y = √x (0 ≤ x ≤ 4) вокруг оси OX

Формат сдачи: PDF документ с решениями и пояснениями.`,
    files: [
      { name: "Задание_3_Интегралы.pdf", url: "#" },
      { name: "Таблица_интегралов.pdf", url: "#" },
      { name: "Примеры_вычислений.pdf", url: "#" }
    ]
  },
  4: {
    id: 4,
    title: "Программа: Hello World",
    dueDate: "5 ноя, 2024",
    status: "graded",
    grade: 100,
    description: `Напишите вашу первую программу на Python.

Требования:
1. Создайте файл hello.py
2. Выведите на экран сообщение "Hello, World!"
3. Добавьте комментарии, объясняющие код
4. Используйте переменную для хранения сообщения

Дополнительно:
- Попробуйте вывести ваше имя
- Используйте f-строки для форматирования вывода

Формат сдачи: .py файл`,
    submittedDate: "4 ноя, 2024",
    feedback: "Превосходно! Код чистый и хорошо документирован. Вы использовали f-строки, что является современной практикой. Отличное начало!",
    files: [
      { name: "Инструкция_Python.pdf", url: "#" }
    ],
    submittedFiles: [
      { name: "hello.py", url: "#" }
    ]
  },
  5: {
    id: 5,
    title: "Работа со списками",
    dueDate: "12 ноя, 2024",
    status: "pending",
    description: `Практическое задание по работе со списками в Python.

Задачи:
1. Создайте список из 10 случайных чисел от 1 до 100
2. Найдите максимальное и минимальное значение в списке
3. Вычислите среднее арифметическое всех элементов
4. Отсортируйте список по возрастанию
5. Удалите все дубликаты из списка
6. Создайте новый список, содержащий только чётные числа из исходного списка

Дополнительно:
- Используйте list comprehension где возможно
- Добавьте функции для каждой задачи
- Напишите тесты для ваших функций

Формат сдачи: .py файл с кодом и комментариями`,
    files: [
      { name: "Списки_в_Python.pdf", url: "#" },
      { name: "Примеры_работы_со_списками.py", url: "#" }
    ]
  }
};

// Данные модулей для курсов
const courseModules: Record<number, CourseModule[]> = {
  1: [ // Высшая математика
    {
      id: 1,
      title: "Введение и основы",
      description: "Базовые концепции высшей математики",
      lessonsTotal: 5,
      lessonsCompleted: 5,
      duration: "2 часа",
      status: "completed",
      lessons: [
        { id: 1, title: "Обзор курса", duration: "15 мин", completed: true, type: "video" },
        { id: 2, title: "Теория множеств", duration: "25 мин", completed: true, type: "reading" },
        { id: 3, title: "Функции и графики", duration: "30 мин", completed: true, type: "video" },
        { id: 4, title: "Практические задачи", duration: "40 мин", completed: true, type: "reading" },
        { id: 5, title: "Тест: Основы", duration: "10 мин", completed: true, type: "quiz" }
      ],
      assignments: [
        { id: 1, title: "Домашнее задание 1", dueDate: "10 ноя, 2024", status: "graded", grade: 95 }
      ]
    },
    {
      id: 2,
      title: "Дифференциальное исчисление",
      description: "Изучение производных и их применение",
      lessonsTotal: 6,
      lessonsCompleted: 4,
      duration: "3 часа",
      status: "in-progress",
      lessons: [
        { id: 6, title: "Понятие производной", duration: "30 мин", completed: true, type: "video" },
        { id: 7, title: "Правила дифференцирования", duration: "35 мин", completed: true, type: "video" },
        { id: 8, title: "Применение производных", duration: "40 мин", completed: true, type: "reading" },
        { id: 9, title: "Экстремумы функций", duration: "30 мин", completed: true, type: "video" },
        { id: 10, title: "Практические задачи", duration: "45 мин", completed: false, type: "reading" },
        { id: 11, title: "Тест: Производные", duration: "15 мин", completed: false, type: "quiz" }
      ],
      assignments: [
        { id: 2, title: "Домашнее задание 2", dueDate: "17 ноя, 2024", status: "submitted" }
      ]
    },
    {
      id: 3,
      title: "Интегральное исчисление",
      description: "Неопределённые и определённые интегралы",
      lessonsTotal: 6,
      lessonsCompleted: 0,
      duration: "3 часа",
      status: "not-started",
      lessons: [
        { id: 12, title: "Первообразная", duration: "25 мин", completed: false, type: "video" },
        { id: 13, title: "Неопределённый интеграл", duration: "30 мин", completed: false, type: "video" },
        { id: 14, title: "Определённый интеграл", duration: "35 мин", completed: false, type: "video" },
        { id: 15, title: "Методы интегрирования", duration: "40 мин", completed: false, type: "reading" },
        { id: 16, title: "Применение интегралов", duration: "35 мин", completed: false, type: "video" },
        { id: 17, title: "Тест: Интегралы", duration: "15 мин", completed: false, type: "quiz" }
      ],
      assignments: [
        { id: 3, title: "Домашнее задание 3", dueDate: "24 ноя, 2024", status: "pending" }
      ]
    }
  ],
  2: [ // Информатика 101
    {
      id: 1,
      title: "Основы программирования",
      description: "Введение в Python и базовые концепции",
      lessonsTotal: 4,
      lessonsCompleted: 4,
      duration: "2 часа",
      status: "completed",
      lessons: [
        { id: 1, title: "Установка Python", duration: "20 мин", completed: true, type: "video" },
        { id: 2, title: "Переменные и типы данных", duration: "30 мин", completed: true, type: "video" },
        { id: 3, title: "Условные операторы", duration: "25 мин", completed: true, type: "reading" },
        { id: 4, title: "Тест: Основы", duration: "10 мин", completed: true, type: "quiz" }
      ],
      assignments: [
        { id: 1, title: "Программа: Hello World", dueDate: "5 ноя, 2024", status: "graded", grade: 100 }
      ]
    },
    {
      id: 2,
      title: "Структуры данных",
      description: "Списки, словари и множества",
      lessonsTotal: 5,
      lessonsCompleted: 2,
      duration: "2.5 часа",
      status: "in-progress",
      lessons: [
        { id: 5, title: "Списки в Python", duration: "30 мин", completed: true, type: "video" },
        { id: 6, title: "Словари", duration: "25 мин", completed: true, type: "video" },
        { id: 7, title: "Множества", duration: "20 мин", completed: false, type: "reading" },
        { id: 8, title: "Кортежи", duration: "20 мин", completed: false, type: "reading" },
        { id: 9, title: "Тест: Структуры данных", duration: "15 мин", completed: false, type: "quiz" }
      ],
      assignments: [
        { id: 2, title: "Работа со списками", dueDate: "12 ноя, 2024", status: "pending" }
      ]
    }
  ]
};

export default function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null);

  const handleCourseClick = (courseId: number) => {
    setSelectedCourse(courseId);
    setSelectedModule(null);
    setSelectedAssignment(null);
  };

  const handleModuleClick = (moduleId: number) => {
    setSelectedModule(moduleId);
    setSelectedAssignment(null);
  };

  const handleAssignmentClick = (assignmentId: number) => {
    setSelectedAssignment(assignmentId);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setSelectedModule(null);
    setSelectedAssignment(null);
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
    setSelectedAssignment(null);
  };

  const handleBackToAssignments = () => {
    setSelectedAssignment(null);
  };

  const currentCourse = courses.find(c => c.id === selectedCourse);
  const currentModules = selectedCourse ? courseModules[selectedCourse] || [] : [];
  const currentModule = currentModules.find(m => m.id === selectedModule);
  const currentAssignment = selectedAssignment ? assignmentDetails[selectedAssignment] : null;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r transition-all duration-300 flex flex-col ${
          sidebarExpanded ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          {sidebarExpanded && (
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-blue-600" />
              <span className="font-semibold">Студенческий портал</span>
            </div>
          )}
          {!sidebarExpanded && (
            <GraduationCap className="w-6 h-6 text-blue-600 mx-auto" />
          )}
        </div>

        <ScrollArea className="flex-1">
          <nav className="p-2 space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant={item.active ? "secondary" : "ghost"}
                className={`w-full justify-start ${!sidebarExpanded && "justify-center px-2"}`}
              >
                <item.icon className="w-5 h-5" />
                {sidebarExpanded && <span className="ml-3">{item.label}</span>}
              </Button>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className={`w-full ${!sidebarExpanded && "justify-center px-2"}`}
          >
            {sidebarExpanded ? (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span className="ml-2">Свернуть</span>
              </>
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Добро пожаловать,</p>
              <h1 className="text-2xl">{studentName}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm">Осень 2024</p>
                <p className="text-sm text-muted-foreground">Записано на 6 курсов</p>
              </div>
            </div>
          </div>
        </header>

        {/* Course Content */}
        <main className="flex-1 overflow-auto">
          {selectedAssignment && currentAssignment && currentModule && currentCourse ? (
            <AssignmentView
              assignment={currentAssignment}
              courseName={currentCourse.title}
              moduleName={currentModule.title}
              onBack={handleBackToAssignments}
            />
          ) : selectedModule && currentModule && currentCourse ? (
            <ModuleContent 
              module={currentModule} 
              courseName={currentCourse.title}
              onBack={handleBackToModules}
              onAssignmentClick={handleAssignmentClick}
            />
          ) : selectedCourse && currentCourse ? (
            <CourseContent 
              course={currentCourse} 
              modules={currentModules}
              onBack={handleBackToCourses}
              onModuleClick={handleModuleClick}
            />
          ) : (
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl mb-2">Мои курсы</h2>
                <p className="text-muted-foreground">
                  Отслеживайте прогресс и будьте в курсе всех записанных курсов
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard 
                    key={course.id} 
                    {...course} 
                    onClick={() => handleCourseClick(course.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
