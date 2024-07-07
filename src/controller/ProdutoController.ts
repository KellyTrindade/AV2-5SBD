import { Request, Response } from "express";

import { prisma } from "../database/prisma";

export const criarItem = async (req: Request, res: Response) => {
  const { nome, valor, quantidade } = req.body;

  const produto = await prisma.produto.create({
    data: {
      nome,
      valor,
      quantidade
    },
  });

  return res.json(produto);
};

export const atualizarItem = async (req: Request, res: Response) => {
  try {
    const { nome, valor, quantidade } = req.body;
    const { idProduto } = req.params;

    const Product = await prisma.product.update({
      where: {
        id: idProduto,
      },
      data: {
        nome,
        valor,
        quantidade,
      },
    });

    return res.status(200).json(Product);
  } catch (error) {
    return res.status(400).json(error);
  }
};
