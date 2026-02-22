import { ApiProperty } from "@nestjs/swagger";

export class TodoResponse {
    @ApiProperty({description:'task id',example:1})
    id:number
    @ApiProperty({example:'ertalb turish'})
    text:string
    @ApiProperty({example:'false'})
    completed:Boolean
    @ApiProperty({example:'"2026-02-22T05:48:32.683Z"'})
    createdAt:Date
}
export class TodoResponseDto {
  @ApiProperty({ example: 1, description: 'Task ID' })
  id: number;

  @ApiProperty({ example: 'string', description: 'Task text' })
  text: string;

  @ApiProperty({ example: false, description: 'Task completed?' })
  completed: boolean;

  @ApiProperty({ example: '2026-02-22T05:48:32.683Z', description: 'Task creation date' })
  createdAt: string;
}

