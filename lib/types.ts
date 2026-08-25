export type ChatbotPosition = "bottom-right" | "bottom-left";

export type Chatbot = {
  id: string;
  user_id: string;
  name: string;
  welcome_message: string;
  system_prompt: string;
  primary_color: string;
  position: ChatbotPosition;
  is_active: boolean;
  widget_key: string;
  created_at: string;
};

export type Lead = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
  chatbot_name: string;
};
