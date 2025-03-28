import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">
            Post Writer
          </Link>
          <Link href="/blog" className="text-sm font-medium">
            ブログ
          </Link>
        </div>
        <div>
          <Link href="/login">
            <Button variant="outline">ログイン</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
