import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav className="bg-violet-500 h-16 flex justify-center items-center gap-5">
        <Link href="/">
          <Button variant="outline">Home</Button>
        </Link>
        <Link href="/contactus">
          <Button variant="default">Contact Us</Button>
        </Link>
        <Link href="/houseadd">
          <Button variant="default">House Add</Button>
        </Link>
        <Link href="/houselist">
          <Button variant="default">House List</Button>
        </Link>
      </nav>
      {children}
    </section>
  );
}
