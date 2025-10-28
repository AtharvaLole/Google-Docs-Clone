import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link"
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 animate-fade-in">
      <Button>Click Me</Button>
    </div>
  );
}
