import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:myfitnesspal/constatnts/app_colors.dart';
import 'package:myfitnesspal/data/logic/fetch_food.dart';
import 'package:myfitnesspal/data/repository/food_repository.dart';
import 'package:myfitnesspal/logic/food_logic/food_bloc.dart';
import 'package:myfitnesspal/logic/food_logic/food_event.dart';
import 'package:myfitnesspal/logic/food_logic/food_state.dart';
import 'package:myfitnesspal/ui/widgets/list_show_item.dart';
import 'package:myfitnesspal/ui/widgets/search_anchor.dart';

class FoodSelection extends StatefulWidget {
  final String foodType;

  const FoodSelection({required this.foodType, super.key});

  @override
  State<StatefulWidget> createState() => _FoodSelectionState(foodType);
}

class _FoodSelectionState extends State<FoodSelection> {
  String foodType;

  _FoodSelectionState(this.foodType);

  final List _topButtons = ["All", "My Foods", "Create Food"];
  int _pageIndex = 0;

  FoodService foodService = FoodService();

  @override
  Widget build(BuildContext context) {
    Size screenSize = MediaQuery.sizeOf(context);
    return BlocProvider(
      create: (context) => FoodBloc(FoodRepository())..add(LoadFoodEvent()),
      child: Scaffold(
        appBar: AppBar(
          centerTitle: true,
          backgroundColor: Colors.white,
          elevation: 4,
          title: Container(
            padding: const EdgeInsets.symmetric(horizontal: 40),
            decoration: BoxDecoration(
              color: appBackground(0.15),
              borderRadius: BorderRadius.circular(10),
              boxShadow: [
                BoxShadow(
                  color: const Color.fromARGB(
                    255,
                    76,
                    168,
                    175,
                  ).withOpacity(0.2),
                  blurRadius: 6,
                  offset: const Offset(0, 3),
                ),
              ],
            ),
            child: DropdownButton<String>(
              value: foodType,
              icon: Icon(Icons.arrow_drop_down_circle, color: appBackground(1)),
              underline: const SizedBox(),
              style: const TextStyle(
                color: Colors.black87,
                fontSize: 16,
                fontWeight: FontWeight.w500,
              ),
              onChanged: (String? newValue) {
                setState(() {
                  foodType = newValue!;
                });
              },
              items:
                  <String>[
                    "Breakfast",
                    "Lunch",
                    "Dinner",
                    "Snacks",
                  ].map<DropdownMenuItem<String>>((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(value),
                    );
                  }).toList(),
            ),
          ),
        ),

        body: SingleChildScrollView(
          child: Column(
            spacing: 20,
            children: [
              SizedBox(height: 1),
              FutureBuilder(
                future: foodService.getFoodKeywords(),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return CircularProgressIndicator(
                      color: appBackground(1),
                      backgroundColor: const Color.fromARGB(113, 4, 126, 139),
                    );
                  } else if (snapshot.hasData) {
                    return buildSearchAnchor(snapshot.data!);
                  } else {
                    return buildSearchAnchor(["Content Not loaded"]);
                  }
                },
              ),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  for (var item in _topButtons)
                    TextButton(
                      onPressed: () {
                        setState(() {
                          _pageIndex = _topButtons.indexOf(item);
                        });
                      },
                      child: DecoratedBox(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                          border:
                              _pageIndex == _topButtons.indexOf(item)
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
                _biuldAllFoodShow(context, foodType),
                _biuldMyFoodShow(context),
                _biuldCreateFood(context),
              ][_pageIndex],
            ],
          ),
        ),
      ),
    );
  }
}

Widget _biuldAllFoodShow(BuildContext context, String foodType) {
  Size screenSize = MediaQuery.sizeOf(context);
  return SizedBox(
    // color: Colors.red,
    height: screenSize.height / 1.5,
    child: BlocBuilder<FoodBloc, FoodState>(
      builder: (context, state) {
        if (state is FoodLoading) {
          return Center(
            child: CircularProgressIndicator(
              color: appBackground(1),
              backgroundColor: const Color.fromARGB(113, 4, 126, 139),
            ),
          );
        } else if (state is FoodLoaded) {
          return ListView.builder(
            itemCount: state.foods.length,
            itemBuilder: (context, index) {
              final food = state.foods[index];
              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 8.0),
                child: buildListShowingRow(
                  context,
                  foodType,
                  food.name,
                  food.calories_per_cup.toString() + " cal",
                  "1.0 cup",
                ),
              );
            },
          );
        } else if (state is FoodError) {
          return Center(child: Text('Error: ${state.message}'));
        } else {
          return Center(child: Text('Please wait...'));
        }
      },
    ),
  );
}

Widget _biuldMyFoodShow(BuildContext context) {
  Size screenSize = MediaQuery.sizeOf(context);
  return SizedBox(
    // color: Colors.red,
    height: screenSize.height / 1.5,
    child: ListView(children: []),
  );
}

Widget _biuldCreateFood(BuildContext context) {
  Size screenSize = MediaQuery.sizeOf(context);
  return Center(child: Text("Create Food"));
}
