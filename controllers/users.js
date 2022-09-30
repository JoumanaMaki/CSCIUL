import User from "../models/users.js"
import bcrypt from "bcryptjs";
import multer from "multer"
import path from "path";
import { createToken } from "../utils/token.js";
//create an account
export const signup = async (req, res)=>{
    const { name, email, gender, password, phone, birthday,  major, degree, level } = req.body;
    try {
        const users = await User.find({ email: email })
        if (users.length == 0) {
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            gender,
            phone,
            avatar: req.file ? req.file.filename : "default.png",
            birthday,
            major,
            degree,
            level
          });
          return res.status(200).json({ user: { name, email } });
        }
        else {
          return res.status(400).json({message:"Email already exist"})
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
    
      }
}

//log in
export const login = async(req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
  try {
    var user = null;
    // check if the user exists
    user = await User.find({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" })
    }

    //check if the password matches
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    //generate a token to the user
    const token = await createToken({ id: user._id, role: user.role });
   
    //return user info and the token
    return res.status(200).json({
      result: {
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user._id
      },
      token: token
    });
  } catch (error) {
    console.log("error:")
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


// get All users 
export const getAllUsers = async (req, res)=>{
    try{
        const users = await User.find()
       return  res.status(200).json({Users : users})
    }
    catch(error){
return res.status(500).json({ message:error.message });
    }
}

// get one user
export const getUser = async (req, res)=>{
    const id = req.params.id
    try{
        const user = await User.findById(id)
        return res.status(200).json(user)
    }catch(error){
       return res.status(500).json({message: error.message})
    }
}


//edit user with id
export const editUser = async (req, res) => {
    const id = req.params.id
    try {
      await User.findByIdAndUpdate(id, req.body)
      res.json({ message: "User updated successfully" })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }


//delete user with id
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
  
  export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/user_uploads/user_profiles")
    },
    filename: (req, file, cb) => {
      console.log(file)
  
      cb(null, Date.now() + path.extname(file.originalname))
      //console.log("./uploads/user_uploads/user_profiles/" + Date.now() + path.extname(file.originalname))
  
    }
  
  });
  export const upload = multer({ storage: storage });

  export const getImage = async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id)
      const image = user.avatar
      res.status(200).json(image)
  
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }



//reset password
export const changepass = async (req, res) => {
    const id = req.params.id;
    const { old_pass, new_pass } = req.body
    try {
      
      const user = await User.findById(id);
      
      const isPasswordCorrect = await bcrypt.compare(old_pass, user.password);
      
      if (!isPasswordCorrect) {

        return res.status(400).json({ message: "Invalid credentials." });
      }
      const hashedPassword = await bcrypt.hash(new_pass, 10);
      await User.findByIdAndUpdate(id, { password: hashedPassword })
      
      res.status(200).json({ message: "Password changed successfully", pass: hashedPassword })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }


