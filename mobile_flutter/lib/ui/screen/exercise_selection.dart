import 'package:flutter/material.dart';
import 'package:myfitnesspal/constatnts/app_colors.dart';
import 'package:myfitnesspal/ui/widgets/search_anchor.dart';

class ExerciseSelection extends StatelessWidget {
  final String exerciseType;

  const ExerciseSelection(this.exerciseType, {super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(exerciseType, style: TextStyle(color: appBackground(1))),
      ),
      body: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              TextButton(onPressed: () {}, child: Text("BROWSE ALL")),
              TextButton(onPressed: () {}, child: Text("MY EXERCISE")),
              TextButton(onPressed: () {}, child: Text("CREATE EXERCISE")),
            ],
          ),
        ],
      ),
    );
  }
}

Widget _biuldBrowseExercise() {
  final List<String> items = [
    // just a dummy data
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
  ];
  return Column(spacing: 25, children: [buildSearchAnchor(items)]);
}
