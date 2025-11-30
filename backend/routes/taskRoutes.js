import { Router } from "express";
import {auth,isAdmin,isUser} from "../middleware/auth.js"
import {completeTask,getAllTask,getTask,getCompletedTask,addTask,updateTask,deleteTask} from "../controllers/task.controllers.js"

const router = Router();

router.route("/").post( auth,isUser,addTask);
router.route("/:id").put(auth,isUser,updateTask);
router.route("/:id").delete(auth,isUser,deleteTask);
router.route("/completed").get(auth,isUser,getCompletedTask);
router.route("/").get(auth,isUser,getAllTask);
router.route("/:id").get(auth,isUser,getTask);
router.route("/complete/:id").put(auth,isUser,completeTask)


export default router;