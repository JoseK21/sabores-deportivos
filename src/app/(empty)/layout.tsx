export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <main className="w-full flex-1 space-y-4 p-8">{children}</main>
    </section>
  );
}
