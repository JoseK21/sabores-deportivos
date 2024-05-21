export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <main className="w-full">{children}</main>
    </section>
  );
}
