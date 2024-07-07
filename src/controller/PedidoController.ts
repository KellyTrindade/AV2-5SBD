import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import axios from 'axios';

export const criarPedido = async (req: Request, res: Response) => {
  try {
    const { nomeCliente, emailCliente, produtos } = req.body;

    let idCliente = await prisma.usuario.findUnique({
      where: {
        nome: nomeCliente,
        email: emailCliente
      }
    })

    if( !idCliente ) {
      const novoCliente = {
        nome: nomeCliente,
        email: emailCliente
      }

      const response = await axios.post('/criarUsuario', novoCliente, {
        headers: {
            'Content-Type': 'application/json'
        }
      });

      idCliente = response.data.id;
    }

    const estoque = await prisma.product.findMany({
      where: {
        id: { in: produtos.map((umProduto: any) => umProduto.id) },
      },
    });

    const listaProdutos = estoque.map((umProduto: any) => {
      const { id, nome, valor } = umProduto;
      const quantidade = produtos.find((p: any) => p.id === umProduto.id).quantidade;
      return {
        id,
        nome,
        valor,
        quantidade,
      };
    });

    let total = 0;
    for (const umProduto of listaProdutos) {
      total += umProduto.valor * parseInt(umProduto.quantidade);
    }

    const pedido = await prisma.pedido.create({
      data: {
        Total: total,
        Cliente: { connect: { idCliente } },
        ItensPedido: {
          create: listaProdutos.map((umProduto: any) => ({
            Produto: { connect: { id: umProduto.id } },
            Quantidade: umProduto.quantidade,
          })),
        },
      },
      include: {
        SaleProduct: true,
      },
    });

    listaProdutos.map(async (umProduto: any) => {
      await prisma.produto.updateMany({
        where: { id: umProduto.id },
        data: {
          quantidade: {
            decrement: parseInt(umProduto.quantidade),
          },
        },
      });
    });

    return res
      .status(201)
      .json({ pedido, message: "Compra realizada com sucesso." });
  } catch (error) {
    return res.status(400).json(error);
  }
};
