import 'package:flutter/material.dart';
import 'package:myfitnesspal/constatnts/app_colors.dart';

Widget buildListShowingRow() {
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
