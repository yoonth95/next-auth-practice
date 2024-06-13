import { getSession } from "@/lib/getSession";

export default async function Home() {
  const session = await getSession();
  console.log(session);
  return (
    <>
      <h1>Home Page</h1>
      <h1>{JSON.stringify(session, null, 2)}</h1>
    </>
  );
}
