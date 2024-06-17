import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const criarItem = async (request: Request, response: Response) => {
	const { nome, valor, quantidade } = request.body;
	const { lojaId } = request.params;

	const novoItem = await prisma.produto.create({
		data: { nome, valor, quantidade, Loja : {
			connect: { id: lojaId }
		} }
	});

	return ( response.json(novoItem) );
};

// exibe todos os produtos de uma loja
export const listarTodosProdutos = async( request: Request, response: Response ) => {
	const { lojaId } = request.params;
	return ( response.json( await prisma.produto.findMany({
		where: {
			lojaId: lojaId
		}
	})))
};