import { User } from '../../users/entities/user.entity';
import { 
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn 
} from 'typeorm';

@Entity('dispositivo')
export class Dispositivo {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  tipoDispositivo!: string;

  @Column({ type: 'varchar', length: 255 })
  marca!: string;

  @Column({ type: 'varchar', length: 100 })
  color!: string;

  // Muchos dispositivos pertenecen a un usuario
  @ManyToOne(() => User, user => user.dispositivos, { onDelete: 'CASCADE' })
  usuario! : User;
}