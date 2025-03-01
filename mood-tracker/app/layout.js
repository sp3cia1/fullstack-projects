import { Fugaz_One,Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const opensans = Open_Sans({ subsets: ["latin"] });

const fugaz = Fugaz_One({
  subsets: ['latin'],
  weight: '400'
})

export const metadata = {
  title: "Mood-Tracker",
  description: "Track your daily moods every day of the year",
};

const header = (
  <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
    <Link href={'/'}>
      <h1 className={'text-lg sm:text-3xl textGradient ' + fugaz.className}>Mood-Tracker</h1>
    </Link>
    <div className="flex items-center justify-between">
      PLACEHOLDER
    </div>
  </header>
)

const footer = (
  <footer className="p-4 sm:p-8 grid place-items-center">
    <p className={'text-indigo-600 text-lg ' + fugaz.className}>Created with ❤️</p>
  </footer>
)

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ' + opensans.className}
      >
        {header}
        {children}
        {footer}        
      </body>
    </html>
  );
}
