import 'package:flutter/material.dart';
import 'package:myfitnesspal/constatnts/app_colors.dart';

class LandingPage extends StatelessWidget {
  const LandingPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: appBackground(1),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            Spacer(),
            Image.asset("assets/logo/calloglogo.png", color: appBackground(1)),
            Spacer(),
            Column(
              children: [
                Text(
                  "Welcome",
                  style: TextStyle(color: appBlack(1), fontSize: 45),
                ),
                SizedBox(height: 20),
                Text(
                  "Log it, live it.",
                  style: TextStyle(color: appBlack(1), fontSize: 20),
                ),
              ],
            ),
            Spacer(),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/main');
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: appBackground(0.71),
                padding: EdgeInsets.symmetric(horizontal: 50, vertical: 15),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
              ),
              child: Text("Get Started", style: TextStyle(color: appWhite(1))),
            ),
            Spacer(),
          ],
        ),
      ),
    );
  }
}
