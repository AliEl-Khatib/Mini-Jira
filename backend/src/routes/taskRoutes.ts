import { Router } from "express";
import Task from "../models/Task";

const router = Router();

// helper func
const formatTask = (task: any) => {
  const obj = task.toObject();
  return {
    ...obj,
    id: obj._id.toString(), 
    _id: undefined,
  };
};

//GET tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks.map(formatTask));
});

//GET one task
router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json(formatTask(task));
});

//CREATE task
router.post("/", async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(formatTask(task));
});

//UPDATE task
router.put("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      returnDocument: "after"
    }
  );

  if (!task) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json(formatTask(task));
});

// DELETE
router.delete("/:id", async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json({ message: "Deleted" });
});

export default router;