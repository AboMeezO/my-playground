import { createZodDto } from 'nestjs-zod';
import { CreateUserSchema } from '../schemas/users.schema';

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
