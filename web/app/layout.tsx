import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Vercel AI SDK - Next.js OpenAI Examples",
  description: "Examples of using the Vercel AI SDK with Next.js and OpenAI.",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased grid p-[70px] max-w-[1000px] mx-auto gap-4",

          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
