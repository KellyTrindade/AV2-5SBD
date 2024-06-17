import { Router } from "express";
import { criarUsuario } from "./controller/UsuarioController";
import { criarPerfil, listarPerfis } from "./controller/PerfilController";
import { criarLoja } from "./controller/LojaController";
import { criarItem, listarTodosProdutos } from "./controller/ProdutosController";


export const router = Router();

router.get( "/", (request, response) => {
	return ( response.json({versao: "0.0.1"}) )
});

router.post( "/usuario", criarUsuario);



router.post( "/perfil", criarPerfil);
router.get( "/listarPerfis", listarPerfis);


router.post( "/loja/:usuarioId", criarLoja);
router.post( "/loja/novoProduto/:lojaId", criarItem);
router.get( "/loja/listarProdutos/:lojaId", listarTodosProdutos);