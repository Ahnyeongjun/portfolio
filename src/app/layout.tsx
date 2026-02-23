import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
});

const BASE_URL = "https://www.ahnyoungjun.site";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "안영준 | Full-Stack Developer",
    template: "%s | 안영준",
  },
  description:
    "서비스의 지속적인 발전을 고민하는 풀스택 개발자 안영준입니다. Spring Boot, Next.js, Kubernetes 기반의 프로젝트를 진행합니다.",
  keywords: [
    "안영준",
    "풀스택 개발자",
    "포트폴리오",
    "Spring Boot",
    "Next.js",
    "Kubernetes",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "안영준" }],
  creator: "안영준",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: BASE_URL,
    siteName: "안영준 포트폴리오",
    title: "안영준 | Full-Stack Developer",
    description:
      "서비스의 지속적인 발전을 고민하는 풀스택 개발자 안영준입니다.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "안영준 포트폴리오",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "안영준 | Full-Stack Developer",
    description:
      "서비스의 지속적인 발전을 고민하는 풀스택 개발자 안영준입니다.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: "QogD7MTFMKzvZ9emiikto5MEUwmaROPUpWMgkfpYv7Q",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
