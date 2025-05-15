import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Form {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column() companyUEN: string;
  @Column() companyName: string;
  @Column() fullName: string;
  @Column() position: string;
  @Column() email: string;
  @Column() reEmail: string;
  @Column() mobile: string;
  @Column() filePath: string;
}
