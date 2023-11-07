import { Product } from 'src/products/product.entity';
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
  OneToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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
  @OneToMany(() => Product, (product) => product.id)
  @JoinTable()
  product: Product;

  @AfterInsert()
  Insertlog() {
    console.log('Category is generated with id', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Category is updated with id', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Category is removed with id', this.id);
  }
}
