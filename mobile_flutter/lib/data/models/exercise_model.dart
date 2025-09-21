class ExerciseModel {
  final int id;
  final String name;
  final String category;
  final double price;

  ExerciseModel({
    required this.id,
    required this.name,
    required this.category,
    required this.price,
  });

  factory ExerciseModel.fromJson(Map<String, dynamic> json) {
    return ExerciseModel(
      id: json['id'],
      name: json['name'],
      category: json['category'],
      price: (json['price'] as num).toDouble(),
    );
  }
}
