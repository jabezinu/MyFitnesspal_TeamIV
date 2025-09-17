import 'package:flutter/material.dart';
import 'package:myfitnesspal/constatnts/app_colors.dart';

class LandingPage extends StatelessWidget {
  const LandingPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: appBackground(1),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            Spacer(),
            Text("Logo", style: TextStyle(color: appWhite(1))),
            Spacer(),
            Column(
              children: [
                Text(
                  "Welcome",
                  style: TextStyle(color: appWhite(1), fontSize: 40),
                ),
                SizedBox(height: 20),
                Text("Log it, live it.", style: TextStyle(color: appWhite(1))),
              ],
            ),
            Spacer(),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/main');
              },
              child: Text("Get Started", style: TextStyle(color: appBlack(1))),
            ),
            Spacer(),
          ],
        ),
      ),
    );
  }
}
