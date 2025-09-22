import 'package:equatable/equatable.dart';

abstract class DiaryItemsEvent extends Equatable {
  const DiaryItemsEvent();
}

class ItemAddedToDiary extends DiaryItemsEvent {
  final String itemType; // Breakfast, Lunch, Dinner, Snacks, Exercise
  final String itemName; // Name of the food or exercise item
  final double kcal;
  final double amount;

  const ItemAddedToDiary({
    required this.itemType,
    required this.itemName,
    required this.kcal,
    this.amount = 1.0,
  });

  @override
  List<Object> get props => [itemType, itemName, kcal];
}

class ItemRemovedFromDiary extends DiaryItemsEvent {
  final String itemType; // Breakfast, Lunch, Dinner, Snacks, Exercise
  final String itemName; // Name of the food or exercise item

  const ItemRemovedFromDiary(this.itemType, this.itemName);

  @override
  List<Object> get props => [itemType, itemName];
}
