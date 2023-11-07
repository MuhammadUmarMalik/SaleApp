import { Category } from 'src/category/category.entity';
import { Order } from 'src/orders/order.entity';
import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  retail: number;

  @Column()
  quantity: number;

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

  //relationship
  @OneToMany(() => Order, (order) => order.id)
  @JoinTable()
  order: Order[];

  @OneToMany(() => Category, (category) => category.id)
  @JoinTable()
  category: Category[];

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
