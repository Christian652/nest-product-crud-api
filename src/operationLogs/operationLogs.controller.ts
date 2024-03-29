import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { OperationLogsService } from './operationLogs.service';
import { Log } from './log.entity';
import { LogFiltersDto } from './dto/logFilters.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('logs')
@UseGuards(AuthGuard())
export class OperationLogsController {
  constructor(private operationLogsService: OperationLogsService) { }

  @Get()
  public async getOperationLogs(@Param() params: LogFiltersDto): Promise<Log[]> {
    const operationLogs = await this.operationLogsService.getAll(params);
    return operationLogs;
  }

  @Get(':id')
  public async getById(@Param('id', ParseIntPipe) id) {
    return await this.operationLogsService.findById(id);
  }
}
