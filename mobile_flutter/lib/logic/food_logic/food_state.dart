import 'package:myfitnesspal/data/models/food_model.dart';

abstract class FoodState {}

class FoodInitial extends FoodState {}

class FoodLoading extends FoodState {}

class FoodLoaded extends FoodState {
  final List<FoodModel> foods;
  FoodLoaded(this.foods);
}

class FoodError extends FoodState {
  final String message;
  FoodError(this.message);
}
