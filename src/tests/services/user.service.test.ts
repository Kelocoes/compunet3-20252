import { userService } from "../../services";
import { UserModel, UserDocument, UserRole } from "../../models";
import bcrypt from "bcrypt";
import { UserInput } from "../../interfaces";

jest.mock("bcrypt", () => ({
    hash: jest.fn(),
}));

// Mock del modelo
jest.mock("../../models", () => ({
    UserRole: {
        ADMIN: "admin",
        USER: "user",
    },
    UserModel: {
        create: jest.fn()
    },
}));

describe("UserService", () => { // Describe permite agrupar las pruebas relacionadas con UserService
    beforeEach(() => {
        jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
    });

    describe("create", () => {
        it("should create a new user", async () => {
            const mockUserInput: UserInput = {
                name: "John Doe",
                email: "john.doe@example.com",
                password: "password123",
            };

            const mockHashedPassword = "hashedPassword123";
            const mockCreatedUser: Partial<UserDocument> = {
                ...mockUserInput,
                _id: "12345",
                createdAt: new Date(),
                updatedAt: new Date(),
                roles: [UserRole.USER],
            };

            // Mock de findByEmail para devolver null (usuario no existe)
            jest.spyOn(userService, "findByEmail").mockResolvedValue(null);

            // Mock de bcrypt.hash
            (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);

            // Mock de UserModel.create
            (UserModel.create as jest.Mock).mockResolvedValue(mockCreatedUser);
            const result = await userService.create(mockUserInput);

            expect(bcrypt.hash).toHaveBeenCalledWith(mockUserInput.password, 10);
            expect(UserModel.create).toHaveBeenCalledWith({
                ...mockUserInput,
                password: mockHashedPassword,
            });

            expect(result).toEqual(mockCreatedUser);
        });

        it("should throw an error if the user already exists", async () => {
            const mockUserInput: UserInput = {
                name: "John Doe",
                email: "john.doe@example.com",
                password: "password123",
            };

            // Mockea `findByEmail` para devolver un usuario existente
            jest.spyOn(userService, "findByEmail").mockResolvedValue({
                ...mockUserInput,
                _id: "12345",
            } as UserDocument);

            await expect(userService.create(mockUserInput)).rejects.toThrow(
                "User already exists"
            );

            expect(userService.findByEmail).toHaveBeenCalledWith(mockUserInput.email);
            expect(UserModel.create).not.toHaveBeenCalled();
        });
    });
});