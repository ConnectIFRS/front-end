import Footer from "@/components/Footer";
import DefaultSearch from "@/components/search/DefaultSearch";
import decode from "jwt-decode";
import { cookies } from "next/headers";
import { JWTToken } from "../api/types";

export default async function Search() {
  const token = cookies().get("user_token")?.value;
  const decodedToken: JWTToken = decode(token ?? "");
  return (
    <main>
      <DefaultSearch token={token ?? ""} userId={decodedToken.sub} />
      <Footer />
    </main>
  );
}
