import { Agenda } from "@hokify/agenda";
import { MONGO_CONNECTION_STRING } from "./mongo-config";

export const TASK_NAME = 'update-scryfall-collections';
type AgendaConfig = ConstructorParameters<typeof Agenda>[0]
const AGENDA_CONFIG: AgendaConfig = {
    db: {
        address: MONGO_CONNECTION_STRING!,
    },
};

let agenda: Agenda | undefined;

export function getAgenda() {
    if(agenda == undefined)
        agenda = new Agenda(AGENDA_CONFIG);
    return agenda;
}