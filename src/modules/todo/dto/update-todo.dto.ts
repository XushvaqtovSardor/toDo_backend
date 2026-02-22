import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto  {
    @ApiPropertyOptional({example:'new'})
    @IsOptional()
    @IsString()
    text:string
    
    @ApiPropertyOptional({example:false})
    @IsOptional()
    @IsBoolean()
    completed:boolean
}
