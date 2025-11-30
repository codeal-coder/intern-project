import { Task } from "../models/task.js";
import { User } from "../models/user.js";
import httpStatus from "http-status";


const addTask = async(req,res)=>{
    try {
        console.log("add task");
        
        const{title,description} = req.body;
        const userId = req.user.id;

        if(!title || !description){
            return res.status(401).json({message:"missing data"});
        }

        const userDetails = await User.findOne({_id:userId,role:"User"})

        if(!userDetails){
            return res.status(401).json({message:"user details not found"})
        }

        const newtask = await Task.create({
            title:title,
            description:description,
            userId:userDetails._id
        }) 

        const updatedUser = await User.findByIdAndUpdate(
            {_id:userId},
            {
                $push:{
                    task:newtask._id,
                }
            },
            {new:true},
        )
        
        return res.status(httpStatus.CREATED).json({message:"task added",newtask,updatedUser})
  
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"task:somthing went wrong"})
    }
}

const updateTask = async(req,res) =>{
    try {
        const taskId = req.params.id;
        const updates = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            updates,
            { new: true, runValidators: true } // return updated doc & validate schema
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(httpStatus.OK).json({message:"update successfully",updatedTask});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Failed to Update"})
    }
}

const deleteTask = async(req,res)=>{
    try {
        const taskId = req.params.id;
        const userId = req.user.id;
        
        if(!taskId){
            return res.status(401).json({message:"task id not found"})
        }
        
        const taskDetails = await Task.findById(taskId);

        if(!taskDetails){
            return res.status(401).json({message:"task details not found"})
        }

        const updatedUser = await User.findByIdAndUpdate(userId,{
            $pull:{task:taskId}
        });

        const deletetask = await Task.findByIdAndDelete(taskId);

        return res.status(httpStatus.NO_CONTENT).json({message:"Delete Successfully",deletetask})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:" Error Failed to Delete"})
    }
}

const getTask = async(req,res)=>{
    try {
        const taskId = req.params.id;
        const userId = req.user.id;

        if(!taskId){
            return res.status(401).json({message:"task id not found"})
        }
        const taskDetails = await Task.findById(taskId)
        if (!taskDetails) {
            return res.status(401).json({message:"task details not found"})
        }
            return res.status(httpStatus.OK).json({message:"task fetch successfully",taskDetails})
    } catch (error) {
        
    }
}
const getAllTask = async(req,res)=>{
   try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("task");
    console.log("user",user);

    if (!user) return res.status(404).json({ message: "User not found" });

    const pendingTasks = user.task.filter(t => t.Status === "pending");

    console.log(pendingTasks);
    

    return res.status(httpStatus.OK).json(pendingTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

const completeTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { Status: "completed" },
      { new: true }   // return updated document
    );

    if (!updatedTask) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Task not found" });
    }

    return res.status(httpStatus.OK).json({
      message: "Task marked as completed",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while completing task" });
  }
};



const getCompletedTask = async(req,res)=>{
    
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ message: "User ID not found" });
        }

        const taskDetails = await Task.find({userId,Status:"completed"});

        if (!taskDetails || taskDetails.length === 0) {
            return res.status(200).json({ message: "No completed tasks found" });
        }
        
        return res.status(httpStatus.OK).json({message:"all completed task",taskDetails})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching Completed tasks" ,});
    }
}

export {getAllTask,getTask,getCompletedTask,addTask,updateTask,deleteTask,completeTask}