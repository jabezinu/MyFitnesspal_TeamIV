import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:myfitnesspal/constatnts/app_colors.dart';
import 'package:myfitnesspal/logic/diary_items/diary_items_bloc.dart';
import 'package:myfitnesspal/logic/diary_items/diary_items_state.dart';

class Diary extends StatelessWidget {
  const Diary({super.key});

  @override
  Widget build(BuildContext context) {
    Size screenSize = MediaQuery.sizeOf(context);
    return Scaffold(
      appBar: AppBar(title: Text("Diary"), backgroundColor: appWhite(1)),
      backgroundColor: appGrey(0.1),
      body: Column(
        spacing: 15,
        children: [
          Container(
            margin: EdgeInsets.only(top: 1),
            color: appWhite(1),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                IconButton(
                  onPressed: () {},
                  icon: Icon(
                    Icons.arrow_back_ios_new_rounded,
                    color: appBackground(1),
                  ),
                ),
                Text(
                  "Today",
                  style: TextStyle(color: appBackground(1), fontSize: 20),
                ),
                IconButton(
                  onPressed: () {},
                  icon: Icon(
                    Icons.arrow_forward_ios_rounded,
                    color: appBackground(1),
                  ),
                ),
              ],
            ),
          ),
          _BuildCaloryCal(),
          SizedBox(
            height: screenSize.height / 1.7,
            child: ListView(
              children: [
                for (var item in [
                  "Breakfast",
                  "Lunch",
                  "Dinner",
                  "Snacks",
                  "Exercise",
                ])
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 12.0),
                    child: _BuildTabelDisplay(item),
                  ),
                SizedBox(height: 30),
                ElevatedButton.icon(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: appBackground(0.81),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 5),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    elevation: 6,
                    shadowColor: appBackground(1),
                    textStyle: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  label: Text("Complete Daily"),
                  icon: Icon(Icons.fact_check_outlined, size: 30),
                ),
                SizedBox(height: 30),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

Widget _BuildCaloryCal() {
  // this should lesten to both DiaryBloc and CaloryCalCubit
  return AnimatedContainer(
    duration: Duration(milliseconds: 300),
    padding: EdgeInsets.all(10),
    margin: EdgeInsets.symmetric(horizontal: 8),
    decoration: BoxDecoration(
      color: appWhite(1),
      borderRadius: BorderRadius.circular(10),
    ),
    child: Column(
      spacing: 16,
      children: [
        Align(
          alignment: Alignment.centerLeft,
          child: Text(
            "Calories Remaining",
            style: TextStyle(color: appBackground(1), fontSize: 20),
          ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Column(
              children: [
                Text(
                  "2520",
                  style: TextStyle(color: appBackground(1), fontSize: 20),
                ),
                Text("Goal"),
              ],
            ),
            Text(
              "-",
              style: TextStyle(
                color: appBackground(1),
                fontSize: 25,
                fontWeight: FontWeight.bold,
              ),
            ),
            Column(
              children: [
                Text(
                  "2000",
                  style: TextStyle(color: appBackground(1), fontSize: 20),
                ),
                Text("Food"),
              ],
            ),
            Text(
              "+",
              style: TextStyle(
                color: appBackground(1),
                fontSize: 25,
                fontWeight: FontWeight.bold,
              ),
            ),
            Column(
              children: [
                Text(
                  "2000",
                  style: TextStyle(color: appBackground(1), fontSize: 20),
                ),
                Text("Exercise"),
              ],
            ),
            Text(
              "=",
              style: TextStyle(
                color: appBackground(1),
                fontSize: 25,
                fontWeight: FontWeight.bold,
              ),
            ),
            Column(
              children: [
                Text(
                  "2000",
                  style: TextStyle(color: appBackground(1), fontSize: 20),
                ),
                Text("Remaining"),
              ],
            ),
          ],
        ),
      ],
    ),
  );
}

Widget _BuildTabelDisplay(String itemType) {
  return BlocBuilder<DiaryItemsBloc, DiaryItemsState>(
    builder: (context, state) {
      return Column(
        children: [
          Container(
            padding: EdgeInsets.symmetric(vertical: 10, horizontal: 8),
            color: appWhite(1),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  itemType,
                  style: TextStyle(
                    color: appBackground(1),
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),

                Text(
                  state.diaryItem[itemType]!["kcal"].toString(),
                  style: TextStyle(
                    color: appBackground(1),
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),

          for (var foods in state.diaryItem[itemType]!["food"])
            _BuildFoodList(itemType, foods),

          InkWell(
            onTap: () {
              Navigator.pushNamed(
                context,
                '/food_selection',
                arguments: itemType,
              );
            },
            child: Container(
              padding: EdgeInsets.symmetric(vertical: 10, horizontal: 8),
              color: appWhite(1),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    itemType != "Exercise" ? "ADD FOOD" : "ADD Exercise",
                    style: TextStyle(color: Colors.blue, fontSize: 16),
                  ),
                  Icon(Icons.more_horiz_rounded),
                ],
              ),
            ),
          ),
        ],
      );
    },
  );
}

Widget _BuildFoodList(String itemType, Map food) {
  return Container(
    color: appWhite(1),
    margin: EdgeInsets.symmetric(vertical: 1),
    padding: EdgeInsets.symmetric(vertical: 10, horizontal: 15),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          spacing: 2,
          children: [
            Text(food["name"], style: TextStyle(fontSize: 18)),
            Text(
              food["amount"].toString() +
                  (itemType != "Exercise" ? " cup" : " min"),
              style: TextStyle(color: appGrey(1)),
            ),
          ],
        ),
        Text(food["kcal"].toString(), style: TextStyle(color: appGrey(1))),
      ],
    ),
  );
}
