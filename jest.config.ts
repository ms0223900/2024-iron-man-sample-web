import type { Config } from "jest";

export default async (): Promise<Config> => {
    return {
        preset: "ts-jest",
        verbose: true,
        testEnvironment: "jsdom",
        transform: {
            "^.+\\.tsx?$": "ts-jest",
            // process `*.tsx` files with `ts-jest`
        },
        moduleNameMapper: {
            "\\.(gif|ttf|eot|svg|png|css|scss)$":
                "<rootDir>/src/__test/__mocks/fileMock.js",
        },
        setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
    };
};
