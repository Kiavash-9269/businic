import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class ContactAnswerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  @Matches(/\S/, { message: 'question must not be empty or whitespace' })
  question!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @Matches(/\S/, { message: 'answer must not be empty or whitespace' })
  answer!: string;
}

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/\S/, { message: 'name must not be empty or whitespace' })
  name!: string;

  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  @Matches(/\S/, { message: 'phone must not be empty or whitespace' })
  phone!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  @Matches(/\S/, { message: 'message must not be empty or whitespace' })
  message!: string;

  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @ValidateNested({ each: true })
  @Type(() => ContactAnswerDto)
  answers!: ContactAnswerDto[];

  @IsString()
  @IsIn(['fa', 'en'])
  language!: 'fa' | 'en';
}
