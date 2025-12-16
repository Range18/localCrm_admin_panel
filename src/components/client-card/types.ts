export type ClientSource = "telegram" | "whatsapp";

export type ClientCardData = {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;

    source: ClientSource;
    telegramUsername?: string;

    imageUrl?: string;
};