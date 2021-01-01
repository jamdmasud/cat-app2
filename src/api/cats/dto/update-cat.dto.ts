import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateCatDto {
    @ApiProperty({type:'number', name:'id', example: 1})
    @IsNumber()
    id: number;

    @ApiProperty({type:'string', name:'name', example:'Pushi'})
    @IsString({message:"Name is required."})
    name: string;

    @ApiProperty({type:'number', name:'age', example: 3})
    @IsNumber()
    age: number;

    @ApiProperty({type:'string', name:'breed', example: 'child', required: true})
    @IsString({message:"Breed is required."})
    breed: string;
}