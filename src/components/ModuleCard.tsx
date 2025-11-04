import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { BookOpen, Clock, CheckCircle } from "lucide-react";

interface ModuleCardProps {
  title: string;
  description: string;
  lessonsTotal: number;
  lessonsCompleted: number;
  duration: string;
  status: "not-started" | "in-progress" | "completed";
  onClick?: () => void;
}

export function ModuleCard({
  title,
  description,
  lessonsTotal,
  lessonsCompleted,
  duration,
  status,
  onClick
}: ModuleCardProps) {
  const statusColors = {
    "not-started": "bg-gray-500",
    "in-progress": "bg-blue-500",
    "completed": "bg-green-500"
  };

  const statusLabels = {
    "not-started": "Не начат",
    "in-progress": "В процессе",
    "completed": "Завершен"
  };

  const progress = lessonsTotal > 0 ? Math.round((lessonsCompleted / lessonsTotal) * 100) : 0;

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle>{title}</CardTitle>
          <Badge className={statusColors[status]}>{statusLabels[status]}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{lessonsTotal} уроков</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>{lessonsCompleted} из {lessonsTotal} завершено</span>
        </div>

        {status !== "not-started" && (
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
