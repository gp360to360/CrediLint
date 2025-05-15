import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { FormService } from './form.service';
import { CreateFormDto } from './dto/form.dto';

// Utils for file handling
const generateFilename = (file: Express.Multer.File): string => {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const ext = extname(file.originalname);
  return `${file.fieldname}-${uniqueSuffix}${ext}`;
};

const pdfFileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: any, acceptFile: boolean) => void,
): void => {
  if (!file.originalname.match(/\.pdf$/i)) {
    return callback(
      new BadRequestException('Only PDF files are allowed!'),
      false,
    );
  }
  callback(null, true);
};

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) =>
          callback(null, generateFilename(file)),
      }),
      fileFilter: pdfFileFilter,
    }),
  )
  async createForm(
    @Body() createFormDto: CreateFormDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    return this.formService.formCreate(createFormDto, file.filename);
  }
}
