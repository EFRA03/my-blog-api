import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Post } from '../entities/post.entity.js';
@Entity({
    name: 'categories',
})
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    // agregado
    // se tiene que tomar encuenta que al momento de modificar una tabla y 
    // queremos agregar alguna columna siempre tenemos que poner en nullable en true
    // porque ya datos pasados no contaban con esa informacion
    @Column({ type: 'varchar', length: 800, nullable: true })
    description: string;
    // agregando
    @Column({ type: 'varchar', length: 800, nullable: true, name: 'cover_imager' })
    coverImage: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updateAt: Date;

    @ManyToMany(() => Post, (post) => post.categories)
    posts: Post[];
}