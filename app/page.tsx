import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SpaceBackground } from "@/components/home-page-art/space-background";
import { ParallaxStars } from "@/components/home-page-art/parallax-stars";

export default function Home() {
  return (
    <div className="">
      <SpaceBackground />
      <ParallaxStars />

      <div className="relative z-10">
        <header className="sticky top-0 z-50 w-full mt-4">
          <div className="container flex h-14 items-center mx-auto">
            <div className="mr-4 flex">
              <Link href="/" className="mr-6 flex items-center space-x-2">
                <span className="font-bold text-white text-3xl">Learn Gap</span>
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center space-x-2">
                <Link href="/onboarding/profile">
                  <Button className="cursor-pointer bg-white text-black">
                    Get Started
                  </Button>
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="mx-auto">
          <section className="w-screen py-12 md:py-24 lg:py-32">
            <div className=" px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white py-8">
                    Close Your Skill Gaps with AI
                  </h1>
                  <p className="mx-auto max-w-[700px] text-purple-600 md:text-xl dark:text-gray-400">
                    Learn Gap creates personalized learning paths based on your
                    goals and current skills. Advance your career with targeted
                    curriculum designed just for you.
                  </p>
                </div>
                <div className="py-4">
                  <div className="space-x-4">
                    <Link href="/onboarding/profile">
                      <Button
                        size="lg"
                        className="text-4xl cursor-pointer bg-gradient-to-r from-purple-700 to-blue-700 text-white p-8 antialiased "
                      >
                        Start Your Learning Journey
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
