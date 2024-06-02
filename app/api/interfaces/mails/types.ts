type IsReadStates = "unread" | "read" | "progress" | "complete";

export interface Mail {
  id: number;
  name: string;
  phone: string;
  email?: string | undefined;
  comment?: string | undefined;
  region?: string | undefined;
  created_at?: Date | undefined;
  is_read: IsReadStates;
}
