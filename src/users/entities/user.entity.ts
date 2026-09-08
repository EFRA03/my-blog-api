import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity({
    name: 'users',
})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    password: string;

    @CreateDateColumn({
        type: 'timestamptz',
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        name: 'updated_at'
    })
    updatedAt: Date;

    @DeleteDateColumn({
        type: 'timestamptz',
        name: 'deleted_at'
    })
    deletedAt?: Date;
}


