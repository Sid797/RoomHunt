import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex  justify-center items-center h-[100vh]">
        <Link href="/contactus">
          <Button variant="default">ji</Button>
        </Link>
      </div>
    </>
  );
}
