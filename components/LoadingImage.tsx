"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

// Simple wrapper around Next.js Image that shows a loading state
// until the image has fully loaded.
export function LoadingImage(props: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-full w-full">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100/70">
          <span className="inline-block size-6 rounded-full border-2 border-slate-300 border-t-transparent animate-spin" />
        </div>
      )}
      <Image
        {...props}
        onLoadingComplete={(img) => {
          setLoaded(true);
          if (typeof props.onLoadingComplete === "function") {
            props.onLoadingComplete(img);
          }
        }}
      />
    </div>
  );
}
