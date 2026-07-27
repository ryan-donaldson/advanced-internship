"use client"

import React from "react";
import "../app/style.css";
import AuthInit from "./auth-init";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body>
        <AuthInit />
        {children}
      </body>
    </html>
  );
}
