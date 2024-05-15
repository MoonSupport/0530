// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";
import Database from "@/libs/db";
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const filePath = path.join(process.cwd(), "public", "queue");
  const db = new Database(filePath);

  db.addRecord(req.query.value);

  res.status(200).json({ name: "John Doe" });
}
