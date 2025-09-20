import { Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';
import { PermissionsController } from './controllers/permissions.controller';
import { PermissionsService } from './services/permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RolePermissionController } from './controllers/role-permission.controller';
import { RolePermissionService } from './services/role-permission.service';
import { RolePermission } from './entities/role-permission.entity';

@Module({
    controllers: [
        RolesController,
        PermissionsController,
        RolePermissionController,
    ],
    providers: [RolesService, PermissionsService, RolePermissionService],
    imports: [TypeOrmModule.forFeature([Role, Permission, RolePermission])],
    exports: [RolesService, PermissionsService],
})
export class AuthModule {}
