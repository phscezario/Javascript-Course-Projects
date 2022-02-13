import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";

class CreateMessageController{
    async handle(request: Request, response: Response){
        const { characterName, message, characterOrigin } = request.body;

        const createMessageService = new CreateMessageService();

        const newMessage = await createMessageService.execute({ characterName, message, characterOrigin});

        return response.json(newMessage);
    }
}

export { CreateMessageController }