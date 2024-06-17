import { NextResponse } from "next/server";
import { put, del, list } from "@vercel/blob";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;

  // TODO : add webpm converter

  if (!file.name) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const blob = await put(file.name, file, {
    access: "public",
  });

  return Response.json(blob);
}

export async function getBlobs() {
  const { blobs } = await list();
  return blobs;
}

export async function DELETE(req: Request) {
  const reqBody = await req.json();
  const url = reqBody.url;
  if (!url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }
  await del(url);
  return Response.json({ success: true });
}
