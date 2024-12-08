/* eslint-disable @next/next/no-img-element */
"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const BANNER_KEY = "banner_last_shown";
const currentTime = new Date().getTime(); // Tiempo actual en milisegundos
const FOUR_HOURS = 0 // 4 * 3600000; // 4 horas en milisegundos

export function BannerDialog({ url }: { url: string | null }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const bannerKeyValue = Number(localStorage.getItem(BANNER_KEY));

      const lastShown = Number.isFinite(bannerKeyValue) ? bannerKeyValue : 1;

      const displayBanner = !lastShown || currentTime - lastShown > FOUR_HOURS;

      if (displayBanner) {
        setOpen(true);
        localStorage.setItem(BANNER_KEY, `${currentTime}`);
      }
    }, 500);
  }, [url]);

  const closeBanner = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="p-0 bg-transparent shadow-none w-full h-auto max-w-[600px] max-h-[900px]"
        hideCloseButton
      >
        <div className="relative ">
          <img
            // src="/banners/champions.jpeg"
            src="/banners/cr-vs-hond.jpg"
            alt="Publicidad"
            className="w-full h-full object-cover rounded-lg"
          />
          <Button
            onClick={closeBanner}
            className="absolute top-4 right-4 bg-black/50 text-white rounded-xl p-2 hover:bg-black flex gap-2"
          >
            <span className="">Cerrar</span>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
