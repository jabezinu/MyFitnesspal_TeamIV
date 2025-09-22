import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:myfitnesspal/constatnts/app_colors.dart';
import 'package:myfitnesspal/logic/diary_calory_cal/calory_cal_cubit.dart';
import 'package:myfitnesspal/logic/diary_items/diary_items_bloc.dart';
import 'package:myfitnesspal/logic/diary_items/diary_items_event.dart';

Widget buildListShowingRow(
  BuildContext context,
  String diaryItemType,
  String name,
  String calories,
  String serving,
) {
  final breakfast =
      context.read<DiaryItemsBloc>().state.diaryItem['Breakfast']!['kcal']
          as double;
  final lunch =
      context.read<DiaryItemsBloc>().state.diaryItem['Lunch']!['kcal']
          as double;
  final dinner =
      context.read<DiaryItemsBloc>().state.diaryItem['Dinner']!['kcal']
          as double;
  final snacks =
      context.read<DiaryItemsBloc>().state.diaryItem['Snacks']!['kcal']
          as double;
  final exercise =
      context.read<DiaryItemsBloc>().state.diaryItem['Exercise']!['kcal']
          as double;
  return Padding(
    padding: const EdgeInsets.symmetric(horizontal: 10.0),
    child: ListTile(
      onTap: () {
        BlocProvider.of<DiaryItemsBloc>(context).add(
          ItemAddedToDiary(
            itemType: diaryItemType,
            itemName: name,
            kcal: double.parse(calories.split(" ")[0]),
          ),
        );
        BlocProvider.of<CaloryCalCubit>(context).updateCalories(
          breakfast: breakfast,
          lunch: lunch,
          dinner: dinner,
          snacks: snacks,
          exercise: exercise,
        );
        Navigator.pop(context);
      },
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadiusGeometry.circular(10),
      ),

      title: Text(
        name,
        style: TextStyle(
          color: appBackground(1),
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ),
      ),
      tileColor: appBackground(0.1),
      subtitle: Row(spacing: 15, children: [Text(calories), Text(serving)]),
      contentPadding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      trailing: Icon(Icons.add_box_rounded, color: appBackground(1), size: 30),
    ),
  );
}
