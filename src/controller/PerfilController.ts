import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const criarPerfil = async (request: Request, response: Response) => {
	const { descricao } = request.body;

	const novoPerfil = await prisma.perfil.create({
		data: { descricao }
	});

	return ( response.json(novoPerfil) );
};

export const listarPerfis = async (request: Request, response: Response) => {
	return ( response.json( await prisma.perfil.findMany() ) )
};