import { ApiProperty } from "@nestjs/swagger";

export class UpdateCatDto {
    @ApiProperty({type:'number', name:'id', example: 1})
    id: number;

    @ApiProperty({type:'string', name:'name', example:'Pushi'})
    name: string;

    @ApiProperty({type:'number', name:'age', example: '3'})
    age: number;

    @ApiProperty({type:'string', name:'breed', example: 'child', required: false})
    breed: string;
}