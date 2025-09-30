import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { RolesService } from '../auth/services/roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AppLogger } from '../common/logger/logger.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
};

describe('UsersService', () => {
    let service: UsersService;

    const mockRolesService = {
        findByName: jest.fn(),
    };

    const mockLogger = {
        debug: jest.fn(),
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: RolesService, useValue: mockRolesService },
                { provide: getRepositoryToken(User), useValue: mockRepository },
                { provide: AppLogger, useValue: mockLogger },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    afterEach(() => {
        /* 
            Bastante importante limpiar los mocks después de cada prueba,
            de lo contrario, las llamadas a los mocks se acumulan y pueden 
            causar resultados inesperados en las pruebas.
        */
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a user successfully when role exists', async () => {
            const createUserDto: CreateUserDto = {
                username: 'testuser',
                email: 'test@example.com',
                passwordHash: 'hashedpassword',
                bio: 'Test bio',
                roleName: 'admin',
            };

            const mockRole = {
                id: 1,
                name: 'admin',
                description: 'Administrator role',
            };

            const mockCreatedUser = {
                id: 1,
                ...createUserDto,
                role: mockRole,
            };

            const mockSavedUser = {
                id: 1,
                username: 'testuser',
                email: 'test@example.com',
                passwordHash: 'hashedpassword',
                bio: 'Test bio',
                role: mockRole,
            };

            mockRolesService.findByName.mockResolvedValue(mockRole);
            mockRepository.create.mockReturnValue(mockCreatedUser);
            mockRepository.save.mockResolvedValue(mockSavedUser);

            const result = await service.create(createUserDto);

            expect(mockRolesService.findByName).toHaveBeenCalledWith('admin');
            expect(mockRepository.create).toHaveBeenCalledWith({
                ...createUserDto,
                role: mockRole,
            });
            expect(mockRepository.save).toHaveBeenCalledWith(mockCreatedUser);
            expect(result).toEqual(mockSavedUser);
        });
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const mockUsers = [
                {
                    id: 1,
                    username: 'user1',
                    email: 'user1@example.com',
                    bio: 'Bio 1',
                },
                {
                    id: 2,
                    username: 'user2',
                    email: 'user2@example.com',
                    bio: 'Bio 2',
                },
            ];

            mockRepository.find.mockResolvedValue(mockUsers);

            const result = await service.findAll();

            expect(mockRepository.find).toHaveBeenCalled();
            expect(result).toEqual(mockUsers);
        });
    });

    describe('findOne', () => {
        it('should return a user with relations when user exists', async () => {
            const userId = 1;
            const mockUser = {
                id: userId,
                username: 'testuser',
                email: 'test@example.com',
                bio: 'Test bio',
                role: {
                    id: 1,
                    name: 'admin',
                    rolePermissions: [
                        {
                            id: 1,
                            permission: {
                                id: 1,
                                name: 'READ_USERS',
                                description: 'Can read users',
                            },
                        },
                    ],
                },
            };

            mockRepository.findOne.mockResolvedValue(mockUser);

            const result = await service.findOne(userId);

            expect(mockRepository.findOne).toHaveBeenCalledWith({
                where: { id: userId },
                relations: [
                    'role',
                    'role.rolePermissions',
                    'role.rolePermissions.permission',
                ],
            });
            expect(result).toEqual(mockUser);
        });
    });

    describe('update', () => {
        it('should update a user successfully when user exists', async () => {
            const userId = 1;
            const updateUserDto: UpdateUserDto = {
                username: 'updateduser',
                bio: 'Updated bio',
            };

            const existingUser = {
                id: userId,
                username: 'olduser',
                email: 'test@example.com',
                bio: 'Old bio',
            };

            const updatedUser = {
                id: userId,
                username: 'updateduser',
                email: 'test@example.com',
                bio: 'Updated bio',
                role: {
                    id: 1,
                    name: 'admin',
                    rolePermissions: [],
                },
            };

            mockRepository.findOne
                .mockResolvedValueOnce(existingUser)
                .mockResolvedValueOnce(updatedUser);
            mockRepository.update.mockResolvedValue({ affected: 1 });

            const result = await service.update(userId, updateUserDto);

            expect(mockRepository.findOne).toHaveBeenCalledWith({
                where: { id: userId },
            });
            expect(mockRepository.update).toHaveBeenCalledWith(
                userId,
                updateUserDto,
            );
            expect(result).toEqual(updatedUser);
        });
    });

    describe('remove', () => {
        it('should remove a user successfully when user exists', async () => {
            const userId = 1;
            const mockDeleteResult = {
                affected: 1,
                raw: {},
            };

            mockRepository.delete.mockResolvedValue(mockDeleteResult);

            await service.remove(userId);

            expect(mockRepository.delete).toHaveBeenCalledWith(userId);
        });
    });
});
