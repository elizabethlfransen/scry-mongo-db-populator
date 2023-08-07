import pino from 'pino';
import {Agenda} from "@hokify/agenda";
import {MongoClient} from "mongodb";
import updateScryfallCollections from "./src/updateScryfallCollections";

const logger = pino();

const createMongoClient = () => new MongoClient(process.env.SMDP_AGENDA_MONGO_DB_URL!);

const agenda = new Agenda(
    {
        db: {
            address: process.env.SMDP_AGENDA_MONGO_DB_URL!
        }
    }
);

agenda.define('update scryfall collections', job => updateScryfallCollections(logger, createMongoClient(), job));

agenda.define('another job', job => logger.info("logging"));

(async () => {
    await agenda.start();
    await agenda.create('update scryfall collections')
        .repeatAt('everyday at 00:00')
        .schedule('now')
        .unique({"unique": true})
        .save();

    await agenda.create('another job')
        .repeatAt('everyday at 00:00')
        .schedule('now')
        .unique({"unique": true})
        .save();
})();