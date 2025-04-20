"use client";
import { useState } from "react";
import instance from "../../axios";
import { toast } from "sonner";
import styles from "./login.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginPageProps } from "@/types/types";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const { register, handleSubmit } = useForm<LoginPageProps>();

  const onSubmit:SubmitHandler<LoginPageProps> = async (data) => {
    setIsLoading(true);
    try {
      const response = await instance.post("Account/login", {
        email: data.email,
        password: data.password,
      });

      setIsLoading(false);

      if (response.data && response.data.token) {
        const token = response.data.token;

        localStorage.setItem("authToken", token);

        router.replace("/admin")
      }
    } catch {
      setIsLoading(false);
      toast.error("Failed To Login");
      setError("");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles["login-container"]}>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["input-field"]}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "email Is required" })}
            />
          </div>
          <div className={styles["input-field"]}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "password Is required" })}
            />
          </div>
          <button className="--btn" type="submit" disabled={isLoading}>
            {isLoading ? "  Loading..." : "Login"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
