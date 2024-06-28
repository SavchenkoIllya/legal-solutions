// const TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
// const TELEGRAM_API_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
const TG_CHATS_URL = `https://api.telegram.org/bot${TELEGRAM_API_KEY}/getUpdates`;
const TG_SEND_URL = `https://api.telegram.org/bot${TELEGRAM_API_KEY}/sendMessage`;

const ERROR_TEXT = "Cannot get chats from Telegram API";

export interface TelegramUpdate {
  update_id: number;
  message: Message;
}

interface Message {
  message_id: number;
  from: From;
  chat: Chat;
  date: number;
  text: string;
}

interface Chat {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  type: string;
}

interface From {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
}

export const getChatsId: () => Promise<Set<unknown>> = async () => {
  try {
    const response = await fetch(TG_CHATS_URL, {
      next: { revalidate: 0 },
    });
    const data = await response.json();

    console.log(data);
    
    return new Set<string>(
      data.result.map((res: TelegramUpdate) => String(res.message.chat.id))
    );
  } catch (error) {
    throw new Error(ERROR_TEXT);
  }
};

const parseDataIntoText = (dataObject: Record<string, any>) => {
  const keys = Object.keys(dataObject);
  if (!keys) {
    throw new Error("No data provided");
  }
  return keys
    .map((key) => (dataObject[key] ? `${key} : ${dataObject[key]}\n` : ""))
    .join("");
};

export const sendMessage = async (
  chatId: string,
  text: string
): Promise<void> => {
  const body = {
    chat_id: chatId,
    text: text,
  };

  try {
    const response = await fetch(TG_SEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Ошибка отправки сообщения: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.ok) {
      throw new Error(`Ошибка API Telegram: ${data.description}`);
    }
  } catch (error) {
    console.error("Ошибка при отправке сообщения в Telegram:", error);
    throw error;
  }
};

export const sendParsedDataToChats = async (
  dataObject: Record<string, any>
): Promise<void> => {
  try {
    const chatIds = await getChatsId();
    const text = parseDataIntoText(dataObject);

    chatIds.forEach(async (chatId) => {
      await sendMessage(chatId as string, text);
    });
  } catch (error) {
    console.error("Error in sendParsedDataToChats:", error);
    throw error;
  }
};
