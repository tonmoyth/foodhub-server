var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import express from "express";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import "process";
import * as path from "path";
import { fileURLToPath } from "url";
import "@prisma/client/runtime/client";

// generated/prisma/enums.ts
var UserRole = {
  CUSTOMER: "CUSTOMER",
  PROVIDER: "PROVIDER",
  ADMIN: "ADMIN"
};

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'enum UserRole {\n  CUSTOMER\n  PROVIDER\n  ADMIN\n}\n\nenum UserStatus {\n  SUSPEND\n  ACTIVATE\n}\n\nmodel User {\n  id            String    @id\n  name          String\n  email         String\n  emailVerified Boolean   @default(false)\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n\n  role             UserRole\n  status           UserStatus        @default(ACTIVATE)\n  providerProfiles providerProfile[]\n  orders           orders[]\n  reviews          review[]\n  meals            meals[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel categories {\n  id         String   @id @default(uuid())\n  name       String\n  slug       String\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n  meals      meals[]\n}\n\nmodel meals {\n  id               String     @id @default(uuid())\n  title            String\n  description      String?\n  price            Int\n  categoriesId     String\n  categories       categories @relation(fields: [categoriesId], references: [id], onDelete: Cascade)\n  discount_price   Int?       @default(0)\n  image            String?\n  is_available     Boolean\n  prep_time_minute String?\n  created_at       DateTime   @default(now())\n  updated_at       DateTime   @updatedAt\n  reviews          review[]\n  orders           orders[]\n  user             User       @relation(fields: [providerId], references: [id])\n  providerId       String\n\n  providerProfile   providerProfile? @relation(fields: [providerProfileId], references: [id])\n  providerProfileId String?\n}\n\nenum OrderStatus {\n  PENDING\n  PREPARING\n  READY\n  DELIVERED\n  CANCELLED\n}\n\nenum PaymentMethod {\n  CASH_ON_DELIVERY\n}\n\nmodel orders {\n  id String @id @default(uuid())\n\n  // Customer Info (from checkout card)\n  customerName    String\n  customerPhone   String\n  deliveryAddress String\n  paymentMethod   PaymentMethod @default(CASH_ON_DELIVERY)\n\n  // Relations\n  customerId String\n  customer   User   @relation(fields: [customerId], references: [id], onDelete: Cascade)\n\n  providerProfileId String\n  provider          providerProfile @relation(fields: [providerProfileId], references: [id], onDelete: Cascade)\n\n  // Order Details\n  totalAmount Int\n  status      OrderStatus @default(PENDING)\n\n  // Metadata\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n  meals      meals?   @relation(fields: [mealsId], references: [id])\n  mealsId    String?\n}\n\nmodel providerProfile {\n  id           String    @id @default(uuid())\n  res_name     String\n  address      String\n  phone        String\n  userId       String\n  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  description  String?\n  city         String\n  opening_time DateTime?\n  closing_time DateTime?\n  isOpen       Boolean   @default(true)\n  logo_image   String?\n  total_review Int?      @default(0)\n  created_at   DateTime  @default(now())\n  updated_at   DateTime  @updatedAt\n\n  orders orders[]\n  meals  meals[]\n}\n\nmodel review {\n  id         String   @id @default(uuid())\n  rating     Int      @default(0)\n  comment    String\n  customerId String\n  customer   User     @relation(fields: [customerId], references: [id], onDelete: Cascade)\n  mealId     String\n  meal       meals    @relation(fields: [mealId], references: [id], onDelete: Cascade)\n  created_at DateTime @default(now())\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"providerProfiles","kind":"object","type":"providerProfile","relationName":"UserToproviderProfile"},{"name":"orders","kind":"object","type":"orders","relationName":"UserToorders"},{"name":"reviews","kind":"object","type":"review","relationName":"UserToreview"},{"name":"meals","kind":"object","type":"meals","relationName":"UserTomeals"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"categories":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"meals","relationName":"categoriesTomeals"}],"dbName":null},"meals":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Int"},{"name":"categoriesId","kind":"scalar","type":"String"},{"name":"categories","kind":"object","type":"categories","relationName":"categoriesTomeals"},{"name":"discount_price","kind":"scalar","type":"Int"},{"name":"image","kind":"scalar","type":"String"},{"name":"is_available","kind":"scalar","type":"Boolean"},{"name":"prep_time_minute","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"reviews","kind":"object","type":"review","relationName":"mealsToreview"},{"name":"orders","kind":"object","type":"orders","relationName":"mealsToorders"},{"name":"user","kind":"object","type":"User","relationName":"UserTomeals"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"providerProfile","kind":"object","type":"providerProfile","relationName":"mealsToproviderProfile"},{"name":"providerProfileId","kind":"scalar","type":"String"}],"dbName":null},"orders":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerName","kind":"scalar","type":"String"},{"name":"customerPhone","kind":"scalar","type":"String"},{"name":"deliveryAddress","kind":"scalar","type":"String"},{"name":"paymentMethod","kind":"enum","type":"PaymentMethod"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"UserToorders"},{"name":"providerProfileId","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"providerProfile","relationName":"ordersToproviderProfile"},{"name":"totalAmount","kind":"scalar","type":"Int"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"meals","relationName":"mealsToorders"},{"name":"mealsId","kind":"scalar","type":"String"}],"dbName":null},"providerProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"res_name","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"UserToproviderProfile"},{"name":"description","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"opening_time","kind":"scalar","type":"DateTime"},{"name":"closing_time","kind":"scalar","type":"DateTime"},{"name":"isOpen","kind":"scalar","type":"Boolean"},{"name":"logo_image","kind":"scalar","type":"String"},{"name":"total_review","kind":"scalar","type":"Int"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"orders","kind":"object","type":"orders","relationName":"ordersToproviderProfile"},{"name":"meals","kind":"object","type":"meals","relationName":"mealsToproviderProfile"}],"dbName":null},"review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"UserToreview"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"meals","relationName":"mealsToreview"},{"name":"created_at","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CategoriesScalarFieldEnum: () => CategoriesScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  MealsScalarFieldEnum: () => MealsScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  OrdersScalarFieldEnum: () => OrdersScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProviderProfileScalarFieldEnum: () => ProviderProfileScalarFieldEnum,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  categories: "categories",
  meals: "meals",
  orders: "orders",
  providerProfile: "providerProfile",
  review: "review"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  role: "role",
  status: "status"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoriesScalarFieldEnum = {
  id: "id",
  name: "name",
  slug: "slug",
  created_at: "created_at",
  updated_at: "updated_at"
};
var MealsScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  price: "price",
  categoriesId: "categoriesId",
  discount_price: "discount_price",
  image: "image",
  is_available: "is_available",
  prep_time_minute: "prep_time_minute",
  created_at: "created_at",
  updated_at: "updated_at",
  providerId: "providerId",
  providerProfileId: "providerProfileId"
};
var OrdersScalarFieldEnum = {
  id: "id",
  customerName: "customerName",
  customerPhone: "customerPhone",
  deliveryAddress: "deliveryAddress",
  paymentMethod: "paymentMethod",
  customerId: "customerId",
  providerProfileId: "providerProfileId",
  totalAmount: "totalAmount",
  status: "status",
  created_at: "created_at",
  updated_at: "updated_at",
  mealsId: "mealsId"
};
var ProviderProfileScalarFieldEnum = {
  id: "id",
  res_name: "res_name",
  address: "address",
  phone: "phone",
  userId: "userId",
  description: "description",
  city: "city",
  opening_time: "opening_time",
  closing_time: "closing_time",
  isOpen: "isOpen",
  logo_image: "logo_image",
  total_review: "total_review",
  created_at: "created_at",
  updated_at: "updated_at"
};
var ReviewScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  customerId: "customerId",
  mealId: "mealId",
  created_at: "created_at"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: async (request) => {
    const origin = request?.headers.get("origin");
    const allowedOrigins = [
      process.env.APP_URL,
      process.env.BETTER_AUTH_URL,
      "https://foodhub-client-vert.vercel.app",
      "https://foodhub-server-indol.vercel.app"
    ].filter(Boolean);
    if (!origin || allowedOrigins.includes(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin)) {
      return [origin];
    }
    return [];
  },
  basePath: "/api/auth",
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: true
      },
      status: {
        type: "string",
        defaultValue: "ACTIVATE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6
    // requireEmailVerification: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
      // 5 minutes
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false
    },
    disableCSRFCheck: true
    // Allow requests without Origin header (Postman, mobile apps, etc.)
  }
});

// src/app.ts
import cors from "cors";

// src/modules/categories/categories.route.ts
import { Router } from "express";

// src/modules/categories/categories.service.ts
var getCategories = async () => {
  return await prisma.categories.findMany();
};
var getSingleCategories = async (id) => {
  return await prisma.categories.findUnique({
    where: {
      id
    }
  });
};
var createCategories = async (data) => {
  return await prisma.categories.create({
    data
  });
};
var updateCategories = async (id, data) => {
  return await prisma.categories.update({
    where: {
      id
    },
    data
  });
};
var deleteCategories = async (id) => {
  return await prisma.categories.delete({
    where: {
      id
    }
  });
};
var categoriesService = {
  getCategories,
  getSingleCategories,
  createCategories,
  updateCategories,
  deleteCategories
};

// src/modules/categories/categories.controller.ts
var getCategories2 = async (req, res) => {
  try {
    const result = await categoriesService.getCategories();
    res.status(200).json({
      success: true,
      message: "fetch successfully",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "fetch failed. Please try again.",
      error: e.message || e
    });
  }
};
var getSingleCategories2 = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await categoriesService.getSingleCategories(id);
    res.status(200).json({
      success: true,
      message: "fetch successfully",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "fetch failed. Please try again.",
      error: e.message || e
    });
  }
};
var createCategories2 = async (req, res) => {
  const data = req.body;
  try {
    const result = await categoriesService.createCategories(data);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Category creation failed. Please try again.",
      error: e.message || e
    });
  }
};
var updateCategories2 = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const result = await categoriesService.updateCategories(id, data);
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Category update failed. Please try again.",
      error: e.message || e
    });
  }
};
var deleteCategories2 = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await categoriesService.deleteCategories(id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Category delete failed. Please try again.",
      error: e.message || e
    });
  }
};
var categoriesController = {
  getCategories: getCategories2,
  getSingleCategories: getSingleCategories2,
  createCategories: createCategories2,
  updateCategories: updateCategories2,
  deleteCategories: deleteCategories2
};

// src/middlewares/auth.ts
function auth2(...roles) {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!"
        });
      }
      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: session.user.role,
        status: session.user.status
      };
      if (roles.length && !roles.includes(session.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have permission to access this resources!"
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
var auth_default = auth2;

// src/modules/categories/categories.route.ts
var router = Router();
router.get(
  "/",
  auth_default(UserRole.ADMIN, UserRole.PROVIDER),
  categoriesController.getCategories
);
router.get(
  "/:id",
  auth_default(UserRole.ADMIN),
  categoriesController.getSingleCategories
);
router.post("/", auth_default(UserRole.ADMIN), categoriesController.createCategories);
router.patch("/:id", categoriesController.updateCategories);
router.delete("/:id", categoriesController.deleteCategories);
var categoriesRouter = router;

// src/modules/meals/meals.routes.ts
import { Router as Router2 } from "express";

// src/modules/meals/meals.service.ts
var createMeal = async (data) => {
  return await prisma.meals.create({
    data
  });
};
var getAllMeals = async ({
  search,
  categoriesId,
  maxPrice
}) => {
  const andCondition = [];
  andCondition.push({
    is_available: true
  });
  if (search) {
    andCondition.push({
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (categoriesId) {
    andCondition.push({
      categoriesId
    });
  }
  if (maxPrice) {
    andCondition.push({
      price: {
        lte: maxPrice
      }
    });
  }
  const result = await prisma.meals.findMany({
    where: {
      AND: andCondition
    },
    include: {
      providerProfile: true
    }
  });
  return result;
};
var getMealsProvider = async (providerId) => {
  return await prisma.meals.findMany({
    where: {
      providerId
    }
  });
};
var updatedMeal = async (data, mealId) => {
  return await prisma.meals.update({
    where: {
      id: mealId
    },
    data
  });
};
var updateMealOrderStatus = async (id, status) => {
  return await prisma.orders.update({
    where: {
      id
    },
    data: {
      status
    }
  });
};
var getMealDetails = async (mealId) => {
  return await prisma.meals.findUnique({
    where: {
      id: mealId
    },
    include: {
      providerProfile: true
    }
  });
};
var deleteMeal = async (mealId) => {
  return await prisma.meals.delete({
    where: {
      id: mealId
    }
  });
};
var mealsService = {
  createMeal,
  getMealsProvider,
  updatedMeal,
  updateMealOrderStatus,
  deleteMeal,
  getMealDetails,
  getAllMeals
};

// src/modules/meals/meals.controller.ts
var createMeals = async (req, res) => {
  const userId = req.user?.id;
  const data = {
    ...req.body,
    providerId: userId
  };
  try {
    const result = await mealsService.createMeal(data);
    res.status(201).json({
      success: true,
      message: "Meal created successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Meal creation failed. Please try again.",
      error: error.message || error
    });
  }
};
var getAllMeals2 = async (req, res) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : void 0;
    const categoriesId = typeof req.query.categoriesId === "string" ? req.query.categoriesId : void 0;
    const Price = Number(req.query.maxPrice);
    const maxPrice = typeof Price === "number" ? Price : void 0;
    const result = await mealsService.getAllMeals({
      search: searchString,
      categoriesId,
      maxPrice
    });
    res.status(200).json({
      success: true,
      message: "Meals fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch meals. Please try again later.",
      error: error.message || error
    });
  }
};
var getMealByProvider = async (req, res) => {
  const providerId = req.user?.id;
  try {
    const result = await mealsService.getMealsProvider(providerId);
    res.status(200).json({
      success: true,
      message: "Meals fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch meals. Please try again later.",
      error: error.message || error
    });
  }
};
var updatedMeal2 = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const result = await mealsService.updatedMeal(data, id);
    res.status(200).json({
      success: true,
      message: "Meal updated successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Meal update failed. Please try again.",
      error: error.message || error
    });
  }
};
var updateMealOrderStatus2 = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await mealsService.updateMealOrderStatus(
      id,
      status
    );
    res.status(200).json({
      success: true,
      message: "Meal order status updated successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Status update failed. Please try again.",
      error: error.message || error
    });
  }
};
var getMealDetails2 = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await mealsService.getMealDetails(id);
    res.status(200).json({
      success: true,
      message: "Meal details fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Meal not found or failed to fetch details.",
      error: error.message || error
    });
  }
};
var deletedMeal = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await mealsService.deleteMeal(id);
    res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Meal delete failed. Please try again.",
      error: error.message || error
    });
  }
};
var mealsController = {
  createMeals,
  getMealByProvider,
  getAllMeals: getAllMeals2,
  updatedMeal: updatedMeal2,
  updateMealOrderStatus: updateMealOrderStatus2,
  getMealDetails: getMealDetails2,
  deletedMeal
};

// src/modules/meals/meals.routes.ts
var router2 = Router2();
router2.get("/", mealsController.getAllMeals);
router2.get(
  "/speciphic",
  auth_default(UserRole.PROVIDER),
  mealsController.getMealByProvider
);
router2.get("/:id", mealsController.getMealDetails);
router2.post("/", auth_default(UserRole.PROVIDER), mealsController.createMeals);
router2.put("/:id", auth_default(UserRole.PROVIDER), mealsController.updatedMeal);
router2.patch(
  "/:id",
  auth_default(UserRole.PROVIDER),
  mealsController.updateMealOrderStatus
);
router2.delete("/:id", auth_default(UserRole.PROVIDER), mealsController.deletedMeal);
var mealsRouter = router2;

// src/modules/providerProfile/providerProfile.routes.ts
import { Router as Router3 } from "express";

// src/modules/providerProfile/providerProfile.service.ts
var getAllProvider = async () => {
  return await prisma.providerProfile.findMany();
};
var getSignleProvider = async (userId) => {
  return await prisma.providerProfile.findFirst({
    where: {
      userId
    }
  });
};
var getProviderWithMenu = async (id) => {
  return await prisma.providerProfile.findMany({
    where: {
      id
    },
    include: {
      meals: true
    }
  });
};
var createProviderProfile = async (data) => {
  return await prisma.providerProfile.create({
    data
  });
};
var providerProfileService = {
  getSignleProvider,
  createProviderProfile,
  getProviderWithMenu,
  getAllProvider
};

// src/modules/providerProfile/providerProfile.controller.ts
var getAllProviders = async (req, res) => {
  try {
    const result = await providerProfileService.getAllProvider();
    res.status(200).json({
      success: true,
      message: "Providers fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch providers. Please try again later.",
      error: error.message || error
    });
  }
};
var getSignleProvider2 = async (req, res) => {
  const userId = req.user?.id;
  try {
    const result = await providerProfileService.getSignleProvider(
      userId
    );
    res.status(200).json({
      success: true,
      message: "Providers fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch providers. Please try again later.",
      error: error.message || error
    });
  }
};
var getProviderWithMenu2 = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await providerProfileService.getProviderWithMenu(
      id
    );
    res.status(200).json({
      success: true,
      message: "Provider details with menu fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Provider not found or failed to fetch details.",
      error: error.message || error
    });
  }
};
var createProviderProfile2 = async (req, res) => {
  const userId = req.user?.id;
  const data = {
    ...req.body,
    userId
  };
  try {
    const result = await providerProfileService.createProviderProfile(data);
    res.status(201).json({
      success: true,
      message: "Provider profile created successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Provider profile creation failed. Please try again.",
      error: error.message || error
    });
  }
};
var providerController = {
  getSignleProvider: getSignleProvider2,
  createProviderProfile: createProviderProfile2,
  getProviderWithMenu: getProviderWithMenu2,
  getAllProviders
};

// src/modules/providerProfile/providerProfile.routes.ts
var router3 = Router3();
router3.get("/", providerController.getAllProviders);
router3.get(
  "/single",
  auth_default(UserRole.PROVIDER),
  providerController.getSignleProvider
);
router3.get("/:id", providerController.getProviderWithMenu);
router3.post(
  "/",
  auth_default(UserRole.PROVIDER),
  providerController.createProviderProfile
);
var providerProfileRouter = router3;

// src/modules/orders/orders.routes.ts
import { Router as Router4 } from "express";

// src/modules/orders/orders.service.ts
var createOrders = async (data) => {
  return await prisma.orders.create({
    data
  });
};
var getUsersOrders = async (id) => {
  return await prisma.orders.findMany({
    where: {
      customerId: id
    }
  });
};
var getAllOrders = async () => {
  return await prisma.orders.findMany();
};
var getOrderDetails = async (id) => {
  return await prisma.orders.findUnique({
    where: {
      id
    },
    include: {
      provider: true
    }
  });
};
var getOrderForProvider = async (id) => {
  return await prisma.orders.findMany({
    where: {
      providerProfileId: id
    }
  });
};
var ordersService = {
  createOrders,
  getAllOrders,
  getOrderForProvider,
  getUsersOrders,
  getOrderDetails
};

// src/modules/orders/orders.controller.ts
var orderCreate = async (req, res) => {
  const userId = req.user?.id;
  const orderData = {
    ...req.body,
    customerId: userId
  };
  try {
    const result = await ordersService.createOrders(orderData);
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: result
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Order creation failed. Please try again.",
      error: error.message || error
    });
  }
};
var getUsersOrders2 = async (req, res) => {
  const id = req.user?.id;
  try {
    const result = await ordersService.getUsersOrders(id);
    res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch user orders. Please try again.",
      error: error.message || error
    });
  }
};
var getAllOrders2 = async (req, res) => {
  try {
    const result = await ordersService.getAllOrders();
    res.status(200).json({
      success: true,
      message: " orders fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch orders. Please try again.",
      error: error.message || error
    });
  }
};
var getOrderDetails2 = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ordersService.getOrderDetails(id);
    res.status(200).json({
      success: true,
      message: "Order details fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Order not found or failed to fetch details.",
      error: error.message || error
    });
  }
};
var getOrderForProvider2 = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ordersService.getOrderForProvider(id);
    res.status(200).json({
      success: true,
      message: "Order  fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Order not found or failed to fetch .",
      error: error.message || error
    });
  }
};
var ordersController = {
  orderCreate,
  getAllOrders: getAllOrders2,
  getOrderForProvider: getOrderForProvider2,
  getUsersOrders: getUsersOrders2,
  getOrderDetails: getOrderDetails2
};

// src/modules/orders/orders.routes.ts
var router4 = Router4();
router4.get(
  "/",
  auth_default(UserRole.CUSTOMER, UserRole.PROVIDER),
  ordersController.getUsersOrders
);
router4.get("/all", auth_default(UserRole.ADMIN), ordersController.getAllOrders);
router4.get(
  "/:id",
  auth_default(UserRole.CUSTOMER, UserRole.PROVIDER),
  ordersController.getOrderDetails
);
router4.get(
  "/provider/:id",
  auth_default(UserRole.PROVIDER),
  ordersController.getOrderForProvider
);
router4.post(
  "/",
  auth_default(UserRole.CUSTOMER, UserRole.PROVIDER),
  ordersController.orderCreate
);
var orderRoutes = router4;

// src/modules/admin/admin.routes.ts
import { Router as Router5 } from "express";

// src/modules/admin/admin.service.ts
var getAllUsers = async () => {
  return await prisma.user.findMany();
};
var updateUserStatus = async (id, status) => {
  return await prisma.user.update({
    where: {
      id
    },
    data: {
      status
    }
  });
};
var adminService = {
  getAllUsers,
  updateUserStatus
};

// src/modules/admin/admin.controller.ts
var getAllUsers2 = async (req, res) => {
  try {
    const result = await adminService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users. Please try again later.",
      error: e.message || e
    });
  }
};
var updateUserStatus2 = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await adminService.updateUserStatus(id, status);
    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "User status update failed. Please try again.",
      error: e.message || e
    });
  }
};
var adminController = {
  getAllUsers: getAllUsers2,
  updateUserStatus: updateUserStatus2
};

// src/modules/admin/admin.routes.ts
var router5 = Router5();
router5.get("/", auth_default(UserRole.ADMIN), adminController.getAllUsers);
router5.patch("/:id", auth_default(UserRole.ADMIN), adminController.updateUserStatus);
var adminRouter = router5;

// src/middlewares/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route not found!",
    path: req.originalUrl,
    date: Date()
  });
}

// src/middlewares/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "You provide incorrect field type or missing fields!";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 400;
      errorMessage = "An operation failed because it depends on one or more records that were required but not found.";
    } else if (err.code === "P2002") {
      statusCode = 400;
      errorMessage = "Duplicate key error";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errorMessage = "Foreign key constraint failed";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Error occurred during query execution";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMessage = "Authentication failed. Please check your creditials!";
    } else if (err.errorCode === "P1001") {
      statusCode = 400;
      errorMessage = "Can't reach database server";
    }
  }
  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails
  });
}
var globalErrorHandler_default = errorHandler;

// src/modules/review/review.routes.ts
import { Router as Router6 } from "express";

// src/modules/review/review.service.ts
var createReview = async (payload) => {
  const result = await prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      mealId: payload.mealId,
      customerId: payload.customerId
    }
  });
  return result;
};
var ReviewService = {
  createReview
};

// src/modules/review/review.controller.ts
var createReview2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const data = {
      ...req.body,
      customerId: userId
    };
    const result = await ReviewService.createReview(data);
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Review creation failed"
    });
  }
};
var ReviewController = {
  createReview: createReview2
};

// src/modules/review/review.routes.ts
var router6 = Router6();
router6.post("/", auth_default(UserRole.CUSTOMER), ReviewController.createReview);
var ReviewRoutes = router6;

// src/app.ts
var app = express();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.get("/auth/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  });
  return res.json(session);
});
app.use("/api/categories", categoriesRouter);
app.use("/api/provider/meals", mealsRouter);
app.use("/api/meals", mealsRouter);
app.use("/api/provider/orders", mealsRouter);
app.use("/api/providers", providerProfileRouter);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/users", adminRouter);
app.use("/api/review", ReviewRoutes);
app.get("/", (req, res) => {
  res.send("Hello FoodHub");
});
app.use(notFound);
app.use(globalErrorHandler_default);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
