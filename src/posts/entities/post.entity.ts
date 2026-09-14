import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
import type { Relation } from 'typeorm';
import { Category } from './category.entity.js';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
@Entity()
export class Post {
    @ApiProperty({ description: 'El ID de la publicación' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'El título de la publicación' })
    @Column({ type: 'varchar', length: 255 })
    title:string;

    @ApiProperty({ description: 'El contenido de la publicación', nullable: true })
    @Column({ type: 'text', nullable: true })
    content: string;

    @ApiProperty({ description: 'La URL o ruta de la imagen de portada de la publicación', nullable: true })
    @Column({ type: 'varchar', length: 900, name: 'cover_image', nullable: true })
    coverImage: string;

    @ApiProperty({ description: 'El resumen de la publicación', nullable: true })
    @Column({ type: 'varchar', length: 255, name: 'summary', nullable: true })
    summary: string;

    @ApiProperty({ description: 'Indica si la publicación es un borrador', default: true })
    @Column({ type: 'boolean', default: true, name: 'is_draft' })
    isDraft: boolean;

    @ApiProperty({ description: 'La fecha y hora de creación de la publicación', type: String, format: 'date-time' })
    @CreateDateColumn({
        type: 'timestamptz',
        name: 'created_at'
    })
    createdAt: Date;

    @ApiProperty({ description: 'La fecha y hora de la última actualización de la publicación', type: String, format: 'date-time' })
    @UpdateDateColumn({
        type: 'timestamptz',
        name: 'updated_at'
    })
    updatedAt: Date;

    @ApiPropertyOptional({ description: 'La fecha y hora de eliminación lógica de la publicación', type: String, format: 'date-time', nullable: true })
    @DeleteDateColumn({
        type: 'timestamptz',
        name: 'deleted_at'
    })
    deletedAt?: Date;

    @ApiProperty({ description: 'El usuario autor de la publicación', type: () => User })
    @ManyToOne(() => User, (user) => user.posts, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    @ApiProperty({ description: 'Las categorías asociadas a la publicación', type: () => Category, isArray: true })
    @ManyToMany(() => Category, (category) => category.posts)
    @JoinTable({
        name: 'posts_categories',
        joinColumn: { name: 'post_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
    })
    categories: Category[];
}
