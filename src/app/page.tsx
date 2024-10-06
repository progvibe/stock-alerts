import Link from "next/link";
import { auth } from "~/auth";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import Dashboard from "../components/dashboard";
import { SignIn } from "../components/sign-in";
import { SignOut } from "../components/sign-out";
import { WelcomeMessage } from "../components/welcome-message";

export default async function Home() {
  const session = await auth();

  const authenticated = session?.user !== undefined;

  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container mx-auto p-4">
          <h1 className="mb-6 text-3xl font-bold">Stock Dashboard</h1>
          {authenticated && (
            <div>
              <Dashboard />
              <SignOut />
              <WelcomeMessage />
              <LatestPost />
            </div>
          )}
          <SignIn />
        </div>
      </main>
    </HydrateClient>
  );
}
