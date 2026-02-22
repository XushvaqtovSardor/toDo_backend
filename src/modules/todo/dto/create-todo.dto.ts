import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateTodoDto {
    @ApiProperty({description:'task nomi'})
    @IsString()
    text: string
}
export class FindDto {
    @ApiPropertyOptional({description:'qidiruv matni'})
    @IsOptional()
    @IsString()
    search ?: string

    @ApiPropertyOptional({description:'Filter',enum:['all','active','completed'],default:'all'})
    @IsOptional()
    @IsString()
    status ?: 'all' | 'active' | 'completed'
}
