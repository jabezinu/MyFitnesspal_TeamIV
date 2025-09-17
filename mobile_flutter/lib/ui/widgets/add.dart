import 'package:flutter/material.dart';

Widget addIconWidget() {
  return Column(
    children: [
      SizedBox(height: 10),
      Container(
        decoration: BoxDecoration(
          color: Colors.blue,
          borderRadius: BorderRadius.circular(30),
        ),
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Icon(Icons.add, color: Colors.white, size: 30),
        ),
      ),
      SizedBox(height: 5),
      Text(
        "Add",
        style: TextStyle(
          fontSize: 15,
          fontWeight: FontWeight.bold,
          color: Colors.grey,
        ),
      ),
    ],
  );
}
