import type { Metadata } from "next";
import "@/style/globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  icons: "/api/favicon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
