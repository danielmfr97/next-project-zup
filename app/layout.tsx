// app/layout.tsx
import type { Metadata } from "next";
import { AuthProvider } from "@/features/auth/context/auth-context";
import { Header } from "@/shared/ui/header/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Catálogo Next.js",
  description: "Projeto acadêmico com SSG, ISR, CSR e API Routes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <a href="#conteudo" className="skipLink">
            Pular para o conteúdo principal
          </a>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
