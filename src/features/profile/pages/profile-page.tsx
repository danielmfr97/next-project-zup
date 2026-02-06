"use client";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/features/profile/types/profile";
import { useAuth } from "@/features/auth/context/auth-context";
import styles from "./profile-page.module.css";

const initialProfile: UserProfile = {
  name: "Daniel Costa",
  email: "daniel@example.com",
  bio: "Estudante de desenvolvimento web.",
};

export default function PerfilPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  function handleChange(field: keyof UserProfile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));
    setSavedMessage("");
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavedMessage("Dados salvos localmente.");
  }

  return (
    <main id="conteudo" className={styles.container}>
      <h1>Perfil do Usuário</h1>
      <form className={styles.form} onSubmit={handleSave} aria-describedby="profile-help">
        <p id="profile-help" className={styles.helperText}>
          Atualize seus dados e clique em salvar.
        </p>
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          autoComplete="name"
          required
          value={profile.name}
          onChange={(event) => handleChange("name", event.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={profile.email}
          onChange={(event) => handleChange("email", event.target.value)}
        />
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          rows={4}
          value={profile.bio}
          onChange={(event) => handleChange("bio", event.target.value)}
        />
        <div className={styles.actions}>
          <button type="submit" className={styles.button}>
            Salvar
          </button>
          <button type="button" className={styles.secondary} onClick={logout} aria-label="Sair do perfil">
            Sair
          </button>
        </div>
        {savedMessage ? (
          <p className={styles.feedback} role="status" aria-live="polite">
            {savedMessage}
          </p>
        ) : null}
      </form>
    </main>
  );
}
