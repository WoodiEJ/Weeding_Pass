import { buscarConvidado, checkIN, deletarConvidado, editarConvidado, listarConvidados, registrarConvidado } from "@/controllers/convidado.controller";
import { login } from "@/controllers/login.controller";
import { buscarUsuario, criarUsuario, deletarUsuarios, editarUsuario, listarUsuarios } from "@/controllers/usuarios.controller";
import { adminMiddleware } from "@/middlewares/adminMiddleware";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router()

// Rotas de usuario 
router.get("/usuarios", authMiddleware, adminMiddleware, listarUsuarios)
router.get("/usuarios/:id", authMiddleware, adminMiddleware, buscarUsuario)
router.post("/usuarios/criar", authMiddleware, adminMiddleware, criarUsuario)
router.put("/usuarios/:id", authMiddleware, adminMiddleware, editarUsuario)
router.delete("/usuarios/:id", authMiddleware, adminMiddleware, deletarUsuarios)

// Rotas de convidados
router.get("/convidados", authMiddleware, listarConvidados)
router.get("/convidados/:id", authMiddleware, buscarConvidado)
router.post("/convidados/registrar", authMiddleware, registrarConvidado)
router.put("/convidados/:id", authMiddleware, adminMiddleware, editarConvidado)
router.put("/convidados/checkin/:id", authMiddleware, checkIN)
router.delete("/convidados/:id", authMiddleware, adminMiddleware, deletarConvidado)

// Login
router.post("/login", login)

export default router