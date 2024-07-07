-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dtInclusao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtAlteracao" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "lojaId" TEXT,
    "dtInclusao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtAlteracao" DATETIME NOT NULL,
    CONSTRAINT "Produto_lojaId_fkey" FOREIGN KEY ("lojaId") REFERENCES "Loja" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Loja" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "dtInclusao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtAlteracao" DATETIME NOT NULL,
    "usuarioId" TEXT,
    CONSTRAINT "Loja_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
