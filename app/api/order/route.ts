import { BookingHandler } from "@/scripts/BookingHandler";
import { NextApiRequest, NextApiResponse } from "next";


export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const bookingHandler = new BookingHandler();
    const result = await bookingHandler.initialize();
    return Response.json({ message: 'BookingHandler initialized successfully.', init: result } );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to initialize BookingHandler.' });
  }
}