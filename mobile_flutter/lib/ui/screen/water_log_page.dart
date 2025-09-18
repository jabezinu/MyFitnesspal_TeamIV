import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:myfitnesspal/constatnts/app_colors.dart';
import 'package:myfitnesspal/logic/water_logging/water_logging_cubit.dart';
import 'package:myfitnesspal/logic/water_logging/water_logging_state.dart';
import 'package:myfitnesspal/ui/widgets/congrats_dialog.dart';

class WaterLogPage extends StatelessWidget {
  const WaterLogPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Water Log"),
        // backgroundColor: appBackground(1),
        // foregroundColor: appWhite(1),
        centerTitle: true,
        actions: [IconButton(onPressed: () {}, icon: Icon(Icons.settings))],
      ),
      body: Center(
        child: Column(
          spacing: 30,
          children: [
            SizedBox(height: 20),
            TweenAnimationBuilder<int>(
              tween: IntTween(begin: 0, end: 2500),
              duration: const Duration(seconds: 2),
              builder: (context, value, child) {
                return Text(
                  "Daily Goal: $value ml",
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: appBackground(1), // change to your theme color
                  ),
                );
              },
            ),
            BlocConsumer<WaterLoggingCubit, WaterLoggingState>(
              builder:
                  (context, state) => Column(
                    children: [
                      Stack(
                        alignment: Alignment.center,
                        children: [
                          Positioned(
                            bottom: 0,
                            child: AnimatedContainer(
                              margin: EdgeInsets.only(bottom: 10, right: 4),
                              height: state.loggedAmount, // value 0 - 180
                              width: 62,
                              duration: Duration(milliseconds: 370),
                              decoration: BoxDecoration(
                                color: Colors.blue,
                                borderRadius: BorderRadius.circular(15),
                              ),
                              child: Icon(
                                Icons.water_drop_rounded,
                                size: 35,
                                color: Colors.white,
                              ),
                            ),
                          ),
                          Image.asset(
                            "assets/images/bottle_outline.png",
                            height: 240,
                          ),
                        ],
                      ),
                      SizedBox(height: 20),
                      Text(
                        "${(state.loggedAmount * 13.889).ceil()} ml / 2500 ml",
                        style: TextStyle(fontSize: 20),
                      ),
                    ],
                  ),
              listener: (context, state) {
                if (state.loggedAmount == 180) {
                  showCongratsDialog(
                    context,
                    title: "Great Job!",
                    message: "You reached your water goal 💧",
                    subMessage: "8 glasses consumed",
                    icon: Icons.water_drop_rounded,
                    iconColor: const Color.fromARGB(255, 85, 187, 247),
                  ).then((_) {
                    // This runs when the dialog is closed (any way)
                    BlocProvider.of<WaterLoggingCubit>(context).logWaterReset();
                  });
                }
              },
            ),

            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              spacing: 40,
              children: [
                ElevatedButton(
                  onPressed: () {
                    // Add water intake logic here
                    BlocProvider.of<WaterLoggingCubit>(context).logWater(20);
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: appBackground(0.81),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 24,
                      vertical: 14,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    elevation: 6,
                    shadowColor: const Color.fromARGB(
                      255,
                      114,
                      252,
                      229,
                    ).withOpacity(0.4),
                    textStyle: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  child: const Text("Add 250 ml"),
                ),
                ElevatedButton(
                  onPressed: () {
                    BlocProvider.of<WaterLoggingCubit>(context).logWater(50);
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: appBackground(1),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 24,
                      vertical: 14,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    elevation: 6,
                    shadowColor: const Color.fromARGB(
                      255,
                      114,
                      252,
                      229,
                    ).withOpacity(0.4),
                    textStyle: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  child: const Text("Add 500 ml"),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
