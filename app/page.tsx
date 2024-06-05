import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import Link from "next/link";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/feed");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <p>home page</p>
      <Link href="/login">login</Link>
    </div>
  );
}
