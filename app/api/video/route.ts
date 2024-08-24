import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const videoPath = path.resolve('.', 'public', 'videos/pubkey-export.mp4');
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.get('range');

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize) {
      return new NextResponse('Requested range not satisfiable\n' + start + ' >= ' + fileSize, {
        status: 416,
      });
    }

    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = new Headers({
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize.toString(),
      'Content-Type': 'video/mp4',
    });

    return new NextResponse(file as any, {
      status: 206,
      headers: head,
    });
  } else {
    const head = new Headers({
      'Content-Length': fileSize.toString(),
      'Content-Type': 'video/mp4',
    });

    const file = fs.createReadStream(videoPath);
    return new NextResponse(file as any, {
      status: 200,
      headers: head,
    });
  }
}
