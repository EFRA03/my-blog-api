import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    OneToMany,
    JoinColumn,
    BeforeInsert
} from 'typeorm';
import * as bcrypt from 'bcrypt'; // para el hashing
import { Profile } from './profile.entity.js';
import { Post } from '../../posts/entities/post.entity.js';

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

    // Un usuario puede tener muchos posts
    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

    // Hooks
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }
}


