import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from 'next';

const TELEGRAM_API_TOKEN = process.env.TELEGRAM_API_KEY || ""

// export async function POST(req: Request) {
//     const { chatId, username } = await req.json();

//     try {
//         await sql`INSERT INTO telegram_admins (username, chat_id)
//                   VALUES (${username}, ${chatId})
//                   ON CONFLICT (username) DO NOTHING;`;
//         return Response.json({ success: true });
//     } catch (error) {
//         console.error(error);
//         throw new Error("Something went wrong writing new telegram_admin");
//     }

// }

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);
    return Response.json({ success: true });

    // // Обработка входящего сообщения от Telegram
    // if (body.message) {
    //     const { id, username } = body.message.chat
    //     const chatId: number = body.message.chat.id;
    //     const text: string = 'You have been successfully subscribed!';
    //     try {
    //         await sql`INSERT INTO telegram_admins (username, chat_id)
    //                   VALUES (${username}, ${id})
    //                   ON CONFLICT (username) DO NOTHING;`;
    //     } catch (error) {
    //         return res.status(400);
    //     }

    //     // Отправка сообщения обратно через Telegram API
    //     await fetch(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             chat_id: chatId,
    //             text: text,
    //         }),
    //     });

    //     return res.status(200).json({ status: 'ok' });
    // } else {
    //     return res.status(200).json({ status: 'no message' });
    // }
}
