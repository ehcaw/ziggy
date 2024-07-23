/**
 * v0 by Vercel.
 * @see https://v0.dev/t/zLGH9oR4QT7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      {" "}
      {/* Updated classes for centering */}
      <header className="w-full max-w-4xl bg-primary text-primary-foreground px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <BookIcon className="size-6" />
          <span className="sr-only">English Learning App</span>
        </Link>
        <Button variant="ghost">Login</Button>
      </header>
      <main className="w-full max-w-4xl">
        {" "}
        {/* Adjusted for width control */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4">
            <div className="space-y-2">
              <h1 className="flex justify-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Learn English with Ease
              </h1>
              <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                Our app provides a fun and engaging way to improve your English
                skills. Start learning today!
              </p>
            </div>
            <Link
              href="#"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary-foreground px-4 py-2 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Get Started
            </Link>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose Our App?
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our English learning app offers a comprehensive and personalized
              approach to help you improve your language skills. With
              interactive lessons, engaging content, and personalized feedback,
              you'll be speaking English with confidence in no time.
            </p>
          </div>
        </section>
      </main>
      <footer className="bg-muted text-muted-foreground px-4 md:px-6 py-6 w-full shrink-0 flex flex-col gap-2 sm:flex-row items-center">
        <p className="text-xs">
          &copy; 2024 English Learning App. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function BookIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
