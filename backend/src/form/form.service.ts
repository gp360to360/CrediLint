import { Injectable } from '@nestjs/common';
import { FromRepository } from './form.repository';
import { CreateFormDto } from './dto/form.dto';
import { Form } from './form.entity';

@Injectable()
export class FormService {
  constructor(private formRepo: FromRepository) {}

  async formCreate(createDto: CreateFormDto, fileName: string): Promise<Form> {
    const form = this.formRepo.create({
      ...createDto,
      filePath: fileName ? `uploads/${fileName}` : null,
    });
    await this.formRepo.save(form);
    return form;
  }
}
