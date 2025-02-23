"use client";
import { useState, useEffect } from "react";

const useTimer = (initialMinutes: number) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudio(new Audio("/alarm.mp3"));
    }
  }, []);

  const playSound = () =>{
    setIsAlarmPlaying(true);
    if (audio) {
      audio.loop = true;
      audio.play();
    }
  }

  const stopSound = () => {
    setIsAlarmPlaying(false);
    if(audio){
        audio.pause();
        audio.currentTime = 0;
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isRunning) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsRunning(false);
            playSound();
            if (timer) clearInterval(timer);
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    } else {
      if (timer) clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, minutes, seconds]);


  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = (newMinutes?: number) => {
    setIsRunning(false);
    setMinutes(newMinutes !== undefined ? newMinutes : initialMinutes);
    setSeconds(0);
  };

  return { minutes, seconds, isRunning, startTimer, pauseTimer, resetTimer, setMinutes, isAlarmPlaying, playSound, stopSound };
};

export default useTimer;
