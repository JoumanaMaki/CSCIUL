import Events from "../models/events";
import User from "../models/users";

export const create = async (req, res) => {
    const { name, description, is_private } = req.body
    try {
        const newEvent = await Events.create({
            name,
            description,
            is_private,
            date,
            avatar: req.file ? req.file.filename : "default.png",
        })

        return res.status(200).json({ New_Event: newEvent });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// get All Events
export const getAllEvents = async (req, res) => {

    try {
        const events = await Events.find()
        return res.status(200).json({ Events: events });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// get One Event
export const getOneEvent = async (req, res) => {
    const id = req.params.id
    try {
        const event = await Events.findById(id)
        return res.status(200).json({ Event: event });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// edit One Event
export const editOneEvent = async (req, res) => {
    const id = req.params.id
    try {
        await Events.findByIdAndUpdate(id, req.body)
        return res.status(200).json({ message: "Event updated successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// delete One Event
export const DeleteOneEvent = async (req, res) => {
    const id = req.params.id
    try {
        await Events.findByIdAndDelete(id)
        return res.status(200).json({ message: "Event deleted successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// join an event
export const joined = async (req, res) => {
    const { user_id, event_id } = req.body;
    try {

        const event = await Events.findById(event_id)
        const participants = event.participants_id

        const found = participants.find(element => element.equals(user_id))
        if (!found) {
            await User.findByIdAndUpdate(
                user_id, {
                $push: { events_id: event_id }
            }
            )

            await Events.findByIdAndUpdate(
                event_id,
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


// get new events 
export const getnewEvents = async (req, res) => {
    const id = req.params.id
    try {
        let new_events=[]
        const events = await Events.find()
        if (events.length !== 0) {
            for (let i = 0; i < events.length; i++) {
                const participants = events[i].participants_id
                const found = participants.find(element => element.equals(id))
                if (found == undefined) {
                    new_events.push({id: events[i]._id,name: events[i].name, profile: events[i].avatar, date:events[i].date})
                }
            }
        }if (new_events !== 0) {
          return   res.status(200).json(new_events)
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
        const event = await Events.findById(id)
        if (event.participants_id.length !== 0) {
            const found = event.participants_id.length.find(element => element.equals(user_id))
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


