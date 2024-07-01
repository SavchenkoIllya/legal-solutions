import TelegramBot from 'node-telegram-bot-api';
const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY || "";

const bot = new TelegramBot(TELEGRAM_API_KEY, { polling: true });

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
  try {
    await bot.sendMessage(chatId, text);
  } catch (error) {
    console.error("Ошибка при отправке сообщения в Telegram:", error);
    throw error;
  }
};

export const convertChatIds = (idsObjectArray: { chat_id: string }[]) => idsObjectArray.map((element) => element.chat_id)

export const sendParsedDataToChats = async (
  dataObject: Record<string, any>,
  chatIds: string[]
): Promise<void> => {
  try {
    const text = parseDataIntoText(dataObject);

    chatIds.forEach(async (chatId) => {
      await sendMessage(chatId, text);
    });
  } catch (error) {
    console.error("Error in sendParsedDataToChats:", error);
    throw error;
  }
};
