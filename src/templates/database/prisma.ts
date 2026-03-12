const prismaTemplate = {
    folder: ["prisma", "src/db"],

    name_and_content: {
        "prisma/schema.prisma": `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}`,
        "src/db/prismaClient.js": `
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;
`
    },

    dependencies: [
        "@prisma/client"
    ],

    devDependencies: [
        "prisma"
    ]
}

export { prismaTemplate };