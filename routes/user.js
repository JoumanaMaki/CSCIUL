import express from "express"
import { signup,
     login,
     upload,
     getAllUsers,
     getUser,
     editUser,
     deleteUser,
     changepass,
     getImage
      } from "../controllers/users"

const router = express.Router()
router.post("/createUser" ,upload.single("avatar"),signup )
router.post("/login" ,login )
router.get("/getAllUsers", getAllUsers)
router.get("/getUser/:id", getUser)
router.put("/editUser/:id", editUser)
router.delete("/deleteUser/:id", deleteUser)
router.put("/changepass/:id",changepass)
export default router