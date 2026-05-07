import mongoose from "mongoose";

export type Status = "not-started" | "in-progress" | "done";
export type Priority = "low" | "medium" | "high";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    status: {
      type: String,
      enum: ["not-started", "in-progress", "done"],
      default: "not-started",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },

    deadline: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);