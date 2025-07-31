"use client";

import { useState, useEffect } from "react";
import { isMobile, isTablet, isDesktop } from "react-device-detect";

export function useScreenSize() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDeviceType = () => {
      // Use react-device-detect for accurate device detection
      const isMobileOrTablet = isMobile;

      setIsMobileDevice(isMobileOrTablet);
      setIsLoading(false);
    };

    // Check on mount
    checkDeviceType();

    // Add event listener for resize (but only for initial detection)
    const handleResize = () => {
      // Only update if we haven't determined the device type yet
      if (isLoading) {
        checkDeviceType();
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoading]);

  return { isMobile: isMobileDevice, isLoading };
}
