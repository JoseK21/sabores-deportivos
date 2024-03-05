"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Icons } from "./icons";
import { Button } from "../ui/button";

export default function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams ? searchParams.get("callbackUrl") : null;

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() => signIn("github", { callbackUrl: callbackUrl ?? "/master" })}
    >
      <Icons.gitHub className="mr-2 h-4 w-4" />
      Continue with Github
    </Button>
  );
}
