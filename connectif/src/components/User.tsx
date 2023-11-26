import { api } from "@/app/api";
import { JWTToken, user_type } from "@/app/api/types";
import decode from "jwt-decode";
import { Video } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/user.module.scss";
import EmptyPosts from "./EmptyPosts";
import InstagramCard from "./InstagramCard";
import Preference from "./Preference";
import UserField from "./UserField";
import WhatsAppCard from "./WhatsAppCard";
import Follow from "./buttons/Follow";
import Others from "./buttons/Others";

export default async function User({ id }: { id: string }) {
  const token = cookies().get("user_token")?.value;
  const response = await api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const imageRegex =
    /\.(gif|jpg|jpeg|tiff|png|webp|bmp|raws|exif|ppm|pgm|pbm|pnm|svg)$/i;
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
          <UserField
            dataToShow={user.posts.length}
            text="Publicações"
            url={`/user/${user.id}`}
            padding
          />
          <UserField
            padding
            dataToShow={user.followers}
            text="Seguidores"
            url={`/user/followers/${user.id}`}
          />
          <UserField
            padding
            dataToShow={user.following}
            text="Seguindo"
            url={`/user/following/${user.id}`}
          />
        </div>
        <div>
          <p>{user.description}</p>
        </div>
        <div>
          <h3>Redes sociais</h3>
          <div className={styles.socialMediasList}>
            {user.whatsappNumber !== null && user.whatsappNumber !== "" && (
              <WhatsAppCard wppNumber={user.whatsappNumber} />
            )}
            {user.instagramName !== null && user.instagramName !== "" && (
              <InstagramCard instagramName={user.instagramName} />
            )}
          </div>
          {!user.instagramName && !user.whatsappNumber && (
            <span>
              O usuário não informou nenhuma rede social ao criar a conta
            </span>
          )}
        </div>
        <div className={styles.userPreferences}>
          <h3>Preferências</h3>
          <div className={styles.preferencesList}>
            {user.preferences.map((preference) => (
              <Preference preference={preference} />
            ))}
          </div>
        </div>
        <div className={styles.userActions}>
          {decodedToken.sub === user.id ? (
            <Others text="Editar Perfil" url={`/user/edit/${user.id}`} />
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
      <div className={styles.postsList}>
        {user.posts.length > 0 ? (
          <div className={styles.postsArea}>
            {user.posts.map((post) => {
              return (
                <Link href={`/post/${post.id}`}>
                  {imageRegex.test(post.coverUrl) ? (
                    <img src={post.coverUrl} alt="user-post" />
                  ) : (
                    <div className={styles.videoBox}>
                      <video
                        width="100%"
                        height="100%"
                        style={{
                          aspectRatio: "3/4",
                          objectFit: "cover",
                        }}
                      >
                        <source src={post.coverUrl ?? ""} />
                        Seu navegador não suporta o elemento de vídeo.
                      </video>
                      <div>
                        <Video width={20} height={20} />
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <EmptyPosts />
        )}
      </div>
    </main>
  );
}
