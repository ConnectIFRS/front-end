import { JWTToken } from "@/app/api/types";
import decode from "jwt-decode";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import unactiveHome from "../../public/images/footer/home-unactive.svg";
import unactivePost from "../../public/images/footer/post-unactive.svg";
import unactiveSearch from "../../public/images/footer/search-unactive.svg";
import styles from "../../styles/footer.module.scss";
import UserProfilePic from "./UserProfilePic";
export default async function Footer() {
  const token = cookies().get("user_token")?.value;
  const decodedToken: JWTToken = decode(token ?? "");
  return (
    <footer className={styles.footer}>
      <Link href="/homepage">
        <Image
          src={unactiveHome}
          width={25}
          height={25}
          quality={100}
          alt="home"
        />
      </Link>
      <Link href="/post/new">
        <Image
          src={unactivePost}
          width={25}
          height={25}
          quality={100}
          alt="post"
        />
      </Link>
      <Link href="/search">
        <Image
          src={unactiveSearch}
          width={25}
          height={25}
          quality={100}
          alt="search"
        />
      </Link>
      <UserProfilePic
        image={decodedToken.profilePic}
        userId={decodedToken.sub}
      />
    </footer>
  );
}
