import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
    const { chatId, username } = await req.json();

    try {
        await sql`INSERT INTO telegram_admins (username, chat_id)
                  VALUES (${username}, ${chatId})
                  ON CONFLICT (username) DO NOTHING;`;
        return Response.json({ success: true });
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong writing new telegram_admin");
    }

}