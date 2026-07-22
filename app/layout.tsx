"use client"

import React from "react";
import "../app/style.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body>
        {children}
      </body>
    </html>
  );
}
