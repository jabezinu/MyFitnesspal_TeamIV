import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:myfitnesspal/logic/diary_items/diary_items_event.dart';
import 'package:myfitnesspal/logic/diary_items/diary_items_state.dart';

Map<String, Map<String, dynamic>> item = {
  'Breakfast': {
    "kcal": 197.0,
    "food": [
      {"name": "Shiro Wat", "kcal": 197.0},
    ],
  },
  'Lunch': {
    "kcal": 197.0,
    "food": [
      {"name": "Shiro Wat", "kcal": 197.0},
    ],
  },
  'Dinner': {
    "kcal": 197.0,
    "food": [
      {"name": "Shiro Wat", "kcal": 197.0},
    ],
  },
  'Snacks': {
    "kcal": 197.0,
    "food": [
      {"name": "Shiro Wat", "kcal": 197.0},
    ],
  },
  'Exercise': {
    "kcal": 197.0,
    "food": [
      {"name": "Running", "kcal": 197.0},
    ],
  },
};

class DiaryItemsBloc extends Bloc<DiaryItemsEvent, DiaryItemsState> {
  DiaryItemsBloc() : super(DiaryItemsState(item)) {
    on<ItemAddedToDiary>((event, emit) {
      emit(
        DiaryItemsState(
          state.diaryItem[event.itemType]!["food"].add({
            "name": event.itemName,
            "kcal": event.kcal,
          }),
        ),
      );
    });
  }
}
