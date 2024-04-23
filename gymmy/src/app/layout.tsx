import { ConfigProvider } from "antd";
import "./globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { theme } from "./theme";

export const metadata: Metadata = {
  title: "GymMy",
  description: "Seu personal inteligente que vai te ajudar no seu progresso.",
  icons:'/gymmy-icon.png'
};

const quicksand = Quicksand({ subsets: ['latin'] })

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
        },
      }}
    >
      <html style={{ height: "100%", width: "100%", fontFamily: "" }} lang="en">
        <body className={quicksand.className} style={{ height: "100%", margin: 0, padding: 0 }}>
          {children}
        </body>
      </html>
    </ConfigProvider>
  );
}
