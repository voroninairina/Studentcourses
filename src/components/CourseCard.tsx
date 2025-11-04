import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { BookOpen, Clock, Users } from "lucide-react";

interface CourseCardProps {
  title: string;
  instructor: string;
  schedule: string;
  progress: number;
  credits: number;
  enrolled: number;
  status: "in-progress" | "completed" | "upcoming";
  onClick?: () => void;
}

export function CourseCard({
  title,
  instructor,
  schedule,
  progress,
  credits,
  enrolled,
  status,
  onClick
}: CourseCardProps) {
  const statusColors = {
    "in-progress": "bg-blue-500",
    "completed": "bg-green-500",
    "upcoming": "bg-orange-500"
  };

  const statusLabels = {
    "in-progress": "В процессе",
    "completed": "Завершен",
    "upcoming": "Предстоящий"
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle>{title}</CardTitle>
          <Badge className={statusColors[status]}>{statusLabels[status]}</Badge>
        </div>
        <CardDescription>Преподаватель: {instructor}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{schedule}</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{credits} кредитов</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{enrolled} студентов</span>
          </div>
        </div>

        {status === "in-progress" && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Прогресс</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
