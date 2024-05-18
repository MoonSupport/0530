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
    "1": "1.mp3",
    "2": "2.mp3",
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
      {playlist.currentMusic === "1" ? "1" : "노래 안함"}
    </main>
  );
}
