// hooks/useMicrophonePermissions.tsx
import { useState, useEffect } from "react";

export const useMicrophone = () => {
  const [permission, setPermission] = useState<boolean>(false);

  // upon initial render, ask for permission
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(() => setPermission(true))
      .catch(() => setPermission(false));
  }, []);

  return permission;
};
