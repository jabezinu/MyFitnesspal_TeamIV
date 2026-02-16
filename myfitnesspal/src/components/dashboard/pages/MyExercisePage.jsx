"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { exerciseService } from "../../lib/exercise";
{/*import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Textarea } from "../../ui/textarea";
import { Alert, AlertDescription } from "../../ui/alert";*/}
import { ArrowLeft, Plus, Save, Edit, Trash2, Dumbbell } from "lucide-react";

const exerciseCategories = [
  "Cardio",
  "Chest",
  "Back",
  "Shoulders",
  "Arms",
  "Legs",
  "Core",
  "Full Body",
  "Sports",
  "Flexibility",
  "Other",
];

const muscleGroupOptions = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Forearms",
  "Core",
  "Quadriceps",
  "Hamstrings",
  "Glutes",
  "Calves",
  "Full Body",
];

const equipmentOptions = [
  "None",
  "Barbell",
  "Dumbbells",
  "Kettlebell",
  "Resistance Bands",
  "Pull-up Bar",
  "Bench",
  "Machine",
  "Cable",
  "Medicine Ball",
  "Treadmill",
  "Stationary Bike",
  "Other",
];

export const MyExercisesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState("");

  const [customExercise, setCustomExercise] = useState({
    name: "",
    category: "Other",
    type: "cardio",
    description: "",
    caloriesPerMinute: "",
    muscleGroups: [],
    equipment: [],
  });

  const [customExercises, setCustomExercises] = useState([
    {
      id: "custom-1",
      name: "Home HIIT Circuit",
      category: "Full Body",
      type: "cardio",
      caloriesPerMinute: 12,
      description: "High-intensity interval training circuit at home",
      muscleGroups: ["Full Body"],
      equipment: ["None"],
      isCustom: true,
      userId: user?.$id,
    },
    {
      id: "custom-2",
      name: "Garage Tire Flips",
      category: "Strength",
      type: "strength",
      description: "Flipping heavy tires for strength and conditioning",
      muscleGroups: ["Full Body", "Core"],
      equipment: ["Other"],
      isCustom: true,
      userId: user?.$id,
    },
  ]);

  const handleInputChange = (field, value) => {
    setCustomExercise((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateExercise = async () => {
    setIsCreating(true);
    setMessage("");

    // Validation
    if (!customExercise.name.trim()) {
      setMessage("Exercise name is required");
      setIsCreating(false);
      return;
    }

    if (
      customExercise.type === "cardio" &&
      (!customExercise.caloriesPerMinute || Number.parseFloat(customExercise.caloriesPerMinute) <= 0)
    ) {
      setMessage("Valid calories per minute is required for cardio exercises");
      setIsCreating(false);
      return;
    }

    try {
      const newExercise = {
        name: customExercise.name.trim(),
        category: customExercise.category,
        type: customExercise.type,
        description: customExercise.description.trim() || undefined,
        caloriesPerMinute:
          customExercise.type === "cardio" ? Number.parseFloat(customExercise.caloriesPerMinute) : undefined,
        muscleGroups: customExercise.muscleGroups.length > 0 ? customExercise.muscleGroups : undefined,
        equipment: customExercise.equipment.length > 0 ? customExercise.equipment : undefined,
        isCustom: true,
        userId: user?.$id,
      };

      const createdExercise = await exerciseService.addCustomExercise(newExercise);
      setCustomExercises((prev) => [createdExercise, ...prev]);
      setMessage("Custom exercise created successfully!");

      // Reset form
      setCustomExercise({
        name: "",
        category: "Other",
        type: "cardio",
        description: "",
        caloriesPerMinute: "",
        muscleGroups: [],
        equipment: [],
      });
      setShowCreateForm(false);
    } catch (error) {
      setMessage("Failed to create custom exercise. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const toggleArrayItem = (array, item) => {
    return array.includes(item) ? array.filter((i) => i !== item) : [...array, item];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/exercise")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-primary" />
            My Exercises
          </h1>
          <p className="text-muted-foreground">Create and manage your custom exercises</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Exercise
        </Button>
      </div>

      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {/* Create Exercise Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create Custom Exercise</CardTitle>
            <CardDescription>Add your own exercises, workouts, or activities not in our database</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Exercise Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Backyard Sprints"
                  value={customExercise.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={customExercise.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {exerciseCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type">Exercise Type</Label>
                <Select
                  value={customExercise.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="strength">Strength</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {customExercise.type === "cardio" && (
                <div className="space-y-2">
                  <Label htmlFor="caloriesPerMinute">Calories per Minute</Label>
                  <Input
                    id="caloriesPerMinute"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 8.5"
                    value={customExercise.caloriesPerMinute}
                    onChange={(e) => handleInputChange("caloriesPerMinute", e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the exercise and how to perform it"
                value={customExercise.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Muscle Groups</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {muscleGroupOptions.map((muscle) => (
                  <label key={muscle} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customExercise.muscleGroups.includes(muscle)}
                      onChange={() =>
                        handleInputChange("muscleGroups", toggleArrayItem(customExercise.muscleGroups, muscle))
                      }
                      className="rounded border-border"
                    />
                    <span className="text-sm">{muscle}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Equipment</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {equipmentOptions.map((equipment) => (
                  <label key={equipment} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customExercise.equipment.includes(equipment)}
                      onChange={() =>
                        handleInputChange("equipment", toggleArrayItem(customExercise.equipment, equipment))
                      }
                      className="rounded border-border"
                    />
                    <span className="text-sm">{equipment}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateExercise} disabled={isCreating}>
                {isCreating ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Create Exercise
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Custom Exercises List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Custom Exercises</CardTitle>
          <CardDescription>Exercises you've created and can quickly add to your diary</CardDescription>
        </CardHeader>
        <CardContent>
          {customExercises.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Dumbbell className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No custom exercises yet</p>
              <Button variant="ghost" size="sm" className="mt-2" onClick={() => setShowCreateForm(true)}>
                Create your first custom exercise
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {customExercises.map((exercise) => (
                <div key={exercise.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{exercise.name}</div>
                    <div className="text-sm text-muted-foreground">{exercise.description}</div>
                    <div className="flex gap-2 mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          exercise.type === "cardio" ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {exercise.type}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800">{exercise.category}</span>
                      {exercise.caloriesPerMinute && (
                        <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
                          {exercise.caloriesPerMinute} cal/min
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" asChild>
                      <a href={`/exercise/add?exercise=${exercise.id}`}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyExercisesPage;