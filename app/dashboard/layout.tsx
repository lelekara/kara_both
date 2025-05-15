
export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
  <main className="min-h-screen bg-muted/20 p-4 md:p-8 bg-gradient-to-br from-orange-50 via-white to-pink-50">
          {children}
  </main>
    );
  }
  