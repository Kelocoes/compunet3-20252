import { userController } from "../../controllers/user.controller";
import { userService } from "../../services/user.service";
import { Request, Response } from "express";
import { UserDocument } from "../../models";
import { UserInput, UserInputUpdate } from "../../interfaces";

jest.mock("../../services/user.service", () => ({
    userService: {
        create: jest.fn(),
        getAll: jest.fn(),
        getById: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}));

describe("UserController", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe("create", () => {
        it("should create a new user and return 201", async () => {
            const mockUserInput: UserInput = {
                name: "John Doe",
                email: "john.doe@example.com",
                password: "password123",
            };

            const mockUser: UserDocument = {
                ...mockUserInput,
                _id: "12345",
                createdAt: new Date(),
                updatedAt: new Date(),
                roles: ["user"],
            } as UserDocument;

            req.body = mockUserInput;
            (userService.create as jest.Mock).mockResolvedValue(mockUser);

            await userController.create(req as Request, res as Response, next);

            expect(userService.create).toHaveBeenCalledWith(mockUserInput);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it("should call next with an error if user already exists", async () => {
            const mockUserInput: UserInput = {
                name: "John Doe",
                email: "john.doe@example.com",
                password: "password123",
            };

            req.body = mockUserInput;
            const error = new ReferenceError("User already exists");
            (userService.create as jest.Mock).mockRejectedValue(error);

            await userController.create(req as Request, res as Response, next);

            expect(userService.create).toHaveBeenCalledWith(mockUserInput);
            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe("getAll", () => {
        it("should return all users", async () => {
            const mockUsers: UserDocument[] = [
                { _id: "1", name: "John Doe", email: "john@example.com", roles: ["user"] } as UserDocument,
                { _id: "2", name: "Jane Doe", email: "jane@example.com", roles: ["admin"] } as UserDocument,
            ];

            (userService.getAll as jest.Mock).mockResolvedValue(mockUsers);

            await userController.getAll(req as Request, res as Response);

            expect(userService.getAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockUsers);
        });
    });

    describe("getOne", () => {
        it("should return a user by id", async () => {
            const mockUser: UserDocument = {
                _id: "12345",
                name: "John Doe",
                email: "john@example.com",
                roles: ["user"],
            } as UserDocument;

            req.params = { id: "12345" };
            (userService.getById as jest.Mock).mockResolvedValue(mockUser);

            await userController.getOne(req as Request, res as Response);

            expect(userService.getById).toHaveBeenCalledWith("12345");
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it("should return 404 if user is not found", async () => {
            req.params = { id: "12345" };
            (userService.getById as jest.Mock).mockResolvedValue(null);

            await userController.getOne(req as Request, res as Response);

            expect(userService.getById).toHaveBeenCalledWith("12345");
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User with id 12345 not found" });
        });
    });

    describe("update", () => {
        it("should update a user and return the updated user", async () => {
            const mockUserUpdate: UserInputUpdate = { name: "Updated Name", email: "email.updated@gmail.com" };
            const mockUpdatedUser: UserDocument = {
                _id: "12345",
                name: "Updated Name",
                email: "john@example.com",
                roles: ["user"],
            } as UserDocument;

            req.params = { id: "12345" };
            req.body = mockUserUpdate;
            (userService.update as jest.Mock).mockResolvedValue(mockUpdatedUser);

            await userController.update(req as Request, res as Response);

            expect(userService.update).toHaveBeenCalledWith("12345", mockUserUpdate);
            expect(res.json).toHaveBeenCalledWith(mockUpdatedUser);
        });

        it("should return 404 if user is not found", async () => {
            req.params = { id: "12345" };
            req.body = { name: "Updated Name" };
            (userService.update as jest.Mock).mockResolvedValue(null);

            await userController.update(req as Request, res as Response);

            expect(userService.update).toHaveBeenCalledWith("12345", { name: "Updated Name" });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User with id 12345 not found" });
        });
    });

    describe("delete", () => {
        it("should delete a user and return 204", async () => {
            req.params = { id: "12345" };
            (userService.delete as jest.Mock).mockResolvedValue(true);

            await userController.delete(req as Request, res as Response);

            expect(userService.delete).toHaveBeenCalledWith("12345");
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });

        it("should return 404 if user is not found", async () => {
            req.params = { id: "12345" };
            (userService.delete as jest.Mock).mockResolvedValue(false);

            await userController.delete(req as Request, res as Response);

            expect(userService.delete).toHaveBeenCalledWith("12345");
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User with id 12345 not found" });
        });
    });
});