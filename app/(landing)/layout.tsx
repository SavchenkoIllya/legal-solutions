import Header from "./components/header";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      <Header />
      {children}
    </main>
  );
}
