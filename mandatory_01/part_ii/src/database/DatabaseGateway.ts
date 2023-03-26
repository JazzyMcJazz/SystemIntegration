import { PrismaClient } from "@prisma/client";
import ChatMessage from "./repos/ChatMessage.js";
import Webhook from "./repos/WebhookRepo.js";

class DatabaseGateway {
  private db = new PrismaClient();
  
  public webhook = new Webhook(this.db);
  public message = new ChatMessage(this.db);
}

export default new DatabaseGateway();