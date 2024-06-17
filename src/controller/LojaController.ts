import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const criarLoja = async(request: Request, response: Response) => {
	const { nome } = request.body;
	const { usuarioId } = request.params;

	const novaLoja = await prisma.loja.create( {
		data: {
			nome,
			Usuario: {
				connect: {
					id: usuarioId
				}
			}
		}
	});

	return (response.json(novaLoja));
}