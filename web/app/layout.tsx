import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vercel AI SDK - Next.js OpenAI Examples",
  description: "Examples of using the Vercel AI SDK with Next.js and OpenAI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-#fff`}>{children}</body>
    </html>
  );
}
