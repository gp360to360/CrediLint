import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsNull } from 'typeorm';

export class CreateFormDto {
  @IsString()
  @IsNotEmpty()
  companyUEN: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsEmail()
  email: string;

  @IsEmail()
  reEmail: string;

  mobile: string;

  //   @IsOptional()
  //   @IsNull(true)
  @Type(() => Object)
  file?: any;

  @IsNotEmpty()
  termsAccepted: boolean;
}
