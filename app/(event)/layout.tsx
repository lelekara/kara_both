
export default function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<main>
    <div className="h-screen flex flex-col items-center justify-center">
        {children}
    </div>
</main>
  );
}
