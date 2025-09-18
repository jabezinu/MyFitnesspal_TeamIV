import 'package:flutter/material.dart';
import 'package:myfitnesspal/constatnts/app_colors.dart';

final List<Map<String, dynamic>> _addCardData = [
  {'lable': "Log Food", "icon": Icons.search_rounded, "target": "waterLog"},
  {
    'lable': "Check In",
    "icon": Icons.check_circle_rounded,
    "target": "/dailyCheckin",
  },
  {
    'lable': "Log Water",
    "icon": Icons.water_drop_rounded,
    "target": "/waterLog",
  },
  {
    'lable': "Meal Scan",
    "icon": Icons.qr_code_scanner_rounded,
    "target": "waterLog",
  },
];

final List<Map<String, dynamic>> _horizontalCardData = [
  {'lable': "Voice Log", "icon": Icons.mic_none_rounded, "target": "waterLog"},
  {'lable': "Weight", "icon": Icons.balance_rounded, "target": "waterLog"},
  {
    'lable': "Exercise",
    "icon": Icons.fitness_center_rounded,
    "target": "waterLog",
  },
];

Widget addIconWidget(BuildContext context) {
  return Column(
    mainAxisAlignment: MainAxisAlignment.spaceAround,
    children: [
      Wrap(
        alignment: WrapAlignment.center,
        children: [
          for (var item in _addCardData)
            _buildCard(context, item["lable"], item["icon"], item["target"]),

          for (var item in _horizontalCardData)
            _horizontalCard(
              context,
              item["lable"],
              item["icon"],
              item["target"],
            ),
        ],
      ),
    ],
  );
}

Widget _buildCard(
  BuildContext context,
  String label,
  dynamic icon,
  String target,
) {
  return SizedBox(
    width: 150,
    height: 130,
    child: InkWell(
      onTap: () {
        Navigator.pop(context);
        Navigator.pushNamed(context, target);
      },
      child: Card(
        elevation: 3,
        margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [Icon(icon, color: appBackground(1)), Text(label)],
          ),
        ),
      ),
    ),
  );
}

Widget _horizontalCard(
  BuildContext context,
  String label,
  dynamic icon,
  String target,
) {
  return InkWell(
    onTap: () {
      Navigator.pop(context);
      Navigator.pushNamed(context, target);
    },
    child: Card(
      elevation: 1,
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          spacing: 20,
          children: [Icon(icon, color: appBackground(1)), Text(label)],
        ),
      ),
    ),
  );
}
