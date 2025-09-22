import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:myfitnesspal/logic/diary_items/diary_items_event.dart';
import 'package:myfitnesspal/logic/diary_items/diary_items_state.dart';

Map<String, Map<String, dynamic>> item = {
  'Breakfast': {"kcal": 0.0, "food": [
    ],
  },
  'Lunch': {"kcal": 0.0, "food": [
    ],
  },
  'Dinner': {"kcal": 0.0, "food": [
    ],
  },
  'Snacks': {"kcal": 0.0, "food": [
    ],
  },
  'Exercise': {
    "kcal": 0.0,
    "food": [
      // {"name": "Running", "kcal": 197.0, "amount": 1.0}, // amount = time
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
      foodList.add({
        "name": event.itemName,
        "kcal": event.kcal,
        "amount": event.amount,
      });

      final updatedKcal = itemTypeMap["kcal"] + event.kcal;

      itemTypeMap["food"] = foodList;
      itemTypeMap["kcal"] = updatedKcal;

      updatedDiary[event.itemType] = itemTypeMap;

      emit(DiaryItemsState(updatedDiary));
      // Bloc
    });
  }
}
