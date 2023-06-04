import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	preset: "ts-jest",
	testEnvironment: "node",
	testPathIgnorePatterns: ["/node_modules/", "/.next/"],
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
	},
	setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};

export default config;