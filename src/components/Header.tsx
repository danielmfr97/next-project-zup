"use client";

import Link from "next/link";
import { useAuth } from "../../app/contexts/auth-context";
import styles from "./header.module.css"; // crie este arquivo

export function Header() {
  const { isAuthenticated, login } = useAuth();

  return (
    <header className={styles.topbar}>
      <nav className={styles.nav} aria-label="Navegação principal">
        <div className={styles.left}>
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