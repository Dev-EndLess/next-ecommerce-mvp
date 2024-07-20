"use server";

import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

export async function GET(
  request: NextRequest,
  {
    params: { downloadVerificationId },
  }: {
    params: { downloadVerificationId: string };
  }
) {
  const data = await db.downloadVerification.findUnique({
    where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
    select: { product: { select: { name: true, filePath: true } } },
  });

  if (data == null) {
    return NextResponse.redirect(
      new URL("/product/download/expired", request.url)
    );
  }

  const {size} = await fs.stat(data.product.filePath);
  const file = await fs.readFile(data.product.filePath);
  const extension = data.product.filePath.split(".").pop();

  return new Response(file, {
    status: 200,
    headers: {
      "Content-Disposition": `attachment; filename="${data.product.name}.${extension}"`,
      "Content-Length": size.toString(),
    },
  });
}
