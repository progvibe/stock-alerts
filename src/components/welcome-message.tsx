import { auth } from "~/auth";

export async function WelcomeMessage() {
  const session = await auth();
  if (!session || !session.user) return null;
  return (
    <div>
      <p>Welcome {session.user.name ?? "Guest"}</p>
      <img src={session.user.image ?? undefined} alt="User Avatar" />
    </div>
  );
}
