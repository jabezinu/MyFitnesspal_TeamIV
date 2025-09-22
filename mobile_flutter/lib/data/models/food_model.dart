class FoodModel {
  final int id;
  final String name;
  final int calories_per_cup;
  final int amount = 1;

  FoodModel({
    required this.id,
    required this.name,
    required this.calories_per_cup,
  });

  factory FoodModel.fromJson(Map<String, dynamic> json) {
    return FoodModel(
      id: json['id'],
      name: json['name'],
      calories_per_cup: json['calories_per_cup'],
    );
  }
}
