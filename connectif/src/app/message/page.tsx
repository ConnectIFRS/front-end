import Footer from "@/components/Footer";
import MessageHeader from "@/components/MessageHeader";
import decode from "jwt-decode";
import { cookies } from "next/headers";
import { api } from "../api";
import { JWTToken } from "../api/types";

export default async function Message() {
  const token = cookies().get("user_token")?.value;
  const decodedToken: JWTToken = decode(token ?? "");

  //   const response = await api.get("/user/community", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const followers
  return (
    <main>
      <MessageHeader userId={decodedToken.sub} userName={decodedToken.name} />
      <Footer />
    </main>
  );
}
