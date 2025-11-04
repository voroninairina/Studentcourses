import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  ArrowLeft, 
  PlayCircle, 
  FileText, 
  CheckCircle,
  Circle,
  Calendar,
  Award,
  BookOpen
} from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  type: "video" | "reading" | "quiz";
}

interface Assignment {
  id: number;
  title: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  grade?: number;
}

interface ModuleContentProps {
  module: {
    id: number;
    title: string;
    description: string;
    lessons: Lesson[];
    assignments: Assignment[];
  };
  courseName: string;
  onBack: () => void;
  onAssignmentClick: (assignmentId: number) => void;
}

export function ModuleContent({ module, courseName, onBack, onAssignmentClick }: ModuleContentProps) {
  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayCircle className="w-4 h-4" />;
      case "reading":
        return <FileText className="w-4 h-4" />;
      case "quiz":
        return <Award className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getAssignmentBadge = (status: string) => {
    switch (status) {
      case "graded":
        return <Badge className="bg-green-500">Оценено</Badge>;
      case "submitted":
        return <Badge className="bg-blue-500">Отправлено</Badge>;
      case "pending":
        return <Badge variant="outline">Ожидает</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Module Header */}
      <div className="bg-white border-b p-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к модулям
        </Button>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{courseName}</p>
          <h1 className="text-3xl mb-2">{module.title}</h1>
          <p className="text-muted-foreground">{module.description}</p>
        </div>
      </div>

      {/* Module Content Tabs */}
      <div className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="lessons" className="w-full">
          <TabsList>
            <TabsTrigger value="lessons">Уроки</TabsTrigger>
            <TabsTrigger value="assignments">Задания</TabsTrigger>
            <TabsTrigger value="resources">Ресурсы</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-3 mt-6">
            {module.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  {lesson.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                  <div className="flex items-center gap-2">
                    {getLessonIcon(lesson.type)}
                    <span className={lesson.completed ? "text-muted-foreground" : ""}>
                      {lesson.title}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{lesson.duration}</span>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4 mt-6">
            {module.assignments.map((assignment) => (
              <Card 
                key={assignment.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onAssignmentClick(assignment.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{assignment.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Calendar className="w-4 h-4" />
                        Срок: {assignment.dueDate}
                      </CardDescription>
                    </div>
                    {getAssignmentBadge(assignment.status)}
                  </div>
                </CardHeader>
                {assignment.grade && (
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span>Оценка: {assignment.grade}%</span>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Материалы модуля</CardTitle>
                <CardDescription>Дополнительные ресурсы и материалы</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Слайды презентации.pdf
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Конспект лекции.pdf
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Дополнительное чтение
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Практические упражнения.pdf
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
