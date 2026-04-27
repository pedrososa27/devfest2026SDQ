import { useState, useEffect } from 'react';

const MOBILE_QUERY = '(max-width: 767px)';

function getIsMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(MOBILE_QUERY).matches;
}

export function useBreakpoint() {
  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);

    // Sync immediately in case SSR defaulted incorrectly
    setIsMobile(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    // Use modern API with fallback for older browsers
    if (mql.addEventListener) {
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    } else {
      // Safari < 14 fallback
      mql.addListener(handler);
      return () => mql.removeListener(handler);
    }
  }, []);

  return isMobile;
}
