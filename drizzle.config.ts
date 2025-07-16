import {defineConfig} from 'drizzle-kit'
import * as dotenv from "dotenv";

dotenv.config(); 
console.log(process.env.DATABASE_URL,'akshay');

export default defineConfig({
    schema: './app/db/schema.ts',
    out: './app/db/migrations',
    dialect: 'postgresql',
    dbCredentials:{
        url : process.env.DATABASE_URL!,
    }

})