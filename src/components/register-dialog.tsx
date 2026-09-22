import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { courses } from "@/lib/mock-data";
import type { Course } from "@/lib/types";

//แสดงเวลาปัจจุบัน
const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

interface RegisterDialogProps {
  Courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}
export function RegisterDialog({ Courses, setCourses }: RegisterDialogProps) {
  const [open, setOpen] = useState(false); // true = แสดง Dialog
  const [time, setTime] = useState(getCurrentTime());
  const [courseId, setCourseId] = useState("");
  const [courseList] = useState(courses);
  const selectedCourse = courseList.find((c) => c.courseId === courseId);
  const unregis = Courses.filter((c) => c.isEnrolled == false);

  useEffect(() => {
    if (open) setTime(getCurrentTime());
  }, [open]);

  const resetFrom = () => {
    setCourseId("");
  };

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); // ไม่ให้หน้าเว็บ reload

    // 3. วนลูปหาตัวที่เลือก แล้วสลับค่า isEnrolled เป็นค่าตรงข้าม
    setCourses((prevList) =>
      prevList.map((course) =>
        course.courseId === courseId
          ? { ...course, isEnrolled: !course.isEnrolled }
          : course,
      ),
    );

    setCourseId(""); // เคลียร์ฟอร์ม
    setOpen(false); // ปิด Dialog
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ปุ่มที่กดแล้วเปิด Dialog */}
      <DialogTrigger>
        <Button onClick={resetFrom}>
          <UserPlus /> ลงทะเบียน
        </Button>
      </DialogTrigger>

      {/* ฟอร์มที่แสดงออกมาเมื่อกดปุ่ม */}
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>
              เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="studentId">รหัสนักศึกษา</Label>
            <Select
              value={courseId}
              onValueChange={(val) => setCourseId(val ?? "")}
            >
              <SelectTrigger className="w-full max-w-88">
                {/* placeholder เป็นข้อความว่า "เลือกวิชา" */}
                <SelectValue placeholder="เลือกวิชา">
                  {selectedCourse
                    ? `${selectedCourse.courseId} - ${selectedCourse.courseTitle}`
                    : "เลือกวิชา"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {unregis.map((course) => (
                  <SelectItem key={course.courseId} value={course.courseId}>
                    {/* รูปแบบ "รหัสวิชา - ชื่อวิชา" */}
                    {`${course.courseId} - ${course.courseTitle}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentId">เวลา</Label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ-นามสกุล</Label>
            <Input
              id="fullName"
              value="Tachit Thungcharoenkul"
              readOnly
            ></Input>
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseId">โปรแกรม</Label>
            <Input id="courseId" value="CPE" readOnly />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!courseId}>
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
