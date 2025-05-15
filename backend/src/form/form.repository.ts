import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Form } from './form.entity';

@Injectable()
export class FromRepository extends Repository<Form> {
  constructor(private dataSource: DataSource) {
    super(Form, dataSource.createEntityManager());
  }
}
