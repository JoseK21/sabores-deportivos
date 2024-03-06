import Navbar from "@/components/Navbar";
import "./globals.css";

import Providers from "@/components/template/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      {/* className="overflow-hidden" */}
      <body>
        <Providers session={session}>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
