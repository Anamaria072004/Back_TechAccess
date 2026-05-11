import { User } from '../../users/entities/user.entity';
import { 
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ficha')
export class Ficha {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 10 })
    numficha!: string; 

    @Column({ type: 'varchar', length: 100 })
    programa!: string;

    @Column({ type: 'varchar', length: 20 })
    nivelFormacion!: string;

    @Column({ type: 'varchar', length: 20 })
    jornada!: string;

    @Column({ type: 'varchar', length: 20 })
    estado!: string;

    @Column({ type: 'date' })  
    fechaInicio!: Date;

    @Column({ type: 'date' })
    fechafin!: Date;

    @OneToMany(() => User, user => user.fichas)
    users!: User[];
}