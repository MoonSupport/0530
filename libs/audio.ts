import Queue from "./queue";

export interface Audio {
  filename: string;
  audio: HTMLAudioElement;
  trigger: HTMLButtonElement;
}

const useAudio = () => {
  const playlist = new Queue<Audio>();
  let isPlay = false;

  const on = (filename: string) => {
    const top = playlist.peek();
    if (top?.filename === filename) return;

    const audio = new Audio(filename);

    const button = document.createElement("button");
    document.body.appendChild(button);

    audio.onended = () => {
      isPlay = false;
      const audio = playlist.dequeue();
      const trigger = audio?.trigger;
      if (trigger) document.body.removeChild(trigger);
    };

    playlist.enqueue({
      audio,
      trigger: button,
      filename,
    });
  };

  return {
    on,
    isEmpty: () => playlist.isEmpty(),
    play: () => {
      const audio = playlist.peek();
      if (!audio) throw new Error("No Exist Auido");

      audio.audio.play();
    },
    isPlay,
  };
};

export default useAudio;
