import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity("messages")
class Message {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    characterName: string;

    @Column()
    message: string;

    @Column()
    characterOrigin: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id){
            this.id = uuid();
        }
    }
}

export { Message }
