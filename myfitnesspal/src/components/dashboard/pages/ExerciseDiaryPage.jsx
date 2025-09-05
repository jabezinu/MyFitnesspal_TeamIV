"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { exerciseService } from "../../lib/exercise"; {/* 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import { Badge } from "../../ui/badge";*/}
import { Dumbbell, Plus, Calendar, Flame, ChevronLeft, ChevronRight, Clock, Activity, Edit, Trash2 } from "lucide-react";

export const ExerciseDiaryPage = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyExercise, setDailyExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  const dateString = selectedDate.toISOString().split("T")[0];
  const isToday = dateString === new Date().toISOString().split("T")[0];

  useEffect(() => {
    loadDailyExercise();
  }, [selectedDate, user]);

  const loadDailyExercise = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const exercise = await exerciseService.getDailyExercise(dateString, user.$id);
      setDailyExercise(exercise);
    } catch (error) {
      console.error("Failed to load daily exercise:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    setSelectedDate(newDate);
  };

  const formatDate = (date) => {
    if (isToday) return "Today";

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (dateString === yesterday.toISOString().split("T")[0]) return "Yesterday";

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  const goals = {
    caloriesBurned: 400,
    duration: 60, // minutes
    exerciseDays: 4, // per week
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your exercise diary...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-primary" />
            Exercise Diary
          </h1>
          <p className="text-muted-foreground">Track your workouts and fitness activities</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link to="/exercise/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Exercise
            </Link>
          </Button>
        </div>
      </div>

      {/* Date Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => navigateDate("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="text-center">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">{formatDate(selectedDate)}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <Button variant="ghost" size="sm" onClick={() => navigateDate("next")} disabled={isToday}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Daily Summary */}
      {dailyExercise && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
              <Flame className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{dailyExercise.totalCaloriesBurned}</div>
              <p className="text-xs text-muted-foreground">Goal: {goals.caloriesBurned} cal</p>
              <Progress value={(dailyExercise.totalCaloriesBurned / goals.caloriesBurned) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Duration</CardTitle>
              <Clock className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{dailyExercise.totalDuration}m</div>
              <p className="text-xs text-muted-foreground">Goal: {goals.duration}m</p>
              <Progress value={(dailyExercise.totalDuration / goals.duration) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Exercises</CardTitle>
              <Activity className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{dailyExercise.exercises.length}</div>
              <p className="text-xs text-muted-foreground">Activities completed</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Exercise Entries */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Today's Workouts</h2>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/exercise/add?date=${dateString}`}>
              <Plus className="h-4 w-4 mr-2" />
              Add Exercise
            </Link>
          </Button>
        </div>

        {!dailyExercise || dailyExercise.exercises.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Dumbbell className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No exercises logged</h3>
              <p className="text-muted-foreground mb-4">Start tracking your workouts to see your progress</p>
              <Button asChild>
                <Link to={`/exercise/add?date=${dateString}`}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Exercise
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {dailyExercise.exercises.map((exercise) => (
              <Card key={exercise.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-full ${
                          exercise.type === "cardio" ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {exercise.type === "cardio" ? (
                          <Activity className="h-4 w-4" />
                        ) : (
                          <Dumbbell className="h-4 w-4" />
                        )}
                      </div>
                      {exercise.exerciseName}
                      <Badge variant={exercise.type === "cardio" ? "default" : "secondary"}>{exercise.type}</Badge>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {exercise.type === "cardio" ? (
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-semibold">{exercise.duration}m</div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-semibold text-primary">{exercise.caloriesBurned}</div>
                        <div className="text-sm text-muted-foreground">Calories</div>
                      </div>
                      {exercise.distance && (
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-lg font-semibold">
                            {exercise.distance} {exercise.distanceUnit}
                          </div>
                          <div className="text-sm text-muted-foreground">Distance</div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-lg font-semibold">{exercise.sets?.length || 0}</div>
                          <div className="text-sm text-muted-foreground">Sets</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-lg font-semibold">{exercise.totalReps}</div>
                          <div className="text-sm text-muted-foreground">Total Reps</div>
                        </div>
                      </div>
                      {exercise.sets && exercise.sets.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Sets:</h4>
                          <div className="space-y-2">
                            {exercise.sets.map((set, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                                <span className="text-sm">Set {index + 1}</span>
                                <span className="text-sm font-medium">
                                  {set.reps} reps × {set.weight}kg
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link to="/exercise/add?type=cardio" className="block">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Add Cardio
              </CardTitle>
              <CardDescription>Log running, cycling, swimming, and more</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link to="/exercise/add?type=strength" className="block">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-primary" />
                Add Strength
              </CardTitle>
              <CardDescription>Track weights, sets, and reps</CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>
    </div>
  );
};