"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useState } from "react";

const DEFAULT_URL = "https://generated.vusercontent.net/placeholder.svg";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const UploadCover = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [url, setUrl] = useState(DEFAULT_URL);

    const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
      const url = e.target.value;

      if (!url.startsWith("http")) {
        return setUrl(DEFAULT_URL);
      }

      setUrl(url);
    };

    return (
      <div className="grid w-full gap-4">
        <div className="grid gap-2">
          <Label htmlFor="cover">Capa</Label>

          <Input
            name="cover"
            value={url}
            ref={ref}
            {...props}
            placeholder="Insira a capa do livro"
            onChange={handleChangeUrl}
          />
        </div>
        <div
          className={`grid rounded-md ${
            url === DEFAULT_URL ? "bg-[#f0ecec]" : "bg-transparent"
          }`}
        >
          <Image
            src={url}
            width={250}
            height={250}
            alt="Book Image Preview"
            quality={100}
            className="aspect-[8/10] w-full rounded-md object-cover"
          />
        </div>
      </div>
    );
  }
);

export default UploadCover;
