import "./globals.css";

import { Noto_Sans_Bengali } from "next/font/google";

const fontSystem = Noto_Sans_Bengali({ subsets: ["latin"] });

import Providers from "@/components/template/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      {/* className="overflow-hidden" */}
      <body className={`${fontSystem.className} antialiased`}>
        <Providers session={session}>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
