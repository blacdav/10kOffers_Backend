import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from 'prisma/config';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    constructor() {
        const db = process.env.DATABASE_URL as string;
        const dbUrl = new URL(db);

        const adapter = new PrismaPg({ connectionString: env("DATABASE_URL") });

        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect();
        console.log('Database connected successfully!');
    }

    async onModuleDestroy() {
        await this.$disconnect();
        console.log('Database disconnected successfully!');
    }
}