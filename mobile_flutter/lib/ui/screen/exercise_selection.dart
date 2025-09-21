import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:myfitnesspal/constatnts/app_colors.dart';
import 'package:myfitnesspal/logic/exercise_selection/exercise_selection_cubit.dart';
import 'package:myfitnesspal/logic/exercise_selection/exercise_selection_state.dart';
import 'package:myfitnesspal/ui/widgets/list_show_item.dart';
import 'package:myfitnesspal/ui/widgets/search_anchor.dart';

class ExerciseSelection extends StatelessWidget {
  final String exerciseType;
  final List _topButtons = ["BROWSE ALL", "MY EXERCISE", "CREATE EXERCISE"];
  ExerciseSelection({required this.exerciseType, super.key});
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => ExerciseSelectionCubit(),
      child: Scaffold(
        appBar: AppBar(
          title: Text(exerciseType, style: TextStyle(color: appBackground(1))),
        ),
        body: BlocBuilder<ExerciseSelectionCubit, ExerciseSelectionState>(
          builder: (context, state) {
            return SingleChildScrollView(
              child: Column(
                spacing: 20,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      for (var item in _topButtons)
                        TextButton(
                          onPressed: () {
                            BlocProvider.of<ExerciseSelectionCubit>(
                              context,
                            ).changPageIndex(_topButtons.indexOf(item));
                          },
                          child: DecoratedBox(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(8),
                              border:
                                  state.pageIndex == _topButtons.indexOf(item)
                                      ? Border(
                                        bottom: BorderSide(
                                          width: 5,
                                          color: appBackground(1),
                                        ),
                                      )
                                      : Border(),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Text(item),
                            ),
                          ),
                        ),
                    ],
                  ),

                  [
                    _biuldBrowseExercise(context),
                    _biuldMyExercise(),
                    _biuldCreateExercise(),
                  ][state.pageIndex],
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}

Widget _biuldBrowseExercise(BuildContext context) {
  Size screenSize = MediaQuery.sizeOf(context);
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
  return Column(
    spacing: 25,
    children: [
      buildSearchAnchor(items),
      SizedBox(
        // color: Colors.amber,
        height: screenSize.height / 1.4,
        child: ListView(children: [buildListShowingRow()]),
      ),
    ],
  );
}

Widget _biuldMyExercise() {
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

Widget _biuldCreateExercise() {
  return Column(spacing: 25, children: []);
}
