import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from 'typeorm';

@Entity({
    name: 'profiles',
})
export class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 150
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 200
    })
    last_name: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    avatar?: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @DeleteDateColumn({ 
        type: 'timestamptz', 
        name: 'deleted_at' })
    deletedAt?: Date;
}