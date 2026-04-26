import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { hash } from "bcryptjs";
import { config } from "dotenv";

config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL as string;
  const password = process.env.ADMIN_PASSWORD as string;
  const name = process.env.ADMIN_NAME || "Admin User";

  if (!email || !password) {
    throw new Error("Admin email and password is required!");
  }

  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log(`Admin with email ${email} already exists.`);
    return;
  }

  const passwordHash = await hash(password, 12);

  const admin = await prisma.admin.create({
    data: {
      email,
      passwordHash,
      name,
      role: "ADMIN",
    },
  });

  console.log(`Created admin user: ${admin.email}`);
  console.log("⚠️  Remember to change the default password!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
