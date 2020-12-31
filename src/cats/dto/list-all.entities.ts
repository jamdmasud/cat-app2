import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ListAllEntities{
    @ApiPropertyOptional({
        type: 'number',
        name: 'limit'
    })
    limit: number;

    @ApiPropertyOptional({
        type: 'number',
        name: 'pageSize'
    })
    pageSize: number;

    @ApiPropertyOptional({
        type: 'string',
        name: 'sort',
        description: 'Write the keyword which will be used to sort the data'
    })
    sort: number;
}