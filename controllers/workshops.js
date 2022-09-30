import Workshops from "../models/workshops";
import User from "../models/users";

export const create = async (req, res) => {
    const { name, description, is_private } = req.body
    try {
        const newWorkshop = await Events.create({
            name,
            description,
            is_private,
            date,
            avatar: req.file ? req.file.filename : "default.png",
        })

        return res.status(200).json({ New_Workshop: newWorkshop });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// get All workshops
export const getAllWorkshops = async (req, res) => {

    try {
        const workshops = await Workshops.find()
        return res.status(200).json({ Workshops: workshops });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// get One workshop
export const getOneWorkshop = async (req, res) => {
    const id = req.params.id
    try {
        const workshop = await Workshops.findById(id)
        return res.status(200).json({ Workshop: workshop });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// edit One workshop
export const editOneWorkshop = async (req, res) => {
    const id = req.params.id
    try {
        await Workshops.findByIdAndUpdate(id, req.body)
        return res.status(200).json({ message: "Workshop updated successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// delete One workshop
export const DeleteOneWorkshop= async (req, res) => {
    const id = req.params.id
    try {
        await Workshops.findByIdAndDelete(id)
        return res.status(200).json({ message: "Workshop deleted successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// join a workshop
export const joined = async (req, res) => {
    const { user_id, workshop_id } = req.body;
    try {

        const workshop = await Workshops.findById(workshop_id )
        const participants = workshop.participants_id
    
        const found = participants.find(element => element.equals(user_id))
        if (!found) {
            await User.findByIdAndUpdate(
                user_id, {
                $push: { workshops_id: workshop_id  }
            }
            )

            await Workshops.findByIdAndUpdate(
                workshop_id,
                {
                    $push: {
                        participants_id: user_id
                    }
                }
            )
            return res.status(200).json({ message: "Welcome " })
        }
        else {
            return res.status(200).json({ message: "Already Joined " })
        }
    
  
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


// get new workshops

// get new events 
export const getnewEvents = async (req, res) => {
    const id = req.params.id
    try {
        let new_workshops=[]
        const workshops = await Workshops.find()
        if (workshops.length !== 0) {
            for (let i = 0; i < workshops.length; i++) {
                const participants = workshops[i].participants_id
                const found = participants.find(element => element.equals(id))
                if (found == undefined) {
                    new_workshops.push({id: workshops[i]._id,name: workshops[i].name, profile: workshops[i].avatar, date:workshops[i].date})
                }
            }
        }if (new_workshops !== 0) {
          return   res.status(200).json(new_workshops)
          }
          else {
          return   res.status(200).json("No new Events")
      
          }

    } catch (error) {
        return   res.status(500).json({message: error.message})
    }
}

// function if the user can join or not 
export const canjoined = async (req, res) => {
    const user_id = req.params.user_id
    const id = req.params.id
    try {
        const workshop = await Workshops.findById(id)
        if (workshop.participants_id.length !== 0) {
            const found = workshop.participants_id.length.find(element => element.equals(user_id))
            if (found) {
                return res.status(200).json({ message: "Already Joined" })
            }
            else {
                return res.status(200).json({ message: "You can join" })
            }
        }
        else {
            return res.status(200).json({ message: "No participants" })
        }
    } catch (error) {
        return res.status(400).json({ message: error.message })

    }
}


