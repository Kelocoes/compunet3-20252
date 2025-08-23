import type { Config } from 'jest';

const config: Config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["./src"],
    transform: {
        "^.+\\.ts?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
    moduleFileExtensions: ["ts", "js", "json", "node"],
    collectCoverageFrom: [
        "src/**/*.ts", // Incluye todos los archivos TypeScript en src/
        "!src/**/*.d.ts", // Excluye archivos de declaración
        "!src/index.ts", // Excluye el archivo de entrada principal
        "!src/interfaces/**/*.ts", // Excluye interfaces
        "!src/config/**/*.ts", // Excluye archivos de configuración
        "!src/models/**/*.ts", // Excluye models
        "!src/routes/**/*.ts", // Excluye utilidades
        "!src/**/index.ts", // Excluye archivos index
        "!src/validators/**/*.ts", // Excluye validadores
    ],
};

export default config;