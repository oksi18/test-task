import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('getAllBosses')
  async getAllBosses() {
    return this.adminService.getAllBosses();
  }

  @Get('getAllUsers')
  async getAllUsers() {
    return this.adminService.getAllUser();
  }
}
