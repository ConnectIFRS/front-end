"use client";
import { api } from "@/app/api";
import { JWTToken, resumed_user_type } from "@/app/api/types";
import decode from "jwt-decode";
import { useUrl } from "nextjs-current-url";
import { FormEvent, useEffect, useState } from "react";
import styles from "../../../styles/followerssearch.module.scss";
import ResumedUserCard from "../ResumedUserCard";

export default function DefaultSearch({
  token,
  userId,
}: {
  token: string;
  userId: string;
}) {
  const [users, setUsers] = useState<resumed_user_type[]>([]);
  const [recentSearched, setRecentSearched] = useState<resumed_user_type[]>([]);
  //   const handleGetUserRecentSearch = async () => {
  //     const response = await api.post(`/search/recent/${userId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setRecentSearched(response.data);
  //   };
  const handleSearchChange = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await api.post(
      "/search",
      {
        userName: formData.get("search"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUsers(response.data);
  };
  const { href: currentUrl, pathname } = useUrl() ?? {};
  const decodedToken: JWTToken = decode(token);
  //   useEffect(() => {
  //     handleGetUserRecentSearch();
  //   }, []);
  return (
    <div className={styles.usersSearch}>
      <form onChange={handleSearchChange} className={styles.inputUtil}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Pesquisar"
          className={styles.input}
        />
      </form>
      {users.length === 0 ? (
        <div>
          <p>Não existe nenhum usuário com o valor inserido na sua pesquisa</p>
        </div>
      ) : (
        <div className={styles.followersList}>
          {users.map((user) => {
            return (
              <ResumedUserCard
                token={token}
                user={user}
                key={user.id}
                userId={decodedToken.sub}
                redirectUrl={currentUrl ?? ""}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
