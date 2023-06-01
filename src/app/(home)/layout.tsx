import "@/assets/styles/globals.css";
import { Providers } from "@/app/provider";
import { Inter } from "next/font/google";
import { CommonLayout } from "@/components/common";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Candleaf",
  description: "Generated by create next app",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <CommonLayout>{children}</CommonLayout>
        </Providers>
      </body>
    </html>
  );
}