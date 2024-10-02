import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
    const formData = await request.formData();

    const file = formData.get('file') as File;

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const fileName = file.name;

    const buffer: any = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(process.cwd(), 'uploads', fileName);

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ success: true });
}
