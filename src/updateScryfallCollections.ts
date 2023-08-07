import {Job} from "@hokify/agenda";
import {Logger} from "pino";
import {MongoClient} from "mongodb";

export default async function updateScryfallCollections(logger: Logger, mongo: MongoClient, job: Job) {
    logger.info("Beginning to update scryfall collection");
    logger.info("scryfall bulk data not updated, trying again in an hour.");
    job.schedule('1 hour');
}