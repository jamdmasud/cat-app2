import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, PreconditionFailedException, Put, Res, SetMetadata, UseGuards, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
import { ConfigService } from 'src/config/config.service';

@ApiTags('cats')
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {

    constructor(private catService: CatService, private configService: ConfigService) {
        console.log(this.configService.get('DATABASE'));
     }

    @Get(":id")
    async findOne(@Res() res: Response, @User() user, @Param('id', ParseIntPipe) id: number): Promise<Response<Cat>> {
        console.log(user);
        return res.status(HttpStatus.OK).json(this.catService.findOne(id));
    }

    @Get()
    @Auth('admin')
    async findAll(@Res() res: Response): Promise<Response<Cat[]>> {
        return res.status(HttpStatus.OK).json(this.catService.findAll());
    }

    @Post()
    @Roles('admin')
    async createOne(@Res() res: Response, @Body(new ValidationPipe()) cat: CreateCatDto): Promise<Response<Cat>> {
        return res.status(HttpStatus.CREATED).json(this.catService.create(cat));
    }

    @Put(':id')
    async update(@Res() res: Response, @Body() updateCatDto: UpdateCatDto): Promise<Response<Cat>>  {
        return res.status(HttpStatus.OK).json(this.catService.update(updateCatDto));
    }

    @Delete(':id')
    async remove(@Res() res: Response, @Param('id') id: number): Promise<any> {
        return res.status(HttpStatus.OK).send(this.catService.delete(id));
    }
}
