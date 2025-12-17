import type {MasterDto} from "../../api/masters/MasterDto.ts";
import type {MasterCardData} from "../../components/master-card/MasterCard.tsx";

export function mapMasterDtoToCard(master: MasterDto): MasterCardData {
    //TODO
    return {
        id: String(master.id),
        firstName: master.name,
        lastName: master.surname,
        description: "Любые стрижки",
        specialization: "ТОП-Мастер",
    };
}