import 'package:flutter/material.dart';
import 'package:myfitnesspal/constatnts/app_colors.dart';

class FoodSelection extends StatefulWidget {
  final String foodType;

  const FoodSelection({required this.foodType, super.key});

  @override
  State<StatefulWidget> createState() => _FoodSelectionState(foodType);
}

class _FoodSelectionState extends State<FoodSelection> {
  String foodType;

  _FoodSelectionState(this.foodType);

  @override
  Widget build(BuildContext context) {
    Size screenSize = MediaQuery.sizeOf(context);
    return Scaffold(
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
                color: const Color.fromARGB(255, 76, 168, 175).withOpacity(0.2),
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

      body: Column(
        spacing: 20,
        children: [
          SizedBox(height: 1),
          _buildSearchAnchor(),

          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              TextButton(onPressed: () {}, child: Text("All")),
              TextButton(onPressed: () {}, child: Text("My Foods")),
              TextButton(onPressed: () {}, child: Text("Create Food")),
            ],
          ),
          SizedBox(
            // color: Colors.red,
            height: screenSize.height / 1.5,
            child: ListView(children: [_buildFoodShowing()]),
          ),
        ],
      ),
    );
  }
}

Widget _buildSearchAnchor() {
  final List<String> items = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
  ];
  return Padding(
    padding: const EdgeInsets.symmetric(horizontal: 8.0),
    child: SearchAnchor.bar(
      barHintText: "Search foods...",
      suggestionsBuilder: (context, controller) {
        final query = controller.text;
        final filtered =
            items
                .where(
                  (item) => item.toLowerCase().contains(query.toLowerCase()),
                )
                .toList();

        return filtered.map((item) {
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeInOut,
              decoration: BoxDecoration(
                color: appWhite(0.31),
                borderRadius: BorderRadius.circular(12),
                boxShadow: [
                  BoxShadow(
                    color: appBackground(1).withOpacity(0.32),
                    blurRadius: 6,
                    offset: const Offset(0, 3),
                  ),
                ],
              ),
              child: ListTile(
                leading: Icon(
                  Icons.food_bank,
                  color: const Color.fromARGB(255, 2, 92, 247),
                ),
                title: Text(
                  item,
                  style: const TextStyle(
                    fontWeight: FontWeight.w500,
                    color: Color.fromARGB(255, 7, 32, 48),
                  ),
                ),
                onTap: () {
                  controller.text = item;
                  FocusScope.of(context).unfocus();
                },
              ),
            ),
          );
        }).toList();
      },
    ),
  );
}

Widget _buildFoodShowing() {
  return Padding(
    padding: const EdgeInsets.symmetric(horizontal: 10.0),
    child: ListTile(
      onTap: () {},
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadiusGeometry.circular(10),
      ),

      title: Text(
        "Shiro Wat",
        style: TextStyle(
          color: appBackground(1),
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ),
      ),
      tileColor: appBackground(0.1),
      subtitle: Row(spacing: 15, children: [Text("72 cal"), Text("1.0 cup")]),
      contentPadding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      trailing: Icon(Icons.add_box_rounded, color: appBackground(1), size: 30),
    ),
  );
}
