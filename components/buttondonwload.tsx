"use client";
import React from "react";
import JSZip from "jszip";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface ButtonDownloadProps {
  photos: { url: string }[];
  eventName?: string;
}

export default function ButtonDownload({ photos, eventName }: ButtonDownloadProps) {
  const downloadPhotosAsZip = async () => {
    const zip = new JSZip();
    const folder = zip.folder("photos");

    if (!folder) return;

    // Ajouter chaque photo au dossier ZIP
    for (const photo of photos) {
      const response = await fetch(photo.url);
      const blob = await response.blob();
      folder.file(photo.url.split("/").pop() || "photo.jpg", blob);
    }

    // Générer le fichier ZIP et le télécharger
    zip.generateAsync({ type: "blob" }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${eventName || "photos"}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <Button variant="outline" size="icon" onClick={downloadPhotosAsZip} className="flex items-center gap-4">
        <Camera className="w-12 h-12" />
    </Button>
  );
}