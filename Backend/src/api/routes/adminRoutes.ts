import express from "express";
import { AdminController } from "../controllers/AdminController";
import { ListOwner } from "../../core/usecases/adminUseCase/ListOwner";
import { ListUser } from "../../core/usecases/adminUseCase/ListUser";
import { LoginAdmin } from "../../core/usecases/adminUseCase/LoginAdmin";
import { ToggleBlockStatus } from "../../core/usecases/adminUseCase/ToggleBlockStatus";
import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { AdminRepository } from "../infrastructure/repositories/AdminRepository";
import { AuthService } from "../../core/services/AuthService";
import { authMiddleware } from "../middlewares/authMiddleware";


const userRepository = new UserRepository();
const adminRepository = new AdminRepository();
const authService = new AuthService();

// Create the AdminController instance
const adminController = new AdminController(
  new LoginAdmin(adminRepository, authService),
  new ListUser(userRepository),
  new ListOwner(userRepository),
  new ToggleBlockStatus(userRepository),
);

// Initialize the router
const router = express.Router();

// Define routes with bound controller methods
router.post("/login", adminController.login.bind(adminController));
router.get("/userlist", authMiddleware, adminController.getUserList.bind(adminController));
router.get("/ownerlist", adminController.getOwnerList.bind(adminController));
router.post(
  "/toggle-block/:userId",
  adminController.toggleBlock.bind(adminController)
);

export default router;
