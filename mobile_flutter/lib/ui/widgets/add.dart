import 'package:flutter/material.dart';

final List<Map<String, dynamic>> _addCardData = [
  {
    'lable': "Log Food",
    "icon": Icons.search_rounded,
    "target": Text("Unimplemented"),
  },
  {
    'lable': "Barcode Scan",
    "icon": Icons.barcode_reader,
    "target": Text("Unimplemented"),
  },
  {
    'lable': "Voice Log",
    "icon": Icons.mic_none_rounded,
    "target": Text("Unimplemented"),
  },
  {
    'lable': "Meal Scan",
    "icon": Icons.qr_code_scanner_rounded,
    "target": Text("Unimplemented"),
  },
];

final List<Map<String, dynamic>> _horizontalCardData = [
  {
    'lable': "Water",
    "icon": Icons.water_drop_rounded,
    "target": Text("Unimplemented"),
  },
  {
    'lable': "Weight",
    "icon": Icons.balance_rounded,
    "target": Text("Unimplemented"),
  },
  {
    'lable': "Exercise",
    "icon": Icons.fitness_center_rounded,
    "target": Text("Unimplemented"),
  },
];

Widget addIconWidget() {
  return Column(
    mainAxisAlignment: MainAxisAlignment.spaceAround,
    children: [
      Wrap(
        alignment: WrapAlignment.center,
        children: [
          for (var item in _addCardData)
            _buildCard(item["lable"], item["icon"], item["target"]),

          for (var item in _horizontalCardData)
            _horizontalCard(item["lable"], item["icon"], item["target"]),
        ],
      ),
    ],
  );
}

Widget _buildCard(String label, dynamic icon, dynamic target) {
  return SizedBox(
    width: 150,
    height: 130,
    child: InkWell(
      onTap: () {},
      child: Card(
        elevation: 3,
        margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [Icon(icon), Text(label)],
          ),
        ),
      ),
    ),
  );
}

Widget _horizontalCard(String label, dynamic icon, dynamic target) {
  return InkWell(
    onTap: () {},
    child: Card(
      elevation: 1,
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          spacing: 20,
          children: [Icon(icon), Text(label)],
        ),
      ),
    ),
  );
}
