"use client";

import Link from "next/link";
import styles from "./login.module.css";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        alert(error.message || "Unable to log in");
        return;
      } else {
        router.push("/menu");
      }
    } catch (error) {
      console.error("Unexpected login error:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1>Login</h1>
        <p className={styles.subtitle}>
          Spend a little less time deciding what to eat.
        </p>
      </div>
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
        <p className={styles.signupPrompt}>
          Need an account? <Link href="/signup">Sign up</Link>
        </p>
      </form>
    </main>
  );
}
