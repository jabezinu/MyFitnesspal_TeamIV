import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:myfitnesspal/logic/exercise_selection/exercise_selection_state.dart';

class ExerciseSelectionCubit extends Cubit<ExerciseSelectionState> {
  ExerciseSelectionCubit() : super(ExerciseSelectionState(0));

  void changPageIndex(int index) => emit(ExerciseSelectionState(index));
}
