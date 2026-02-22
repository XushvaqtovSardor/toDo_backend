import { IsOptional, IsString } from "class-validator";

export class CreateTodoDto {
    @IsString()
    text: string
}
export class FindDto {
    @IsOptional()
    @IsString()
    search ?: string

    @IsOptional()
    @IsString()
    status ?: 'all' | 'active' | 'completed'
}
