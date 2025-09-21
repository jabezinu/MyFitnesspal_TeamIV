import 'package:flutter/material.dart';
import 'package:myfitnesspal/constatnts/app_colors.dart';

Widget buildSearchAnchor(List items) {
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
