"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface RedirectButtonProps {
  redirectPath: string;
  children?: React.ReactNode;
}

export default function RedirectButton({
  redirectPath,
  children,
}: RedirectButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    window.location.href = redirectPath;
  };
  return (
    <Button
      variant="outline"
      size="sm"
      className="h-7 gap-1 text-sm"
      onClick={handleClick}
    >
      Practice
    </Button>
  );
}
