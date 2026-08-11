import { useEffect } from "react";

/** Adds crawler directives while a private Jenny route is mounted. */
export function usePrivateRouteMeta(): void {
  useEffect(() => {
    const existing = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const robots = existing ?? document.createElement("meta");
    const previousContent = existing?.content;

    if (!existing) {
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "noindex, nofollow, noarchive, nosnippet";

    return () => {
      if (!existing) robots.remove();
      else robots.content = previousContent ?? "";
    };
  }, []);
}
