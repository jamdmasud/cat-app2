import {
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat) private catRepository: Repository<Cat>,
    private readonly logger: Logger,
  ) {}

  async create(dto: CreateCatDto): Promise<void> {
    let cat: Cat = new Cat();
    cat.name = dto.name;
    cat.age = dto.age;
    cat.color = dto.color;
    await this.catRepository.insert(cat);
    this.logger.log(cat, 'inserted cat');
  }

  async update(id: number, dto: UpdateCatDto) {
    if (!id) {
        this.logger.error('Cat ID is empty', null, 'ID varification');
        throw new NotAcceptableException("Cat ID is not found");
    }
    
    await this.findOne(id);

    let cat: Cat = new Cat();
    cat.name = dto.name;
    cat.age = dto.age;
    cat.color = dto.color;
    await this.catRepository.update(id, cat);
  }

  async findOne(id: number): Promise<Cat> { 
    let exit: Cat = await this.catRepository.findOne(id);
    if (!exit) {
        this.logger.error(`The Cat is not found in the database by ${id}`, null, 'Not found');
        throw new NotFoundException("The cat is not found");
    }
    return exit;
  }

  async findAll(): Promise<Cat[]> {
    return await this.catRepository.find();
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id);
    await this.catRepository.delete(id);
  }
}
