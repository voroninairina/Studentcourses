import { Button } from "./ui/button";
import { ModuleCard } from "./ModuleCard";
import { Progress } from "./ui/progress";
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Users
} from "lucide-react";

export interface CourseModule {
  id: number;
  title: string;
  description: string;
  lessonsTotal: number;
  lessonsCompleted: number;
  duration: string;
  status: "not-started" | "in-progress" | "completed";
  lessons: {
    id: number;
    title: string;
    duration: string;
    completed: boolean;
    type: "video" | "reading" | "quiz";
  }[];
  assignments: {
    id: number;
    title: string;
    dueDate: string;
    status: "pending" | "submitted" | "graded";
    grade?: number;
  }[];
}

interface CourseContentProps {
  course: {
    id: number;
    title: string;
    instructor: string;
    schedule: string;
    progress: number;
    credits: number;
    enrolled: number;
    status: "in-progress" | "completed" | "upcoming";
  };
  modules: CourseModule[];
  onBack: () => void;
  onModuleClick: (moduleId: number) => void;
}

export function CourseContent({ course, modules, onBack, onModuleClick }: CourseContentProps) {

  return (
    <div className="h-full flex flex-col">
      {/* Course Header */}
      <div className="bg-white border-b p-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к курсам
        </Button>

        <div className="space-y-4">
          <div>
            <h1 className="text-3xl mb-2">{course.title}</h1>
            <p className="text-muted-foreground">Преподаватель: {course.instructor}</p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{course.schedule}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span>{course.credits} кредитов</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>{course.enrolled} студентов</span>
            </div>
          </div>

          {course.status === "in-progress" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Прогресс курса</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}
        </div>
      </div>

      {/* Course Modules */}
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h2 className="text-xl mb-2">Модули курса</h2>
          <p className="text-muted-foreground">
            Выберите модуль для просмотра уроков и заданий
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              title={module.title}
              description={module.description}
              lessonsTotal={module.lessonsTotal}
              lessonsCompleted={module.lessonsCompleted}
              duration={module.duration}
              status={module.status}
              onClick={() => onModuleClick(module.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
