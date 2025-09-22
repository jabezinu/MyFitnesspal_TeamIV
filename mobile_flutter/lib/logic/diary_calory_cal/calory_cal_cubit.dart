import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:myfitnesspal/logic/diary_calory_cal/calory_cal_state.dart';

class CaloryCalCubit extends Cubit<CaloryCalState> {
  CaloryCalCubit() : super(CaloryCalState(exerciseCal: 0.0, foodCal: 0.0));

  void updateCalories({
    required double breakfast,
    required double lunch,
    required double dinner,
    required double snacks,
    required double exercise,
  }) {
    final foodCal = breakfast + lunch + dinner + snacks;
    final exerciseCal = exercise;
    final netCal = state.goal - foodCal + exerciseCal;
    emit(
      CaloryCalState(
        exerciseCal: exerciseCal,
        foodCal: foodCal,
        netCal: netCal,
      ),
    );
  }
}
