// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Database from "@/libs/db";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type Data = {
  data: any[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const filePath = path.join(process.cwd(), "public", "queue");
  const db = new Database(filePath);
  const records = db.consumeRecords();

  console.log("records:");
  res.status(200).json({ data: records });
}
