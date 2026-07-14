import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Two fonts, each with a job (the "typography escapes generic" principle):
// - Space Grotesk: display + body. Has character without being decorative.
// - JetBrains Mono: labels, the typed question, and SQL — it IS the concept,
//   since the product's whole story is "the query behind the answer".
// Geist (the create-next-app default) is gone.

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Old title was the generic template headline — it leaked into browser
  // tabs and link previews even after the Hero was fixed.
  title: "AuraAI — Ask your database what happened. In English, not SQL.",
  description:
    "Connect Postgres or Stripe and ask plain-English questions about your own data. Every answer shows the SQL behind it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${code.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
