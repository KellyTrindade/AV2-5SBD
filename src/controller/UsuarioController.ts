import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { hash } from "bcryptjs";

export const criarUsuario = async (request: Request, response: Response) => {
	const { nome, email, senha, perfil } = request.body;

	const hashSenha = await hash( senha, 8 )

	const novoUsuario = await prisma.usuario.create({
		data: { nome, email, senha: hashSenha, Perfil: {
			connect: {
				descricao: perfil
			}
		} }
	});

	return ( response.json(novoUsuario) );
};