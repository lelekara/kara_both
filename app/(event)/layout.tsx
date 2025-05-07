
export default function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<main className="min-h-screen bg-muted/20 p-4 md:p-8">

        {children}

</main>
  );
}
