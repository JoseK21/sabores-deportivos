"use client";

import { AvatarFallback } from "@radix-ui/react-avatar";
import { ChangeEvent, useState, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";

export enum SIZES_UNIT {
  sm,
  md,
  xl,
}

type SizesType = {
  [key in SIZES_UNIT]: string;
};

const SIZES: SizesType = {
  [SIZES_UNIT.sm]: "w-20 h-20",
  [SIZES_UNIT.md]: "w-32 h-32",
  [SIZES_UNIT.xl]: "w-60 h-60",
};

const FileInputPreview = ({
  src,
  disabled,
  onChange,
  name = "",
  size = SIZES_UNIT.md,
}: {
  size: SIZES_UNIT;
  onChange: Function;
  disabled: boolean;
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
      <Avatar
        className={`border-neutral-300 rounded-full border overflow-hidden ${imagePreview ? "" : " text-3xl"} ${
          SIZES[size]
        }`}
      >
        <AvatarImage alt={name || ""} src={imagePreview ?? ""} className="h-full object-cover" />
        <AvatarFallback className=" bg-slate-200 w-full h-full flex items-center justify-center">
          {(name || "").charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="btn-container mt-2">
        <Input
          hidden
          type="file"
          disabled={disabled}
          className=" hidden"
          ref={filePicekerRef}
          onChange={previewFile}
          accept=".jpg, .jpeg, .png, .webp"
        />
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
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
            disabled={disabled}
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
