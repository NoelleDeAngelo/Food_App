"use client";

import Link from "next/link";
import styles from "./signup.module.css";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        if (
          error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL" ||
          error.code === "USER_ALREADY_EXISTS"
        ) {
          alert(
            "An account with this email already exists. Please log in instead.",
          );
        } else {
          alert(error.message || "Unable to create account");
        }
        return;
      } else {
        router.push("/menu");
      }
    } catch (error) {
      console.error("Unexpected signup error:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1>Create Your Account</h1>
        <p className={styles.subtitle}>
          Spend a little less time deciding what to eat.
        </p>
      </div>
      <form className={styles.signup_form} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
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
          minLength={8}
          autoComplete="new-password"
        />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
        <button type="submit">Sign Up</button>
        <p className={styles.loginPrompt}>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </form>
    </main>
  );
}
