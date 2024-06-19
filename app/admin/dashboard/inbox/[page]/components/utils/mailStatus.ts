import { changeMailStatus } from "@/app/api/interfaces/mails/mails.api";
import { IsReadStates } from "@/app/api/interfaces/mails/types";

type IsReadValues = {
    styles: string;
    text: string;
    callback?: (id: number) => Promise<void>;
    next?: IsReadStates;
  };
  
  type MailModalStatus = Record<IsReadStates, IsReadValues>;
  
  export const mailStatus: MailModalStatus = {
    read: {
      styles: "bg-blue-600",
      text: "Read",
      next: "progress",
      async callback(id: number) {
        if (this.next) await changeMailStatus(id, this.next);
      },
    },
    unread: {
      styles: "bg-zinc-600",
      text: "Unread",
      next: "read",
      async callback(id: number) {
        if (this.next) await changeMailStatus(id, this.next);
      },
    },
    progress: {
      styles: "bg-orange-600",
      text: "In Progress",
      next: "complete",
      async callback(id: number) {
        if (this.next) await changeMailStatus(id, this.next);
      },
    },
    complete: {
      styles: "bg-green-600",
      text: "Complete",
    },
  };