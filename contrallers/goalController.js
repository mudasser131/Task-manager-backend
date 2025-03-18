const asyncHandler = require('express-async-handler');
const Goal = require('../model/goalModel');

// Get Goals for the authenticated user
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id }); // Filter goals by the logged-in user's ID

  res.status(200).json(goals);
});

// Create a Goal for the authenticated user
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field.');
  }

  // Create a new goal with the authenticated user's ID
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id, // Attach the user ID to the goal
  });

  res.status(200).json(goal);
});

// Update a Goal for the authenticated user
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    return res.status(400).json({ message: 'Goal not found' });
  }

  // 🔹 Ensure `req.user` exists
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Not authorized, user not found" });
  }

  // 🔹 Ensure `goal.user` exists before calling `.toString()`
  if (!goal.user || goal.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'Not authorized to update this goal' });
  }

  // ✅ Update the goal
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedGoal);
});


// Delete a Goal for the authenticated user
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  // Check if the goal belongs to the authenticated user
  if (goal.user.toString() !== req.user.id) {
    res.status(401).json({ message: 'Not authorized to delete this goal' });
    return;
  }

  // Delete the goal
  const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json({ deletedGoal, message: `Deleted the goal: ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
