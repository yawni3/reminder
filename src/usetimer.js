import { useEffect, useState } from "react";

const DURATION = 90 * 60 * 1000; // 90 dk

export function useTimer() {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const savedEnd = localStorage.getItem("remindingEndTime");
    if (savedEnd) {
      setRemaining(savedEnd - Date.now());
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const end = localStorage.getItem("remindingEndTime");
      if (!end) return;

      const diff = end - Date.now();
      setRemaining(diff);

      if (diff <= 0) {
        notify();
        localStorage.removeItem("remindingEndTime");
        setRemaining(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startTimer = () => {
    if(Notification.permission !== "granted"){
      Notification.requestPermission();
    }
    const endTime = Date.now() + DURATION;
    localStorage.setItem("remindingEndTime", endTime);
    setRemaining(DURATION);
  };

  const stopTimer = () => {
    localStorage.removeItem("remindingEndTime");
    setRemaining(0);
  };

  const notify = () => {
    if (Notification.permission === "granted") {
      new Notification("Reminder 💫", {
        body: "Su molası vakti 🦖",
      });
    } else if (Notification.permission !== "granted"){
      Notification.requestPermission();
    }
  };

  const format = (ms) => {
    if (ms <= 0) return "00:00";
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return {
    remaining,
    formatted: format(remaining),
    startTimer,
    stopTimer,
  };
}
