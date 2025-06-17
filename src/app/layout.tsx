import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "./_components/ui/header";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "MeetUN",
  description: "MeetUN. Encuentra y publica fácilmente tus grupos y eventos universitarios, de todo tipo",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <Header />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
