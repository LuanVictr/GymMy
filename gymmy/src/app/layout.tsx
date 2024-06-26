import { ConfigProvider } from "antd";
import "./globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { theme } from "./theme";
import { Providers } from "./lib/query-provider";

export const metadata: Metadata = {
  title: "GymMy",
  description: "Seu personal inteligente que vai te ajudar no seu progresso.",
  icons: "/gymmy-icon.png",
};

const quicksand = Quicksand({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: theme.colorPrimary,
        },
        components: {
          Button: {
            colorLink: theme.colorPrimary,
            colorLinkHover: theme.colorPrimary,
          },
          Drawer: {
            fontFamily: quicksand.style.fontFamily
          }
        },
      }}
    >
      <html style={{ height: "100%", width: "100%" }} lang="en">
        <body
          className={quicksand.className}
          style={{ height: "100%", margin: 0, padding: 0 }}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </ConfigProvider>
  );
}
