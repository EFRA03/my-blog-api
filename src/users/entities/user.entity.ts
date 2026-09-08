import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { Profile } from './profile.entity.js';

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

    // Relacion uno a uno
    @OneToOne(() => Profile, {nullable: false, cascade: true})
    @JoinColumn({ name: 'profile_id' }) //llave foranea
    profile: Profile;
}


