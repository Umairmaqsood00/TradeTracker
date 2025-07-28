import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';

// Ensure the uploads directory exists
async function ensureUploadDir(dir: string) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (e) {
    // directory already exists
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await ensureUploadDir(uploadsDir);

  const filename = `${uuid()}_${file.name}`;
  const filepath = path.join(uploadsDir, filename);
  await writeFile(filepath, buffer);

  const url = `/uploads/${filename}`;
  return NextResponse.json({ url }, { status: 201 });
} 