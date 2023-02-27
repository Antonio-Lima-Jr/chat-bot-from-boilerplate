import { fetch } from 'cross-fetch';
import { RequestHandler } from 'express';
import logger from '../utils/logger';

let received_updates: any = [];
const urlSendMessage = process.env.WHATSAPP_SEND_URL || "";
const tokenToSendMessage = process.env.WHATSAPP_TOKEN || "";
const phoneTest = process.env.WHATSAPP_TO_TEST || "";
const tokenVerificationMeta = process.env.WHATSAPP_VERIFY_TOKEN || "";

// TODO: Refatorar o código e criar uma classe para o envio de mensagens
export const whatsReceiver: RequestHandler = async (req, res) => {
    logger.info(req.body);
    let nameUser = req.body.entry[0].changes[0].value.contacts[0].profile.name;
    let phoneUser = req.body.entry[0].changes[0].value.contacts[0].wa_id;
    // let message = req.body.entry[0].changes[0].value.messages.text.body;

    const data = {
        messaging_product: "whatsapp",
        to: phoneTest,
        recipient_type: "individual",
        type: "interactive",
        interactive: {
            type: "button",
            body: {
                text: "Olá " + nameUser + ",\ntudo bem?\nSeja bem vindo ao nosso atendimento.\nComo podemos te ajudar?\n\nDeseja adquirir um imovel ou vender um imovel?",
            },
            action: {
                buttons: [
                    {
                        type: "reply",
                        reply: {
                            id: "butonComprar",
                            title: "COMPRAR"
                        }
                    },
                    {
                        type: "reply",
                        reply: {
                            id: "ButonVender",
                            title: "VENDER"
                        }
                    }
                ]
            }
        }
    }

    const response = await fetch(urlSendMessage, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenToSendMessage}`
        },
    });

    if (response.status === 200) {
        logger.info("Mensagem enviada com sucesso!");
    } else {
        logger.error("Erro ao enviar mensagem!");
    }

    res.sendStatus(response.status);
    received_updates.unshift(req.body);
};
export const whatsValidate: RequestHandler = async (req, res) => {
    if (
        req.query['hub.mode'] == 'subscribe' &&
        req.query['hub.verify_token'] == tokenVerificationMeta
    ) {
        res.send(req.query['hub.challenge']);
    } else {
        res.sendStatus(400);
    }
};

export const listAll: RequestHandler = async (req, res) => {
    res.send('<pre>' + JSON.stringify(received_updates, null, 2) + '</pre>');
};
