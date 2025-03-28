import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-4xl font-bold mb-8">Post Writer</h1>
      <Link href="/dashboard">
        <Button size="lg" className="text-lg px-8">
          はじめる
        </Button>
      </Link>
    </div>
  );
}
