import pino from 'pino';
import {Agenda} from "@hokify/agenda";
import {MongoClient} from "mongodb";
import updateScryfallCollections from "./src/updateScryfallCollections";
import { getAgenda, TASK_NAME } from "./src/config/agenda-config";
import { createMongoClient } from "./src/config/mongo-config";

// create dependencies
const logger = pino();
let agenda = getAgenda();

// define job
agenda.define(TASK_NAME, job => updateScryfallCollections(logger, createMongoClient(), job));

(async () => {
    // start scheduler and run job
    await agenda.start();
    await agenda.create(TASK_NAME)
        .repeatAt('everyday at 00:00')
        .schedule('now')
        .unique({"unique": true})
        .save();
})();