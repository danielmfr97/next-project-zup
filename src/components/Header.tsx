"use client";

import Link from "next/link";
import { useAuth } from "../../app/contexts/auth-context";

export function Header() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <header className="topbar">
      <nav className="nav" aria-label="Navegação principal">
        <Link href="/catalogo">Catálogo</Link>
        <Link href="/perfil">Perfil</Link>
      </nav>
    </header>
  );
}