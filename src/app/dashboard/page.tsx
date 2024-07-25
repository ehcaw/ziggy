import { dashboard } from "@/components/dashboard";
import { useUser, useSession } from "@clerk/nextjs";
import { createClerkSupabaseClient } from "@/utils/clerkSupabase";

export default async function Dashboard() {
  /*
  const { user } = useUser();
  const { session } = useSession();
  const clerkSupabaseClient = createClerkSupabaseClient(session);
  */

  return (
    <div>
      <Dashboard />
    </div>
  );
}
