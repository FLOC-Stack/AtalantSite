"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function isLocaleHomePath(pathname: string) {
  return pathname.split("/").filter(Boolean).length === 1;
}

export function RouteScrollReset() {
  const pathname = usePathname() ?? "";

  useEffect(() => {
    if (!isLocaleHomePath(pathname)) {
      document.documentElement.classList.remove("home-scroll-snap-enabled");
    }

    const hash = window.location.hash;
    if (hash && hash !== "#page-top") return;
    if (hash === "#page-top") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [pathname]);

  return null;
}
