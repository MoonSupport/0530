import { useState } from "react";
import Queue from "./queue";

export interface Audio {
  music: string;
  audio: HTMLAudioElement;
  trigger: HTMLButtonElement;
}

const useAudio = (setList: Record<string, string>) => {
  const [currentMusic, setCurrentMusic] = useState<string | null>(null);
  const playlist = new Queue<Audio>();
  let isPlay = false;

  const on = (music: string) => {
    const top = playlist.peek();
    if (top?.music === music) return;

    const audio = new Audio(setList[music]);

    const button = document.createElement("button");
    document.body.appendChild(button);

    audio.onended = () => {
      isPlay = false;
      setCurrentMusic(null);
      const audio = playlist.dequeue();
      const trigger = audio?.trigger;
      if (trigger) document.body.removeChild(trigger);
    };

    playlist.enqueue({
      audio,
      trigger: button,
      music,
    });
  };

  return {
    on,
    isEmpty: () => playlist.isEmpty(),
    play: () => {
      const audio = playlist.peek();
      if (!audio) throw new Error("No Exist Auido");
      isPlay = true;
      setCurrentMusic(audio.music);
      audio.audio.play();
    },
    isPlay,
    currentMusic,
  };
};

export default useAudio;
