"use client";
import { useState } from "react";
import useTimer from "../app/hooks/useTimer";
import AlarmModal from "./AlarmModal";

const Timer = () => {
  const MODOS = {
    pomodoro: 25,
    curto: 5,
    longo: 15,
  };

  const [activeMode, setActiveMode] = useState<keyof typeof MODOS>("pomodoro");
  const { minutes, seconds, isRunning, startTimer, pauseTimer, resetTimer, stopSound, isAlarmPlaying } = useTimer(MODOS[activeMode]);

  const changeMode = (modo: keyof typeof MODOS) => {
    setActiveMode(modo);
    resetTimer(MODOS[modo]);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-900 text-white rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold">Pomodoro</h1>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => changeMode("pomodoro")}
          className={`px-4 py-2 rounded-xl ${activeMode === "pomodoro" ? "bg-red-500" : "bg-gray-700"}`}
        >
          Pomodoro
        </button>
        <button
          onClick={() => changeMode("curto")}
          className={`px-4 py-2 rounded-xl ${activeMode === "curto" ? "bg-blue-500" : "bg-gray-700"}`}
        >
          Descanso Curto
        </button>
        <button
          onClick={() => changeMode("longo")}
          className={`px-4 py-2 rounded-xl ${activeMode === "longo" ? "bg-green-500" : "bg-gray-700"}`}
        >
          Descanso Longo
        </button>
      </div>

      {/* Timer */}
      <p className="text-6xl font-mono mt-4">{`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}</p>

      {/* Controller */}
      <div className="mt-4 flex gap-4">
        {isRunning ? (
          <button onClick={pauseTimer} className="bg-red-500 px-4 py-2 rounded-xl">Pausar</button>
        ) : (
          <button onClick={startTimer} className="bg-green-500 px-4 py-2 rounded-xl">Iniciar</button>
        )}
        <button onClick={() => resetTimer(MODOS[activeMode])} className="bg-blue-500 px-4 py-2 rounded-xl">Resetar</button>
      </div>

      <AlarmModal isOpen={isAlarmPlaying} onClose={stopSound} />
    </div>
  );
};

export default Timer;
