import { useUser, useSession } from "@clerk/nextjs";
import { createClerkSupabaseClient } from "@/utils/clerkSupabase";
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/NAe6PuKerrJ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import RedirectButton from "@/components/redirectButton";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
          <BookOpenIcon className="h-6 w-6" />
          <span className="sr-only">English Learning App</span>
        </Link>
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#" prefetch={false}>
                  Dashboard
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="relative ml-auto flex-1 md:grow-0">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <img
                src="/placeholder.svg"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50 px-6 py-4">
            <CardTitle>Learn Vocabulary</CardTitle>
            <CardDescription>Expand your English vocabulary.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="font-medium">Word</div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div>Umbrella</div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <div className="h-3.5 w-3.5" />
                    <span>Learned</span>
                  </Button>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div>Sunshine</div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <div className="h-3.5 w-3.5" />
                    <span>Learned</span>
                  </Button>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div>Rainy</div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <div className="h-3.5 w-3.5" />
                    <span>Learned</span>
                  </Button>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div>Cloudy</div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <div className="h-3.5 w-3.5" />
                    <span>Learned</span>
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="font-medium">Definition</div>
                <div>A device used to protect against rain.</div>
                <div>The bright light from the sun.</div>
                <div>Describing weather with a lot of rain.</div>
                <div>Describing weather with many clouds in the sky.</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50 px-6 py-4">
            <CardTitle>Practice Conversation</CardTitle>
            <CardDescription>
              Improve your English conversation skills.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="font-medium">Topic</div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div>Ordering at a Restaurant</div>
                  <RedirectButton redirectPath="/converse">
                    <div className="h-3.5 w-3.5" />
                  </RedirectButton>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div>Introducing Yourself</div>
                  <RedirectButton redirectPath="/converse">
                    <div className="h-3.5 w-3.5" />
                  </RedirectButton>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div>Asking for Directions</div>
                  <RedirectButton redirectPath="/converse">
                    <div className="h-3.5 w-3.5" />
                  </RedirectButton>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div>Discussing Hobbies</div>
                  <RedirectButton redirectPath="/converse">
                    <div className="h-3.5 w-3.5" />
                  </RedirectButton>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="font-medium">Description</div>
                <div>Practice ordering food and drinks at a restaurant.</div>
                <div>
                  Learn how to introduce yourself and talk about your
                  background.
                </div>
                <div>
                  Practice asking for and giving directions to different
                  locations.
                </div>
                <div>
                  Discuss your hobbies and interests with a conversation
                  partner.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function BookOpenIcon(props: any) {
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
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
