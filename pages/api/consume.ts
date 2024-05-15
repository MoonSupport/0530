// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Database, { Record } from "@/libs/db";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type Data = {
  data: Record[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const filePath = path.join(process.cwd(), "public", "queue");
  const db = new Database(filePath);
  const records = db.consumeRecords();

  res.status(200).json({ data: records });
}
