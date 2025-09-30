import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { User } from '../src/users/entities/user.entity';
import { Role } from '../src/auth/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { Express } from 'express';

interface LoginResponse {
    access_token: string;
}

describe('Users E2E Tests', () => {
    let app: INestApplication;
    let dataSource: DataSource;
    let adminToken: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        dataSource = moduleFixture.get<DataSource>(DataSource);

        await app.init();
        adminToken = await getAdminToken();
    });

    afterAll(async () => {
        await cleanDatabase();
        await app.close();
    });

    async function getAdminToken(): Promise<string> {
        const response = await request(app.getHttpServer() as Express)
            .post('/auth/login')
            .send({
                email: 'admin@mail.com',
                password: 'password123',
            })
            .expect(201);

        const loginData = response.body as LoginResponse;
        return loginData.access_token;
    }

    async function cleanDatabase(): Promise<void> {
        const tableNames = [
            'users',
            'role_permissions',
            'roles',
            'permissions',
        ];

        for (const tableName of tableNames) {
            await dataSource.query(`DELETE FROM ${tableName}`);
        }
    }

    async function createTestUser(userData: {
        username: string;
        email: string;
        password?: string;
        bio?: string;
    }): Promise<User> {
        const manager = dataSource.manager;

        let userRole = await manager.findOne(Role, { where: { name: 'user' } });
        if (!userRole) {
            userRole = manager.create(Role, {
                name: 'user',
                description: 'Regular user role',
            });
            userRole = await manager.save(Role, userRole);
        }

        const hashedPassword = await bcrypt.hash(
            userData.password || 'password123',
            10,
        );
        const user = manager.create(User, {
            username: userData.username,
            email: userData.email,
            passwordHash: hashedPassword,
            bio: userData.bio || 'Test user',
            role: userRole,
        });

        return await manager.save(User, user);
    }

    describe('POST /users (Create User)', () => {
        it('should create a new user successfully', async () => {
            const createUserDto = {
                username: 'newuser',
                email: 'newuser@test.com',
                passwordHash: 'password123',
                bio: 'New test user',
                roleName: 'admin',
            };

            const response = await request(app.getHttpServer() as Express)
                .post('/users')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(createUserDto)
                .expect(201);

            const body = response.body as User;
            expect(body).toHaveProperty('id');
            expect(body.username).toBe(createUserDto.username);
            expect(body.email).toBe(createUserDto.email);
            expect(body.bio).toBe(createUserDto.bio);
            expect(body).toHaveProperty('role');
        });
    });

    describe('GET /users (Get All Users)', () => {
        beforeEach(async () => {
            await createTestUser({
                username: 'user1',
                email: 'user1@test.com',
            });
            await createTestUser({
                username: 'user2',
                email: 'user2@test.com',
            });
        });

        it('should return all users with admin token', async () => {
            const response = await request(app.getHttpServer() as Express)
                .get('/users')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200);

            const body = response.body as User[];
            expect(Array.isArray(body)).toBe(true);
            expect(body.length).toBeGreaterThan(0);
            const user = body[0];
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('username');
            expect(user).toHaveProperty('email');
        });
    });

    describe('GET /users/:id (Get User by ID)', () => {
        let testUser: User;

        beforeEach(async () => {
            testUser = await createTestUser({
                username: 'getuser',
                email: 'getuser@test.com',
                bio: 'User for get test',
            });
        });

        it('should return specific user by id', async () => {
            const response = await request(app.getHttpServer() as Express)
                .get(`/users/${testUser.id}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200);

            expect(response.body).toHaveProperty('id', testUser.id);
            expect(response.body).toHaveProperty('username', testUser.username);
            expect(response.body).toHaveProperty('email', testUser.email);
            expect(response.body).toHaveProperty('bio', testUser.bio);
            expect(response.body).toHaveProperty('role');
        });
    });

    describe('PATCH /users/:id (Update User)', () => {
        let testUser: User;

        beforeEach(async () => {
            testUser = await createTestUser({
                username: 'updateuser',
                email: 'updateuser@test.com',
                bio: 'Original bio',
            });
        });

        it('should update user successfully', async () => {
            const updateUserDto = {
                username: 'updateduser',
                bio: 'Updated bio',
            };

            const response = await request(app.getHttpServer() as Express)
                .patch(`/users/${testUser.id}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updateUserDto)
                .expect(200);

            expect(response.body).toHaveProperty('id', testUser.id);
            expect(response.body).toHaveProperty(
                'username',
                updateUserDto.username,
            );
            expect(response.body).toHaveProperty('bio', updateUserDto.bio);
            expect(response.body).toHaveProperty('email', testUser.email);
        });
    });
});
