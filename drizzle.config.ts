/* eslint-disable prettier/prettier */
import { Config, defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "sqlite",
    schema:"./shared/database/schema.ts",
    out: "./shared/database/migration",
    verbose: true,
    strict: true,
    driver: 'expo'
}) satisfies Config