import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import useAudio, { Audio } from "@/libs/audio";

const inter = Inter({ subsets: ["latin"] });

type Record = {
  id: number;
  data: any;
};

export default function Home() {
  const playlist = useAudio({
    "1": "노아.mp3",
    "2": "밤비.mp3",
    "3": "예준.mp3",
    "4": "은호.mp3",
    "5": "하민.mp3",
  });

  useEffect(() => {
    const loop = () => {
      if (!playlist.isEmpty() && !playlist.isPlay) {
        playlist.play();
      }
      requestAnimationFrame(loop);
    };

    loop();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      fetch("http://localhost:3000/api/consume").then(async (v) => {
        const { data } = await v.json();
        data.forEach((v: Record) => {
          playlist.on(`${v.data}`);
        });
      });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {playlist.currentMusic}
    </main>
  );
}
