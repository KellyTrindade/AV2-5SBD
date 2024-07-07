import { Router } from "express";

import {
  criarPedido
} from "./controller/PedidoController";

import {
  criarUsuario
} from "./controller/UsuarioController";
import { atualizarItem, criarItem } from "./controller/ProdutoController";

export const router = Router();

/**
 * Rotas do usuário
 */
router.post("/user", criarUsuario);

/**
 * Rotas do produto
 */
router.post(
  "/criarProduto",
  criarItem
);
router.put(
  "/atualizarItem/:productId",
  atualizarItem
);

/**
 * Rotas da venda
 */
router.post(
  "/criarPedido",
  criarPedido
);