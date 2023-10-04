"use client";
import { api } from "@/app/api";
import { JWTToken, resumed_user_type } from "@/app/api/types";
import decode from "jwt-decode";
import { FormEvent, useEffect, useState } from "react";
import styles from "../../../styles/followerssearch.module.scss";
import ResumedUserCard from "../ResumedUserCard";
export default function FollowersAndFollowingSearch({
  token,
  userId,
}: {
  token: string;
  userId: string;
}) {
  const [users, setUsers] = useState<resumed_user_type[]>([]);
  const handleGetUserFollowers = async () => {
    const response = await api.post(
      `/search/followers/${userId}`,
      {
        userName: "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUsers(response.data);
  };
  const handleSearchChange = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await api.post(
      `/search/followers/${userId}`,
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
  const decodedToken: JWTToken = decode(token);
  useEffect(() => {
    handleGetUserFollowers();
  }, []);
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
          <p>
            Estamos requisitando a lista de usuários ou o usuário não possui
            nenhum seguidor
          </p>
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
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
