"use client";

import { AvatarFallback } from "@radix-ui/react-avatar";
import { ChangeEvent, useState, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";

const FileInputPreview = ({
  onChange,
  src,
  name = "",
}: {
  onChange: Function;
  src: string | undefined;
  name: string | undefined;
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(src || null);
  const filePicekerRef = useRef<HTMLInputElement>(null);

  function previewFile(e: ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();

    const selectedFile = e?.target?.files?.[0] ?? null;

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }

    reader.onload = (readerEvent) => {
      const preview = (readerEvent?.target?.result as string) || null;

      if (selectedFile?.type?.includes("image")) {
        setImagePreview(preview);
        onChange(selectedFile);
      }
    };
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <Avatar className={`w-60 h-60 border-neutral-300 rounded-full border overflow-hidden ${imagePreview ? "" : " text-3xl"}`}>
        <AvatarImage
          width={240}
          height={240}
          alt={name || ""}
          src={imagePreview ?? ""}
          className="h-full object-cover"
        />
        <AvatarFallback className=" bg-slate-300 w-full h-full flex items-center justify-center">
          {(name || "").charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="btn-container mt-2">
        <Input
          ref={filePicekerRef}
          accept=".jpg, .jpeg, .png, .webp"
          onChange={previewFile}
          type="file"
          hidden
          className=" hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (filePicekerRef.current) {
              filePicekerRef.current.click();
            }
          }}
        >
          {imagePreview ? "Cambiar" : "Seleccionar"} Imagen
        </Button>
        {imagePreview && (
          <Button
            variant="outline"
            className=" text-destructive ml-1"
            onClick={() => {
              setImagePreview(null);
              onChange(undefined);
            }}
          >
            x
          </Button>
        )}
      </div>
    </div>
  );
};

export default FileInputPreview;
