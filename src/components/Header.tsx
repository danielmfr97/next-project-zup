// components/Header.tsx
"use client";

import Link from "next/link";
import { useAuth } from "../../app/contexts/auth-context";
import { useRouter } from "next/navigation";

export function Header() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header className="topbar">
      <nav className="nav" aria-label="Navegação principal">
        <Link href="/">Home</Link>
        {isAuthenticated && (
          <>
            <Link href="/catalogo">Catálogo</Link>
            <Link href="/perfil">Perfil</Link>
            <button onClick={handleLogout}>Sair</button>
          </>
        )}
      </nav>
    </header>
  );
}