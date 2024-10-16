import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from '@nextui-org/react';


export const metadata: Metadata = {
  title: 'Rick and Morty Characters',
  description: 'SSR with Filters using Next.js, Tailwind, and TypeScript',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
