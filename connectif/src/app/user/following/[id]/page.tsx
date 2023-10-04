import { api } from "@/app/api";
import { user_type } from "@/app/api/types";
import FollowingAndFollowersHeader from "@/components/FollowersAndFollowingHeader";
import Footer from "@/components/Footer";
import FollowersAndFollowingSearch from "@/components/search/FollowersAndFollowingSearch";
import { cookies } from "next/headers";

export default async function FollowingPage({
  params,
}: {
  params: { id: string };
}) {
  const id: string = params.id;
  const token = cookies().get("user_token")?.value;
  const response = await api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user: user_type = response.data;
  return (
    <main>
      <FollowingAndFollowersHeader
        userName={user.name}
        followers={user.followers}
        following={user.following}
      />
      <FollowersAndFollowingSearch token={token ?? ""} userId={id} />
      <Footer />
    </main>
  );
}
