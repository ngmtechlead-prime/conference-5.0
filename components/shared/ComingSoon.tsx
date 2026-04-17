import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-12 font-epilogue">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-[#0F1990]/10 rounded-full flex items-center justify-center">
              <Image
                src="/icons/NGMLogo.svg"
                alt="NGM Logo"
                width={60}
                height={60}
                className="opacity-80"
              />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-normal text-[#0F1990] mb-4 font-epilogue">
            {title}{" "}
            <span className="text-[#0DA04C] font-semibold">Coming Soon</span>
          </h1>

          <p className="text-lg text-[#4A5565] mb-8 max-w-lg mx-auto">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#0F1990] hover:bg-[#0d1470] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Return to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://bitooqoh.com/explore/ngm-conference-5.0"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#0F1990] text-[#0F1990] font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#0F1990] hover:text-white transition-colors duration-200"
            >
              Buy Tickets
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
