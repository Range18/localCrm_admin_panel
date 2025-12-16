import type {ClientCardData} from "../../components/client-card/types";
import type {ClientDto} from "../../api/clients/ClientDto";

export function mapClientDtoToCard(c: ClientDto): ClientCardData {
    return {
        id: String(c.id),
        firstName: c.name,
        lastName: c.surname,
        phone: c.phone,
        source: c.tg_id ? "telegram" : "whatsapp",
        telegramUsername: c.tg_id ?? undefined,
    };
}