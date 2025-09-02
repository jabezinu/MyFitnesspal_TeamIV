"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { foodService } from "../../lib/food"; {/*
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import { Badge } from "../../ui/badge"; */}
import {
  Apple,
  Plus,
  Calendar,
  Flame,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Sun,
  Moon,
  Cookie,
  Edit,
  Trash2,
} from "lucide-react";

const mealIcons = {
  breakfast: Coffee,
  lunch: Sun,
  dinner: Moon,
  snack: Cookie,
};

const mealLabels = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snacks",
};

export const FoodDiaryPage = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyNutrition, setDailyNutrition] = useState(null);
  const [loading, setLoading] = useState(true);

  const dateString = selectedDate.toISOString().split("T")[0];
  const isToday = dateString === new Date().toISOString().split("T")[0];

  useEffect(() => {
    loadDailyNutrition();
  }, [selectedDate, user]);

  const loadDailyNutrition = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const nutrition = await foodService.getDailyNutrition(dateString, user.$id);
      setDailyNutrition(nutrition);
    } catch (error) {
      console.error("Failed to load daily nutrition:", error);
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

  const getMealCalories = (mealType) => {
    if (!dailyNutrition) return 0;
    return dailyNutrition.meals[mealType].reduce((sum, entry) => sum + entry.calories, 0);
  };

  const goals = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 67,
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your food diary...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Date Navigation */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Apple className="h-8 w-8 text-green-500" />
            Food Diary
          </h1>
          <p className="text-muted-foreground">Track your daily nutrition and meals</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link to="/food/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Food
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
      {dailyNutrition && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calories</CardTitle>
              <Flame className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{dailyNutrition.totalCalories}</div>
              <p className="text-xs text-muted-foreground">Goal: {goals.calories} cal</p>
              <Progress value={(dailyNutrition.totalCalories / goals.calories) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Protein</CardTitle>
              <div className="h-4 w-4 rounded bg-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{dailyNutrition.totalProtein}g</div>
              <p className="text-xs text-muted-foreground">Goal: {goals.protein}g</p>
              <Progress value={(dailyNutrition.totalProtein / goals.protein) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carbs</CardTitle>
              <div className="h-4 w-4 rounded bg-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{dailyNutrition.totalCarbs}g</div>
              <p className="text-xs text-muted-foreground">Goal: {goals.carbs}g</p>
              <Progress value={(dailyNutrition.totalCarbs / goals.carbs) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fat</CardTitle>
              <div className="h-4 w-4 rounded bg-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{dailyNutrition.totalFat}g</div>
              <p className="text-xs text-muted-foreground">Goal: {goals.fat}g</p>
              <Progress value={(dailyNutrition.totalFat / goals.fat) * 100} className="mt-2" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Meals */}
      <div className="space-y-4">
        {Object.entries(mealLabels).map(([mealType, label]) => {
          const MealIcon = mealIcons[mealType];
          const mealEntries = dailyNutrition?.meals[mealType] || [];
          const mealCalories = getMealCalories(mealType);

          return (
            <Card key={mealType}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MealIcon className="h-5 w-5 text-primary" />
                    {label}
                    <Badge variant="secondary">{mealCalories} cal</Badge>
                  </CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/food/add?meal=${mealType}&date=${dateString}`}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Food
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {mealEntries.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MealIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No foods logged for {label.toLowerCase()}</p>
                    <Button variant="ghost" size="sm" className="mt-2" asChild>
                      <Link to={`/food/add?meal=${mealType}&date=${dateString}`}>Add your first food</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {mealEntries.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{entry.foodName}</div>
                          <div className="text-sm text-muted-foreground">
                            {entry.servings} serving{entry.servings !== 1 ? "s" : ""} • {entry.calories} cal
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            P: {entry.protein}g • C: {entry.carbs}g • F: {entry.fat}g
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link to="/food/add" className="block">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Quick Add
              </CardTitle>
              <CardDescription>Add food to your diary quickly</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link to="/food/my-foods" className="block">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="h-5 w-5 text-green-500" />
                My Foods
              </CardTitle>
              <CardDescription>Manage your custom food entries</CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>
    </div>
  );
};