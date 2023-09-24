import DefaultInput from "@/components/DefaultInput";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.svg";
import styles from "../../styles/page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.logoArea}>
        <Image
          src={logo}
          alt="logo"
          width={136}
          height={136}
          // placeholder="blur"
          quality={100}
        />
        <h1>ConnectIF</h1>
      </div>
      <form>
        <DefaultInput
          type="text"
          name="username"
          id="username"
          autoComplete="off"
          required
          label="E-mail"
        />
        <DefaultInput
          type="password"
          name="password"
          id="password"
          required
          label="Senha"
        />
        <div className={styles.inputGroup}>
          <button type="submit">Entrar</button>
        </div>
      </form>
      <div>
        <div className={styles.links}>
          <Link href="/register">Não possui conta? Criar conta</Link>
          <Link href="/forgot-password">Esqueci minha senha</Link>
        </div>
      </div>
    </main>
  );
}
