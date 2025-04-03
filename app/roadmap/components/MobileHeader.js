import Link from "next/link";
import { LightningLogo } from "@/components/Icons";
import config from "@/config";

export default function MobileHeader() {
  return (
    <header className="bg-[#1a1a1a]">
      <nav className="container mx-auto flex items-center h-16 px-4">
        <Link
          href="/"
          className="flex items-center gap-2.5"
        >
          <LightningLogo className="w-9 h-9 sm:w-11 sm:h-11" />
          <span className="font-black text-2xl sm:text-3xl" style={{ fontFamily: 'Bricolage Grotesque' }}>
            {config.appName}
          </span>
        </Link>
      </nav>
    </header>
  );
} 