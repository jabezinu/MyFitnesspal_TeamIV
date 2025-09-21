import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:myfitnesspal/data/repository/food_repository.dart';
import 'package:myfitnesspal/logic/food_logic/food_event.dart';
import 'package:myfitnesspal/logic/food_logic/food_state.dart';

class FoodBloc extends Bloc<FoodEvent, FoodState> {
  final FoodRepository repository;

  FoodBloc(this.repository) : super(FoodInitial()) {
    on<LoadFoodEvent>((event, emit) async {
      emit(FoodLoading());
      try {
        final foods = await repository.loadFoods();
        emit(FoodLoaded(foods));
      } catch (e) {
        emit(FoodError(e.toString()));
      }
    });
  }
}
