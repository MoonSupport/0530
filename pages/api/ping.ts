// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Database, { Record } from "@/libs/db";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default function handler(req: any, res: NextApiResponse) {
  res.status(200);
  res.send("good");
}
