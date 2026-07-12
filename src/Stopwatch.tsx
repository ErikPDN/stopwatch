import { Check, Pause, Pencil, Play, Square } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const START_TIME = 60;

export default function Stopwatch() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [time, setTime] = useState(START_TIME);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [hoursLeft, hoursRight] = String(hours).padStart(2, "0").split("");
  const [minutesLeft, minutesRight] = String(minutes)
    .padStart(2, "0")
    .split("");
  const [secondsLeft, secondsRight] = String(seconds)
    .padStart(2, "0")
    .split("");

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(START_TIME);
    setIsEditing(false);
  };

  const updateTime = (
    part: "hours" | "minutes" | "seconds",
    leftDigit: string,
    rightDigit: string,
  ) => {
    if (!/^\d$/.test(leftDigit) || !/^\d$/.test(rightDigit)) {
      return; // Ignore if either digit is not a single digit
    }

    const h =
      part === "hours"
        ? Number(`${leftDigit}${rightDigit}`)
        : Math.floor(time / 3600);
    const m =
      part === "minutes"
        ? Number(`${leftDigit}${rightDigit}`)
        : Math.floor((time % 3600) / 60);
    const s =
      part === "seconds" ? Number(`${leftDigit}${rightDigit}`) : time % 60;

    const newTime = h * 3600 + m * 60 + s;
    setTime(newTime);
  };

  const handleDigitChange = (
    part: "hours" | "minutes" | "seconds",
    side: "left" | "right",
    rawValue: string,
  ) => {
    const digit = rawValue.replaceAll(/\D/g, "").slice(-1); // Keep only the last digit
    const currentLeft =
      part === "hours"
        ? hoursLeft
        : part === "minutes"
          ? minutesLeft
          : secondsLeft;
    const currentRight =
      part === "hours"
        ? hoursRight
        : part === "minutes"
          ? minutesRight
          : secondsRight;

    if (side === "left") {
      updateTime(part, digit, currentRight);
    } else {
      updateTime(part, currentLeft, digit);
    }
  };

  // TODO: ajustar logica para quando pausar ou resetar o timer, o som de contagem regressiva deve parar ou reiniciar
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 1;

        if (newTime === 10) {
          const audio = new Audio("/countdown.mp3");
          audio.play();
        }

        if (newTime <= 0) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          return 0;
        }

        return newTime;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  // TODO: ajustar design para ficar vermelho quando o tempo estiver acabando
  return (
    <div className="bg-zinc-800 min-h-screen flex flex-col items-center justify-center">
      <div className="space-y-12">
        <div className="flex items-center justify-center font-orbitron text-8xl font-medium text-emerald-500 tracking-tighter">
          <div className="flex gap-0">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={hoursLeft}
              readOnly={!isEditing}
              onChange={(e) =>
                handleDigitChange("hours", "left", e.target.value)
              }
              onFocus={(e) => e.target.select()}
              className={`w-[1ch] p-0 rounded-sm border-2 ${isEditing ? "border-emerald-500" : "border-transparent"}
               bg-zinc-800 text-center font-orbitron outline-none`}
            />
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={hoursRight}
              readOnly={!isEditing}
              onChange={(e) =>
                handleDigitChange("hours", "right", e.target.value)
              }
              className={`w-[1ch] p-0 rounded-sm border-2 ${isEditing ? "border-emerald-500" : "border-transparent"}
               bg-zinc-800 text-center font-orbitron outline-none`}
            />
          </div>
          <span>:</span>
          <div className="flex gap-0">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={minutesLeft}
              readOnly={!isEditing}
              onChange={(e) => {
                handleDigitChange("minutes", "left", e.target.value);
              }}
              onFocus={(e) => e.target.select()}
              className={`w-[1ch] p-0 rounded-sm border-2 ${isEditing ? "border-emerald-500" : "border-transparent"}
               bg-zinc-800 text-center font-orbitron outline-none`}
            />
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={minutesRight}
              readOnly={!isEditing}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                handleDigitChange("minutes", "right", e.target.value);
              }}
              className={`w-[1ch] p-0 rounded-sm border-2 ${isEditing ? "border-emerald-500" : "border-transparent"}
               bg-zinc-800 text-center font-orbitron outline-none`}
            />
          </div>
          <span>:</span>
          <div className="flex gap-0">
            <input
              type="text"
              pattern="[0-9]*"
              maxLength={1}
              value={secondsLeft}
              readOnly={!isEditing}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                handleDigitChange("seconds", "left", e.target.value);
              }}
              className={`w-[1ch] p-0 rounded-sm border-2 ${isEditing ? "border-emerald-500" : "border-transparent"}
               bg-zinc-800 text-center font-orbitron outline-none`}
            />
            <input
              type="text"
              pattern="[0-9]*"
              maxLength={1}
              value={secondsRight}
              readOnly={!isEditing}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                handleDigitChange("seconds", "right", e.target.value);
              }}
              className={`w-[1ch] p-0 rounded-sm border-2 ${isEditing ? "border-emerald-500" : "border-transparent"}
               bg-zinc-800 text-center font-orbitron outline-none`}
            />
          </div>
        </div>

        <div className="flex items-center justify-center space-x-8">
          <button
            onClick={() => {
              handlePause();
              setIsEditing((prev) => !prev);
            }}
            className="bg-transparent border border-zinc-700 rounded-full p-2 hover:bg-zinc-700 transition-colors duration-300 cursor-pointer"
          >
            {isEditing ? (
              <Check size={16} className="text-emerald-400" />
            ) : (
              <Pencil size={16} className="text-zinc-400" />
            )}
          </button>
          {!isEditing && (
            <>
              <button
                onClick={handleReset}
                className="bg-transparent border border-zinc-700 rounded-full p-2 hover:bg-zinc-700 transition-colors duration-300 cursor-pointer"
              >
                <Square size={16} className="text-red-400" />
              </button>
              <button
                onClick={isRunning ? handlePause : handleStart}
                className="bg-transparent border border-zinc-700 rounded-full p-2 hover:bg-zinc-700 transition-colors duration-300 cursor-pointer"
              >
                {isRunning ? (
                  <Pause size={16} className="text-red-400" />
                ) : (
                  <Play size={16} className="text-emerald-400" />
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
