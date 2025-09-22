import 'package:flutter/cupertino.dart';
import 'package:myfitnesspal/auth/landing_page.dart';
import 'package:myfitnesspal/ui/screen/daily_checkin_page.dart';
import 'package:myfitnesspal/ui/screen/exercise_selection.dart';
import 'package:myfitnesspal/ui/screen/food_selection.dart';
import 'package:myfitnesspal/ui/screen/goals.dart';
import 'package:myfitnesspal/ui/screen/home.dart';
import 'package:myfitnesspal/ui/screen/main_fitness_flow.dart';
import 'package:myfitnesspal/ui/screen/main_page.dart';
import 'package:myfitnesspal/ui/screen/profile_page.dart';
import 'package:myfitnesspal/ui/screen/water_log_page.dart';

final appRoute = {
  '/': (_) => LandingPage(),
  '/signup': (_) => Home(),
  '/login': (_) => Home(),
  '/main': (_) => MainPage(),
  '/home': (_) => Home(),
  '/profile': (_) => ProfilePage(),
  '/waterLog': (_) => WaterLogPage(),
  '/dailyCheckin': (_) => DailyCheckinPage(),
  '/fitness-flow': (_) => FitnessFlow(),
  '/food_selection': (context) {
    final args = ModalRoute.of(context)!.settings.arguments as String;
    return FoodSelection(foodType: args);
  },
  '/exercise_selection': (context) {
    final args = ModalRoute.of(context)!.settings.arguments as String;
    return ExerciseSelection(exerciseType: args);
  },
  '/goal': (_) => GoalsPage(),
};
