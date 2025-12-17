import type {ServiceDto} from "../../api/services/ServiceDto.ts";
import type {ServiceCardData} from "../../components/service-card/ServiceCard.tsx";

export function mapServiceDtoToCard(service: ServiceDto): ServiceCardData {
    //TODO
    return {
        id: String(service.id),
        title: service.name,
        description: service.description,
        durationMin: service.duration,
        price: service.default_price,
        currency: "RUB",
    };
}