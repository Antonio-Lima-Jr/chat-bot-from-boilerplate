import { RequestHandler } from 'express';

let received_updates:any = [];

export const whatsReceiver: RequestHandler = async (req, res) => {

    received_updates.unshift(req.body);
    res.sendStatus(200);
};
export const whatsValidate: RequestHandler = async (req, res) => {
    if (
        req.query['hub.mode'] == 'subscribe' &&
        req.query['hub.verify_token'] == process.env.WHATSAPP_VERIFY_TOKEN
    ) {
        res.send(req.query['hub.challenge']);
    } else {
        res.sendStatus(400);
    }
};

export const listAll: RequestHandler = async (req, res) => {
    res.send('<pre>' + JSON.stringify(received_updates, null, 2) + '</pre>');
};
