import { sql } from "@vercel/postgres";

const TELEGRAM_API_TOKEN = process.env.TELEGRAM_API_KEY || ""

export async function POST(req: Request) {
    const body = await req.json();

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
