"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

const DEFAULT_URL = "https://generated.vusercontent.net/placeholder.svg";

export const UploadCover = () => {
  const [url, setUrl] = useState(DEFAULT_URL);

  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <div className="grid w-full gap-4">
      <div className="grid gap-2">
        <Input
          id="image-link"
          type="url"
          placeholder="Insira a capa do livro"
          onChange={handleChangeUrl}
        />
      </div>
      <div
        className={`grid rounded-md ${
          url === DEFAULT_URL ? "bg-[#f0ecec]" : "bg-transparent"
        }`}
      >
        <div className="h-96 rounded-lg w-full flex items-center justify-center p-2">
          <Image
            width={100}
            height={300}
            src={url}
            alt="Preview"
            quality={100}
            className="object-cover w-60"
          />
        </div>
      </div>
    </div>
  );
};
