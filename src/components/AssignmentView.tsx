import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { 
  ArrowLeft, 
  Calendar,
  Award,
  Upload,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Download
} from "lucide-react";

interface AssignmentViewProps {
  assignment: {
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
  };
  courseName: string;
  moduleName: string;
  onBack: () => void;
}

export function AssignmentView({ assignment, courseName, moduleName, onBack }: AssignmentViewProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "graded":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "submitted":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "graded":
        return <Badge className="bg-green-500">Оценено</Badge>;
      case "submitted":
        return <Badge className="bg-blue-500">Отправлено</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-orange-500 text-orange-500">Ожидает выполнения</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Assignment Header */}
      <div className="bg-white border-b p-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к модулю
        </Button>

        <div className="space-y-3">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <span>{courseName}</span>
            <span>•</span>
            <span>{moduleName}</span>
          </div>
          
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl mb-3">{assignment.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Срок сдачи: {assignment.dueDate}</span>
                </div>
                
                {assignment.submittedDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Отправлено: {assignment.submittedDate}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {getStatusIcon(assignment.status)}
              {getStatusBadge(assignment.status)}
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Grade Card (if graded) */}
          {assignment.status === "graded" && assignment.grade !== undefined && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-yellow-500" />
                    <div>
                      <CardTitle>Ваша оценка</CardTitle>
                      <CardDescription>Задание проверено преподавателем</CardDescription>
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-green-600">
                    {assignment.grade}%
                  </div>
                </div>
              </CardHeader>
              {assignment.feedback && (
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Отзыв преподавателя:</p>
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="text-sm">{assignment.feedback}</p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          )}

          {/* Assignment Description */}
          <Card>
            <CardHeader>
              <CardTitle>Описание задания</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">
                {assignment.description}
              </p>
            </CardContent>
          </Card>

          {/* Assignment Files */}
          {assignment.files && assignment.files.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Материалы задания</CardTitle>
                <CardDescription>Загрузите эти файлы для выполнения задания</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {assignment.files.map((file, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>{file.name}</span>
                    </div>
                    <Download className="w-4 h-4" />
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Submission Section */}
          {assignment.status === "pending" && (
            <Card>
              <CardHeader>
                <CardTitle>Отправить задание</CardTitle>
                <CardDescription>Загрузите выполненное задание</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                  <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-1">
                    Нажмите для загрузки файлов
                  </p>
                  <p className="text-xs text-muted-foreground">
                    или перетащите их сюда
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Комментарий (необязательно)</label>
                  <Textarea 
                    placeholder="Добавьте комментарий к вашему заданию..."
                    rows={4}
                  />
                </div>

                <Button className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Отправить задание
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Submitted Files */}
          {assignment.submittedFiles && assignment.submittedFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Отправленные файлы</CardTitle>
                <CardDescription>Ваши файлы для этого задания</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {assignment.submittedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Waiting for Review */}
          {assignment.status === "submitted" && (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Ожидает проверки</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Ваше задание было успешно отправлено и ожидает проверки преподавателем.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
