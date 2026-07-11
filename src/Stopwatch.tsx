import { Pause, Pencil, Play, Square } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {}, [isRunning, time]);

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time: number) => {
    return new Date(time).toISOString().substr(11, 8);
  };

  return (
    <div className="bg-zinc-800 min-h-screen flex flex-col items-center justify-center">
      <div className="space-y-10">
        <h1 className="text-8xl text-emerald-500 font-orbitron tracking-widest">
          {formatTime(time)}
        </h1>
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
