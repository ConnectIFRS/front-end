import { api } from "@/app/api";
import { JWTToken, user_type } from "@/app/api/types";
import decode from "jwt-decode";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/user.module.scss";
import Follow from "./buttons/Follow";
import Others from "./buttons/Others";

export default async function User({ id }: { id: string }) {
  const token = cookies().get("user_token")?.value;
  const response = await api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const decodedToken: JWTToken = decode(token ?? "");
  const user: user_type = response.data;
  return (
    <main className={styles.main}>
      <div className={styles.topPart}>
        <div className={styles.userData}>
          <div className={styles.userUtilData}>
            <Image
              src={user.profilePic}
              alt={user.name}
              width={75}
              height={75}
            />
            <span>{user.name}</span>
          </div>
          <div className={styles.userInfo}>
            <span>{user.posts.length}</span>
            <span>Publicações</span>
          </div>
          <div className={styles.userInfo}>
            <span>{user.followers}</span>
            <span>Seguidores</span>
          </div>
          <div className={styles.userInfo}>
            <span>{user.following}</span>
            <span>Seguindo</span>
          </div>
        </div>
        <div>
          <p>{user.description}</p>
        </div>
        <div className={styles.userActions}>
          {decodedToken.sub === user.id ? (
            <Others text="Editar Perfil" url="/user/edit" />
          ) : (
            <Follow
              token={token ?? ""}
              userId={user.id}
              followedByUser={user.followedByUser}
            />
          )}
          {decodedToken.sub === user.id ? (
            <Others
              text="Compartilhar Perfil"
              url={`http://192.168.2.17:3000/user/${user.id}`}
            />
          ) : (
            <Others text="Mensagem" url={`/message/${user.id}`} />
          )}
        </div>
      </div>
    </main>
  );
}
