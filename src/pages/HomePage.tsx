import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="mx-auto max-w-xl space-y-4">
        <div
          data-slot="card"
          data-size="default"
          className="group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl"
        >
          <div data-slot="card-header">
            <div data-slot="card-title" className="mx-3">
              ระบบลงทะเบียนเรียน CPE & ISNE
            </div>
          </div>
          <div
            data-slot="card-content"
            className="px-(--card-spacing) space-y-4"
          >
            <Button typeof="button" onClick={() => navigate("/enrollment")}>
              ไปหน้าลงทะเบียนเรียน
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
