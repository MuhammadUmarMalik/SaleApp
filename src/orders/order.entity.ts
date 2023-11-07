import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  destination: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  order_date: Date;

  @Column()
  items: number;

  @Column()
  phone_number: number;
  @Column()
  delivery_status: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinTable()
  user: User;
  @ManyToOne(() => Product, (product) => product.id)
  @JoinTable()
  product: Product;
  @AfterInsert()
  Insertlog() {
    console.log('Order is placed with id', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Order is updated with id', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Order is canceled with id', this.id);
  }
}
