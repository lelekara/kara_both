"use client";
import React, { useState } from "react";
import JSZip from "jszip";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ButtonDownloadProps {
  photos: { url: string }[];
  eventName?: string;
  className?: string;
}

export default function ButtonDownload({ photos, eventName, className }: ButtonDownloadProps) {
  const [isLoading, setIsLoading] = useState(false);

  const downloadPhotosAsZip = async () => {
    setIsLoading(true);
    const zip = new JSZip();
    const folder = zip.folder("photos");

    if (!folder) {
      setIsLoading(false);
      return;
    }

    for (const photo of photos) {
      // Générer l'URL publique Supabase si ce n'est pas déjà une URL complète
      const isFullUrl = photo.url.startsWith('http');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const url = isFullUrl
        ? photo.url
        : `${supabaseUrl}/storage/v1/object/public${photo.url}`;
      const response = await fetch(url);
      const blob = await response.blob();
      folder.file(photo.url.split("/").pop() || "photo.jpg", blob);
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${eventName || "photos"}.zip`;
      a.click();
      URL.revokeObjectURL(url);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  };

  return (
    <Button
      onClick={downloadPhotosAsZip}
      disabled={isLoading}
      className={`w-25 h-25 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 flex flex-col items-center justify-center text-white text-lg font-bold shadow-2xl transition-transform hover:scale-110 ${className ?? ""}`}
      aria-label="Télécharger toutes les photos"
    >
      <Download className={`w-10 h-10 mb-1 ${isLoading ? "animate-spin" : ""}`} />
      <span className="text-xs font-semibold leading-tight">
        {isLoading ? "Préparation..." : "Tout télécharger"}
      </span>
    </Button>
  );
}