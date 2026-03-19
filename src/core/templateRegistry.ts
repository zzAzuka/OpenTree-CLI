import { nodeTemplate } from "@/templates/base/node";
import { expressTemplate } from "@/templates/framework/express";
import { prismaTemplate
 } from "@/templates/database/prisma";

export const templateRegistry = {
  base: {
    node: nodeTemplate
  },
  framework: {
    express: expressTemplate,
  },
  database: {
    prisma: prismaTemplate
  }
};