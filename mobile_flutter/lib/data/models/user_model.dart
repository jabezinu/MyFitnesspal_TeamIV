class UserModel {
  final int id;
  final String name;
  final String category;
  final double price;

  UserModel({
    required this.id,
    required this.name,
    required this.category,
    required this.price,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      name: json['name'],
      category: json['category'],
      price: (json['price'] as num).toDouble(),
    );
  }
}
