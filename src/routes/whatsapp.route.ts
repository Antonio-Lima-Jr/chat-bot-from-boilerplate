import { whatsReceiver, whatsValidate, listAll } from './../controller/whats.controller';
import { Router } from "express";
import { createTicket, getOneTicket } from "../controller/tiket.controller";

const whatsRoute = Router();

whatsRoute.get("/", listAll);
whatsRoute.get("/messenger", whatsValidate);
whatsRoute.post("/messenger", whatsReceiver);

export default whatsRoute;