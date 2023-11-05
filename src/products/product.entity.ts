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
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: string;

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

  @OneToMany(() => Order, (order) => order.id)
  order: Order[];

  @OneToMany(() => Product, (product) => product.categoryId)
  products: Product[];

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
