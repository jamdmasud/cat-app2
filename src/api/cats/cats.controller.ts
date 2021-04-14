import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Response } from 'express';
import { CatService } from './cat.service';
import { Cat } from './interfaces/cat';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decoraters/roles.decorator';
import { User } from 'src/decoraters/user.decorator';
import { Auth } from 'src/decoraters/auth.decorator'; 

@ApiTags('cats')
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {

    constructor(
        private catService: CatService
        ,private readonly logger: Logger
        ) {  
            this.logger.log('Logger is working well');      
          }

    @Get(":id")
    @ApiParam({name: 'id', required: true, description: 'Id of the cat'})
    async findOne(@Res() res: Response, @User() user, @Param('id', ParseIntPipe) id: number): Promise<Response<Cat>> {
       
        return res.status(HttpStatus.OK).json(await this.catService.findOne(id));
    }

    @Get()
    @Auth('admin')
    async findAll(@Res() res: Response): Promise<Response<Cat[]>> {
        return res.status(HttpStatus.OK).json(await this.catService.findAll());
    }

    @Post()
    @Roles('admin')
    async createOne(@Res() res: Response, @Body(new ValidationPipe()) cat: CreateCatDto): Promise<Response<void>> {
       
        return res.status(HttpStatus.CREATED).send(await this.catService.create(cat));
    }

    @Put(':id')
    @ApiParam({name: 'id', required: true, description: 'Id of the cat'})
    async update(@Res() res: Response, @Param('id', ParseIntPipe)id: number, @Body() updateCatDto: UpdateCatDto): Promise<Response<Cat>>  {
        return res.status(HttpStatus.OK).send(await this.catService.update(id, updateCatDto));
    }

    @Delete(':id')
    async remove(@Res() res: Response, @Param('id') id: number): Promise<any> {
        return res.status(HttpStatus.OK).send(await this.catService.delete(id));
    }
}
