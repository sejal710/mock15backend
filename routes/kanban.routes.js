const {Board } = require("../model/kanban.model");
const express = require("express")

const kanbanRouter = express.Router();

kanbanRouter.post("/boards", async (req, res) => {
    const { name } = req.body;
    try {
      const board = new Board({ name });
      await board.save();
      res.json({data:board});
    } catch (error) {
      res.send({Message:error.message})
    }
});

kanbanRouter.get("/boards", async (req, res) => {
    try {
      const board = await Board.find()
      res.json({data:board});
    } catch (error) {
      res.send({Message:error.message})
    }
});

kanbanRouter.delete("/boards/:id", async (req, res) => {
    const id = req.params.id;
    // const payload = req.body
    try {
        await Board.findByIdAndDelete({_id:id});
      res.json({Message:"sucessfully Deleted"});
    } catch (error) {
      res.send({Message:error.message})
    }
});

// kanbanRouter.post('/task', async (req, res) => {
//     const task = new Task({
//       title: req.body.title,
//       description: req.body.description,
//       status: req.body.status,
//     });
  
//     try {
//        await task.save();
//       res.send({data:task})
//     } catch (err) {
//         res.send({Message:err.message})
//     }
//   })

kanbanRouter.post('/boards/:boardId/tasks', async (req, res) => {
    const { boardId } = req.params;
    const { title, description } = req.body;
  
    try {
      const board = await Board.findById(boardId);
  
      board.tasks.push({ title, description });
  
      await board.save();
      res.send({Message:"Data sucessfully add in task"})
    } catch (err) {
        res.send({Message:err.message})
    }
  });
  kanbanRouter.get('/boards/:boardId/tasks', async (req, res) => {
    const { boardId } = req.params;
  
    try {
      const board = await Board.findById(boardId);
  
      res.send({data:board})
    } catch (err) {
        res.send({Message:err.message})
    }
  });

  kanbanRouter.patch('/boards/:boardId/tasks/:taskId', async (req, res) => {
    const { boardId, taskId} = req.params;
    const { status } = req.body;
    try {
      const board = await Board.findById(boardId);
      const task = board.tasks.id(taskId);
      if (status) task.status = status;  
      await board.save();
      res.send({Message:"Updated"});
    } catch (err) {
      res.send({ message: err.message });
    }
  });

  kanbanRouter.post('/boards/:boardId/tasks/:taskId', async (req, res) => {
    const { boardId,taskId } = req.params;
    const { title, isCompleted } = req.body;
    try {
      const board = await Board.findById(boardId);
      const task = board.tasks.id(taskId);
    //   board.tasks.push({ title, description });
    task.subtasks.push({ title,isCompleted });
      await board.save();
        res.send(task)
    } catch (err) {
        res.send({Message:err.message})
    }
  });

  kanbanRouter.patch('/boards/:boardId/tasks/:taskId/subtasks/:subtaskId', async (req, res) => {
    const { boardId, taskId, subtaskId } = req.params;
    const { title, isCompleted } = req.body;
    try {
      const board = await Board.findById(boardId);
      const task = board.tasks.id(taskId);
      const subtask = task.subtasks.id(subtaskId);
  
      if (title) subtask.title = title;
      if (isCompleted !== undefined) subtask.isCompleted = isCompleted;
  
      await board.save();
      res.send({Message:"Updated"});
    } catch (err) {
      res.send({ message: err.message });
    }
  });
  
  
module.exports = {
   kanbanRouter
}