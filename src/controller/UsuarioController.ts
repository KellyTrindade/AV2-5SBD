import { Request, Response } from "express";

import { prisma } from "../database/prisma";

export const criarUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, email } = req.body;

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email
      },
      select: {
        id: true
      },
    });

    return res.status(201).json(usuario);
  } catch (error) {
    return res.status(400).json(error);
  }
};