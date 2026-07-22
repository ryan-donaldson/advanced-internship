"use client";

import ClientRoot from "../ClientRoot";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientRoot>{children}</ClientRoot>;
}
