"use client";

import Link from "next/link";
import { useAuth } from "@/features/auth/context/auth-context";
import { useRouter } from "next/navigation"; 
import styles from "./header.module.css";

export function Header() {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  const handleBackToCatalog = () => {
    router.push("/");
  };

  return (
    <header className={styles.topbar}>
      <nav className={styles.nav} aria-label="Navegação principal">
        <div className={styles.left}>
        <button
            type="button"
            className={styles.backButton}
            onClick={handleBackToCatalog}
            aria-label="Voltar para o catálogo"
            style={{ marginRight: 16 }}
          >
            ← Catálogo
          </button>
          <Link href="/">Home</Link>
          {isAuthenticated && (
            <Link href="/perfil" style={{ marginLeft: 16 }}>
              Perfil
            </Link>
          )}
        </div>
        {!isAuthenticated && (
          <button
            type="button"
            className={styles.loginButton}
            onClick={login}
          >
            LOGAR
          </button>
        )}
      </nav>
    </header>
  );
}
