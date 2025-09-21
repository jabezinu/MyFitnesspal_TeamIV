class FoodModel {
  final int id;
  final String name;
  final String category;
  final double price;

  FoodModel({
    required this.id,
    required this.name,
    required this.category,
    required this.price,
  });

  factory FoodModel.fromJson(Map<String, dynamic> json) {
    return FoodModel(
      id: json['id'],
      name: json['name'],
      category: json['category'],
      price: (json['price'] as num).toDouble(),
    );
  }
}
