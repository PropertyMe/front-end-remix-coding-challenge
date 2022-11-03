// entry.client.tsx
import { CacheProvider } from "@emotion/react";
import { RemixBrowser } from "@remix-run/react";
import React, { startTransition, StrictMode, useState } from "react";
import { hydrateRoot } from "react-dom/client";

import { ClientStyleContext } from "./context";
import createEmotionCache from "./createEmotionCache";

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache());

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

function clearBrowserPluginInjectionsBeforeHydration() {
  if (document.body.dataset) {
    Object.keys(document.body.dataset).map((attribute) => {
      delete document.body.dataset[attribute];
    });
  }

  setTimeout(
    () =>
      document
        .querySelectorAll(
          "html > script, html > input, grammarly-desktop-integration"
        )
        .forEach((s) => {
          s.parentNode?.removeChild(s);
        }),
    0
  );
}

function hydrate() {
  startTransition(() => {
    clearBrowserPluginInjectionsBeforeHydration();

    hydrateRoot(
      document,
      <StrictMode>
        <ClientCacheProvider>
          <RemixBrowser />
        </ClientCacheProvider>
      </StrictMode>
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
