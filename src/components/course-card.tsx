import { Trash2 } from "lucide-react";
import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  onUnenroll?: () => void;
};

export function CourseCard({
  course,
  student,
  enrolledAt,
  onUnenroll,
}: CourseCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-base ">{course.courseTitle}</CardTitle>
          <CardDescription>
            รหัสวิชา: {course.courseId} · ผู้สอน:{" "}
            {course.instructors.join(", ")}
          </CardDescription>
        </div>

        {course.isEnrolled ? (
          <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-amber-600 bg-amber-50 border-amber-200 dark:text-purple-400 dark:bg-amber-950/60 dark:border-purple-800/6">
            ลงทะเบียนแล้ว
          </span>
        ) : (
          <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-purple-600 bg-purple-50 border-purple-200 dark:text-amber-500 dark:bg-amber-950/60 dark:border-amber-800/6">
            เปิดรับ
          </span>
        )}
      </CardHeader>
      {course.isEnrolled && (
        <CardContent className="flex items-end justify-between">
          <div className="text-xs text-muted-foreground">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>
            <p>โปรแกรม: {student.program}</p>
            <p>ลงทะเบียนเมื่อ: {enrolledAt}</p>
          </div>

          <button
            type="button"
            onClick={onUnenroll}
            className="text-red-500 hover:text-red-400 p-1 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </CardContent>
      )}
    </Card>
  );
}
