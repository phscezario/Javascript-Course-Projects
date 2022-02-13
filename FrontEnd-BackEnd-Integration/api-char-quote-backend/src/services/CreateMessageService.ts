import { getCustomRepository } from "typeorm";
import { MessagesRepository } from "../repository/MessagesRepository";

interface IMessage {
    characterName: string;
    message: string;
    characterOrigin: string;
}

class CreateMessageService {
    async execute({characterName, message, characterOrigin}: IMessage){
        const messageRepository = getCustomRepository(MessagesRepository);

        if(!characterName){
            throw new Error("Please insert character name!")
        }

        if(!message){
            throw new Error("Please insert character message!")
        }

        if(!characterOrigin){
            throw new Error("Please insert character origin!")
        }

        const newMessage = messageRepository.create({ characterName, message, characterOrigin })

        await messageRepository.save(newMessage);

        return newMessage;
    }
}

export  { CreateMessageService }