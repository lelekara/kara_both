"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

export default function LazyImage(props: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  const mergedClassName = [
    "object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl",
    loaded ? "opacity-100" : "opacity-0",
    props.className || "",
  ].join(" ");

  // Ne pas passer loading="lazy" si priority est true
  const imageProps = {
    ...props,
    className: mergedClassName,
    ...(props.priority ? {} : { loading: "lazy" }),
    onLoad: () => setLoaded(true),
  };

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-pink-100 to-yellow-100 animate-pulse rounded-xl z-10" />
      )}
      <Image {...imageProps} />
    </div>
  );
}