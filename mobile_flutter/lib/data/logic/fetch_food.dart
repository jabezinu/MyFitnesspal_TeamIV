import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:myfitnesspal/data/models/food_model.dart';

class FoodService {
  Future<List<FoodModel>> loadFood() async {
    // Load JSON as String
    final String response = await rootBundle.loadString(
      'assets/data/search.pl.json',
    );
    // Decode JSON
    final data = json.decode(response);

    // Convert to list of Food
    return data["foods"].map((item) => FoodModel.fromJson(item)).toList();
  }

  Future<List> getFoodKeywords() async {
    final String response = await rootBundle.loadString(
      'assets/data/search.pl.json',
    );
    final data = json.decode(response); // This is a Map

    // Extract only the list under "keywords"
    final List<dynamic> keywords = data["keywords"];

    return keywords;
  }
}
