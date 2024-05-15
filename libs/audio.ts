import { useEffect, useRef } from "react";

interface Audio {
  play: () => void;
  isPlay: boolean;
}

const useAudio = (filename: string, onended: () => void): Audio => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const isPlay = useRef<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(filename);

    const button = document.createElement("button");
    ref.current = button;
    document.body.appendChild(button);

    button.onclick = () => {
      audioRef.current?.play();
    };

    audioRef.current.onended = () => {
      isPlay.current = false;
      onended();
    };
  }, []);

  return {
    play: () => {
      ref.current?.click();
    },
    isPlay: isPlay.current,
  };
};

export default useAudio;
