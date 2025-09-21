class ReportModel {
  final int id;
  final String name;
  final String category;
  final double price;

  ReportModel({
    required this.id,
    required this.name,
    required this.category,
    required this.price,
  });

  factory ReportModel.fromJson(Map<String, dynamic> json) {
    return ReportModel(
      id: json['id'],
      name: json['name'],
      category: json['category'],
      price: (json['price'] as num).toDouble(),
    );
  }
}
