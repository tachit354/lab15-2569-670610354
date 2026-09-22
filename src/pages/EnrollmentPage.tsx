import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent } from "@/lib/mock-data";

export default function Enrollent() {
  const [courseList, setCourseList] = useState(courses);

  const getThaiCurrentDateTime = () => {
    const thaiMonths = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];
    const now = new Date();
    const day = now.getDate();
    const month = thaiMonths[now.getMonth()];
    const year = now.getFullYear() + 543; // แปลง ค.ศ. เป็น พ.ศ.
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${day} ${month} ${year} ${hours}:${minutes}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <p className="text-sm text-muted-foreground">
            Tachit Thungcharoenkul(670610354)
          </p>
        </div>
        <RegisterDialog Courses={courseList} setCourses={setCourseList} />
      </div>

      <div className="flex flex-col gap-4">
        {courseList.map((course) => (
          <CourseCard
            key={course.courseId}
            course={course}
            student={currentStudent}
            enrolledAt={getThaiCurrentDateTime()}
            onUnenroll={() => {
              setCourseList((prevList) =>
                prevList.map((c) =>
                  c.courseId === course.courseId
                    ? { ...c, isEnrolled: false }
                    : c,
                ),
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
