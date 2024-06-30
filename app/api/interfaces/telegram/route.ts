import { sql } from "@vercel/postgres";

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

//  DATA EXAMPLE
// {
//     update_id: 103415295,
//     message: {
//       message_id: 69,
//       from: {
//         id: 678405920,
//         is_bot: false,
//         first_name: 'Illya',
//         last_name: 'Savchenko',
//         username: 'SavchenkoI',
//         language_code: 'ru'
//       },
//       chat: {
//         id: 678405920,
//         first_name: 'Illya',
//         last_name: 'Savchenko',
//         username: 'SavchenkoI',
//         type: 'private'
//       },
//       date: 1719789178,
//       text: 'sfdfs'
//     }
//   }

export async function POST(req: Request) {
    const body = await req.json();

    // Обработка входящего сообщения от Telegram
    if (body.message) {
        const { id, username } = body.message.chat
        const text: string = 'You have been successfully subscribed!';
        try {
            await sql`INSERT INTO telegram_admins (username, chat_id)
                      VALUES (${username}, ${id})
                      ON CONFLICT (username) DO NOTHING;`;
        } catch (error) {
            return Response.json({ success: false });
        }

        // Отправка сообщения обратно через Telegram API
        await fetch(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: id,
                text: text,
            }),
        });

        return Response.json({ success: true });
    } else {
        return Response.json({ success: false });
    }
}
