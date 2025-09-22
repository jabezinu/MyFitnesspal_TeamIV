import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:myfitnesspal/data/models/food_model.dart';

class FoodRepository {
  Future<List<FoodModel>> loadFoods() async {
    final String response = await rootBundle.loadString(
      'assets/data/search.pl.json',
    );
    final data = json.decode(response);

    final List<dynamic> foods = data["foods"];
    return foods.map((item) => FoodModel.fromJson(item)).toList();
  }
}
