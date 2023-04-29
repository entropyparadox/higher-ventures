import { Column, Entity } from 'typeorm';

import { Role } from '../common/enum';
import { TypeOrmEntity } from '../common/typeorm.entity';

@Entity()
export class User extends TypeOrmEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('enum', { enum: Role, default: Role.USER })
  role: Role;

  @Column()
  name: string;
}
