import { api } from "@/app/api";
import { user_type } from "@/app/api/types";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

export default async function EditUserPage({
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
      <Footer />
    </main>
  );
}
