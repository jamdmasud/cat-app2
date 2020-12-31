import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateCatDto } from './dto/create-cat.dto';
import { ListAllEntities } from './dto/list-all.entities';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Response } from 'express';
import { CatService } from './cat.service';
import { Cat } from './interfaces/cat';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
    constructor(private catService: CatService) { }

    @Get(":id")
    async findOne(@Res() res: Response, @Param('id') id: number): Promise<Response<Cat>> {
        return res.status(HttpStatus.OK).json(this.catService.findOne(id));
    }

    @Get()
    async findAll(@Res() res: Response): Promise<Response<Cat[]>> {
        return res.status(HttpStatus.OK).json(this.catService.findAll());
    }

    @Post()
    async createOne(@Res() res: Response, @Body() cat: CreateCatDto): Promise<Response<Cat>> {
        return res.status(HttpStatus.CREATED).json(this.catService.create(cat));
    }

    @Put(':id')
    async update(@Res() res: Response, @Param('id') id: number, @Body() updateCatDto: UpdateCatDto): Promise<Response<Cat>>  {
        return res.status(HttpStatus.OK).json(this.catService.update(updateCatDto));
    }

    @Delete(':id')
    async remove(@Res() res: Response, @Param('id') id: number): Promise<any> {
        return res.status(HttpStatus.OK).send(this.catService.delete(id));
    }
}
