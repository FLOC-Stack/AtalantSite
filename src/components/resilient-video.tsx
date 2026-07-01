"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { VideoHTMLAttributes } from "react";

type Props = Omit<VideoHTMLAttributes<HTMLVideoElement>, "children" | "src"> & {
  src?: string;
  fallbackSrc?: string;
  fallbackClassName?: string;
  fallbackLabel?: string;
  loadTimeoutMs?: number;
};

export function ResilientVideo({
  src,
  fallbackSrc,
  ...props
}: Props) {
  return (
    <ResilientVideoInner
      key={`${src ?? ""}|${fallbackSrc ?? ""}`}
      src={src}
      fallbackSrc={fallbackSrc}
      {...props}
    />
  );
}

function ResilientVideoInner({
  src,
  fallbackSrc,
  fallbackClassName,
  fallbackLabel = "video/imagen",
  loadTimeoutMs = 8000,
  className,
  poster,
  onCanPlay,
  onError,
  onLoadedData,
  onStalled,
  onSuspend,
  ...props
}: Props) {
  const [activeSrc, setActiveSrc] = useState(src);
  const [hasFailed, setHasFailed] = useState(!src);
  const [isPlayable, setIsPlayable] = useState(false);
  const triedFallbackRef = useRef(false);

  const failOver = useCallback(() => {
    if (fallbackSrc && activeSrc !== fallbackSrc && !triedFallbackRef.current) {
      triedFallbackRef.current = true;
      setActiveSrc(fallbackSrc);
      setHasFailed(false);
      setIsPlayable(false);
      return;
    }

    setHasFailed(true);
  }, [activeSrc, fallbackSrc]);

  useEffect(() => {
    if (!activeSrc || isPlayable || hasFailed) return;
    const timeout = window.setTimeout(failOver, loadTimeoutMs);
    return () => window.clearTimeout(timeout);
  }, [activeSrc, failOver, hasFailed, isPlayable, loadTimeoutMs]);

  if (!activeSrc || hasFailed) {
    return (
      <div
        className={
          fallbackClassName ??
          "absolute inset-0 flex items-center justify-center bg-[#d9d9d9] font-mono text-[11px] uppercase tracking-[2px] text-muted-strong"
        }
        data-video-fallback="true"
        aria-hidden={props["aria-hidden"]}
      >
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        ) : (
          fallbackLabel
        )}
      </div>
    );
  }

  return (
    <video
      {...props}
      className={className}
      src={activeSrc}
      poster={poster}
      onCanPlay={(event) => {
        setIsPlayable(true);
        onCanPlay?.(event);
      }}
      onLoadedData={(event) => {
        setIsPlayable(true);
        onLoadedData?.(event);
      }}
      onError={(event) => {
        failOver();
        onError?.(event);
      }}
      onStalled={(event) => {
        onStalled?.(event);
      }}
      onSuspend={(event) => {
        onSuspend?.(event);
      }}
    />
  );
}
