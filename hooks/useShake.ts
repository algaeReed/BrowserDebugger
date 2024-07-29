import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";

const useShake = (
  shakeThreshold = 1000,
  accelerationThreshold = 1.5,
  shakeHideCount = 1,
  shakeShowCount = 2
) => {
  const [tabVisible, setTabVisible] = useState(true);
  const [shakeCount, setShakeCount] = useState(0);

  useEffect(() => {
    let lastShakeTime = 0;

    const handleShake = ({ x, y, z }) => {
      const now = Date.now();
      if (now - lastShakeTime < shakeThreshold) return;

      const magnitude = Math.sqrt(x * x + y * y + z * z);
      if (magnitude > accelerationThreshold) {
        setShakeCount((prevCount) => prevCount + 1);
        lastShakeTime = now;
      }
    };

    Accelerometer.addListener(handleShake);

    return () => {
      Accelerometer.removeAllListeners();
    };
  }, [shakeThreshold, accelerationThreshold]);

  useEffect(() => {
    if (shakeCount >= shakeHideCount && shakeCount < shakeShowCount) {
      setTabVisible(false);
    } else if (shakeCount >= shakeShowCount) {
      setTabVisible(true);
      setShakeCount(0); // Reset shake count after showing tabs
    }
  }, [shakeCount, shakeHideCount, shakeShowCount]);

  return tabVisible;
};

export default useShake;
