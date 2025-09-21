import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:myfitnesspal/logic/diary_items/diary_items_event.dart';
import 'package:myfitnesspal/logic/diary_items/diary_items_state.dart';

Map<String, Map<String, dynamic>> item = {
  'Breakfast': {
    "kcal": 197.0,
    "food": [
      {"name": "Shiro Wat", "kcal": 197.0, "amount": 1.0},
    ],
  },
  'Lunch': {
    "kcal": 198.0,
    "food": [
      {"name": "Egg", "kcal": 198.0, "amount": 1.0},
    ],
  },
  'Dinner': {
    "kcal": 197.0,
    "food": [
      {"name": "Shiro Wat", "kcal": 197.0, "amount": 1.0},
    ],
  },
  'Snacks': {
    "kcal": 197.0,
    "food": [
      {"name": "Shiro Wat", "kcal": 197.0, "amount": 1.0},
    ],
  },
  'Exercise': {
    "kcal": 197.0,
    "food": [
      {"name": "Running", "kcal": 197.0, "amount": 1.0}, // amount = time
    ],
  },
};

class DiaryItemsBloc extends Bloc<DiaryItemsEvent, DiaryItemsState> {
  DiaryItemsBloc() : super(DiaryItemsState(item)) {
    on<ItemAddedToDiary>((event, emit) {
      final Map<String, Map<String, dynamic>> updatedDiary =
          Map<String, Map<String, dynamic>>.from(state.diaryItem);

      final itemTypeMap = Map<String, dynamic>.from(
        updatedDiary[event.itemType]!,
      );

      final foodList = List<Map<String, dynamic>>.from(itemTypeMap["food"]);
      foodList.add({"name": event.itemName, "kcal": event.kcal});

      final updatedKcal = (itemTypeMap["kcal"] as int) + event.kcal;

      itemTypeMap["food"] = foodList;
      itemTypeMap["kcal"] = updatedKcal;

      updatedDiary[event.itemType] = itemTypeMap;

      emit(DiaryItemsState(updatedDiary));
    });
  }
}
