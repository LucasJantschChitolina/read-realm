"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UndrawNoData from "@/public/undraw-no-data";
import Image from "next/image";
import React, { useState } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const UploadCover = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [url, setUrl] = useState("");

    const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
      const url = e.target.value;

      if (!url.startsWith("http")) {
        return setUrl("");
      }

      setUrl(url);
    };

    return (
      <div className="grid w-full gap-4">
        <div className="grid gap-2">
          <Label htmlFor="cover">Capa</Label>

          <Input
            required
            name="cover"
            value={url}
            ref={ref}
            {...props}
            placeholder="Insira a capa do livro"
            onChange={handleChangeUrl}
          />
        </div>
        {url && (
          <Image
            src={url}
            width={250}
            height={250}
            alt="Book Image Preview"
            quality={100}
            className="aspect-[8/12] w-full rounded-md object-cover"
          />
        )}

        {!url && (
          <div className="flex flex-col gap-4 items-center justify-center h-96">
            <UndrawNoData className="w-32 h-32" />
          </div>
        )}
      </div>
    );
  }
);

export default UploadCover;
