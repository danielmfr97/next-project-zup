// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { AuthProvider } from "./contexts/auth-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Catálogo Next.js",
  description: "Projeto acadêmico com SSG, ISR, CSR e API Routes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <a href="#conteudo" className="skipLink">
            Pular para o conteúdo principal
          </a>
          <header className="topbar">
            <nav className="nav" aria-label="Navegação principal">
              <Link href="/">Home</Link>
              <Link href="/catalogo">Catálogo</Link>
              <Link href="/perfil">Perfil</Link>
            </nav>
          </header>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}