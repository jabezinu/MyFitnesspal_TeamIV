import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:myfitnesspal/logic/water_logging/water_logging_state.dart';

class WaterLoggingCubit extends Cubit<WaterLoggingState> {
  WaterLoggingCubit() : super(WaterLoggingState(0.0));

  // do the fetching from user profile and set limit and increase amount

  void logWater(
    double amount,
  ) => // dont just add the amout do the maths to increase how much
      (state.loggedAmount + amount <= 180)
          ? emit(WaterLoggingState(state.loggedAmount + amount))
          : emit(WaterLoggingState(180.0));

  void logWaterReset() => emit(WaterLoggingState(0.0));
}
