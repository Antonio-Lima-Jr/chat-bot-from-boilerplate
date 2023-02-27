import authRoute from "./auth.route";
import ticketRoute from "./ticket.route";
import whatsRoute from "./whatsapp.route";

export default function setupRoute(app: any) {
  app.use("/ticket", ticketRoute);
  app.use("/auth", authRoute);
  app.use("/whatsapp", whatsRoute);
}
