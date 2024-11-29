"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export default function FacebookSignInButton() {
  const pathname = usePathname(); // Obtiene la ruta completa desde el enrutador

  // Separar la ruta en partes
  const pathParts = pathname.split("/").filter((part) => part);

  console.log("🚀 >>  FacebookSignInButton >>  pathParts:", pathParts);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams ? searchParams.get("callbackUrl") : null;

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      // disabled
      onClick={() => signIn("facebook", { callbackUrl: callbackUrl ?? "/" })}
    >
      <div className="mr-4">
        <svg viewBox="0 0 48 48" width="24" height="24" preserveAspectRatio="xMidYMid meet">
          <path
            fill="#3F51B5"
            d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
          />
          <path
            fill="#FFF"
            d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
          />
        </svg>
      </div>
      Continuar con Facebook
    </Button>
  );
}
