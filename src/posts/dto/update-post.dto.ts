//import { PartialType } from '@nestjs/mapped-types'; // antes
import { PartialType } from '@nestjs/swagger'; // despues
import { CreatePostDto } from './create-post.dto.js';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
