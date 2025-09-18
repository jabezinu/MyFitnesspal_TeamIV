import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class WaterLogPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Water Log"), centerTitle: true),
      body: Column(
        children: [Image.asset("assets/images/bottle_outline_blue.png")],
      ),
    );
  }
}
