import { ApiProperty } from '@nestjs/swagger'

export class DepartmentDto {
  @ApiProperty({
    description: '部署ID',
    example: 'A0001'
  })
  departmentId: string

  @ApiProperty({
    description: '部署名',
    example: 'アプリケーション'
  })
  departmentName: string
}
