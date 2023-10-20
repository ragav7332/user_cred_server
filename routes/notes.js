import express from 'express';
import { deleteNotes, getAllNotes, getUserNotes, postnewNotes, updateNotes } from '../controller/notes.js';

const router = express.Router();

//get all the notes api
router.get("/all", async (req, res) => {
  try {
    const notes = await getAllNotes();
    if (!notes) {
      return res.status(404).json({ error: "No Content Available" });
    }
    res.status(200).json({ data: notes, });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get all user notes api
router.get("/user/all", async (req, res) => {
  try {
    const notes = await getUserNotes(req);
    if (!notes) {
      return res.status(404).json({ error: "No Content Available" });
    }
    res.status(200).json({
      data: notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// post new notes
router.post("/user/add", async (req, res) => {
  try {
    const newNotes = await postnewNotes(req);
    if (!newNotes) {
      return res.status(400).json({
        error: "Error occured while saving the data",
      });
    }
    res.status(201).json({
      data: newNotes,
      message: "Notes saved Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//edit the notes api
router.put("/user/edit/:id", async (req, res) => {
  try {
    const updatedNotes = await updateNotes(req);
    if (!updatedNotes) {
      return res.status(400).json({
        error: "Error occured while saving the data",
      });
    }
    res.status(200).json({
      message: "Updated Successfully",
      data: updatedNotes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete the notes api
router.delete("/user/delete/:id", async(req,res)=>{
    try {
      const removeNotes = await deleteNotes(req);
      if (!removeNotes) {
        return res.status(400).json({
          error: "Error occured while deleting the data",
        });
      }
      res.status(202).json({
        message: "Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
});

export const notesRouter = router;