import { Pause, Pencil, Play, Square } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [time, setTime] = useState(0);

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
    setTime(0);
  };

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return (
    <div className="bg-zinc-800 min-h-screen flex flex-col items-center justify-center">
      <div className="space-y-12">
        <div className="flex items-center justify-center font-orbitron text-8xl font-medium text-emerald-500">
          <div className="flex gap-1">
            <input
              type="text"
              maxLength={1}
              value={hoursLeft}
              readOnly={!isEditing}
              onChange={(e) => {
                const value = e.target.value;
              }}
              className={`w-[1.2ch] rounded-sm border-2 ${isEditing ? "border-emerald-500" : "border-transparent"}
               bg-zinc-800 text-center font-orbitron outline-none`}
            />
            <input
              type="text"
              maxLength={1}
              value={hoursRight}
              readOnly={!isEditing}
              onChange={(e) => {
                const value = e.target.value;
              }}
              className={`w-[1.2ch] rounded-sm border-2 ${isEditing ? "border-emerald-500" : "border-transparent"}
               bg-zinc-800 text-center font-orbitron outline-none`}
            />
          </div>
          <span>:</span>
          <div className="flex gap-1">
            <input
              type="text"
              maxLength={1}
              value={minutesLeft}
              readOnly={!isEditing}
              onChange={(e) => {
                const value = e.target.value;
              }}
              className={`w-[1.2ch] rounded-sm border-2 ${isEditing ? "border-emerald-500" : "border-transparent"}
               bg-zinc-800 text-center font-orbitron outline-none`}
            />
            <input
              type="text"
              maxLength={1}
              value={minutesRight}
              readOnly={!isEditing}
              onChange={(e) => {
                const value = e.target.value;
              }}
              className={`w-[1.2ch] rounded-sm border-2 ${isEditing ? "border-emerald-500" : "border-transparent"}
               bg-zinc-800 text-center font-orbitron outline-none`}
            />
          </div>
          <span>:</span>
          <div className="flex gap-1">
            <input
              type="text"
              maxLength={1}
              value={secondsLeft}
              readOnly={!isEditing}
              onChange={(e) => {
                const value = e.target.value;
              }}
              className={`w-[1.2ch] rounded-sm border-2 ${isEditing ? "border-emerald-500" : "border-transparent"}
               bg-zinc-800 text-center font-orbitron outline-none`}
            />
            <input
              type="text"
              maxLength={1}
              value={secondsRight}
              readOnly={!isEditing}
              onChange={(e) => {
                const value = e.target.value;
              }}
              className={`w-[1.2ch] rounded-sm border-2 ${isEditing ? "border-emerald-500" : "border-transparent"}
               bg-zinc-800 text-center font-orbitron outline-none`}
            />
          </div>
        </div>

        <div className="flex items-center justify-center space-x-8">
          <button className="bg-transparent border border-zinc-400 rounded-full p-2 hover:bg-zinc-700 transition-colors cursor-pointer">
            <Pencil size={16} className="text-zinc-400" />
          </button>
          <button className="bg-transparent border border-zinc-400 rounded-full p-2 hover:bg-zinc-700 transition-colors cursor-pointer">
            <Square size={16} className="text-red-400" />
          </button>
          <button
            className="bg-transparent border border-zinc-400 rounded-full p-2 hover:bg-zinc-700 transition-colors cursor-pointer"
            onClick={() => {}}
          >
            {isRunning ? (
              <Pause size={16} className="text-red-400" />
            ) : (
              <Play size={16} className="text-emerald-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
