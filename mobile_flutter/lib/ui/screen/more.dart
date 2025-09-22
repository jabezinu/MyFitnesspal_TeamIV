import 'package:flutter/material.dart';
import 'package:myfitnesspal/constatnts/app_colors.dart';
import 'package:myfitnesspal/ui/screen/goals.dart';

class More extends StatelessWidget {
  const More({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Column(
          children: [
            Stack(
              children: [
                Container(
                  height: 75,
                  width: 65,
                  decoration: const BoxDecoration(
                    color: Color.fromARGB(255, 243, 194, 33),
                    borderRadius: BorderRadius.only(
                      topRight: Radius.circular(10),
                      bottomRight: Radius.circular(500),
                      bottomLeft: Radius.circular(10),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 30, top: 20.0),
                  child: Row(
                    spacing: 30,
                    children: [
                      CircleAvatar(
                        radius: 30,
                        backgroundImage: NetworkImage(
                          'https://example.com/profile.jpg',
                        ),
                      ),
                      Text(
                        "Leta Dejene",
                        style: TextStyle(color: appBackground(1), fontSize: 35),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            SizedBox(height: 20),
            ListView(
              shrinkWrap: true,
              children: [
                ListTile(
                  leading: Icon(Icons.paste_rounded, color: appBackground(1)),
                  title: Text(
                    'My Weekly Report',
                    style: TextStyle(color: appBackground(1)),
                  ),
                  onTap: () {
                    // Navigate to settings screen
                  },
                ),
                ListTile(
                  leading: Icon(
                    Icons.food_bank_rounded,
                    color: appBackground(1),
                  ),
                  title: Text(
                    'Recipes, Meals & Foods',
                    style: TextStyle(color: appBackground(1)),
                  ),
                  onTap: () {
                    // Navigate to settings screen
                  },
                ),
                ListTile(
                  leading: Icon(
                    Icons.fitness_center_rounded,
                    color: appBackground(1),
                  ),
                  title: Text(
                    'Workout Routines',
                    style: TextStyle(color: appBackground(1)),
                  ),
                  onTap: () {
                    // Navigate to settings screen
                  },
                ),
                ListTile(
                  leading: Icon(
                    Icons.track_changes_rounded,
                    color: appBackground(1),
                  ),
                  title: Text(
                    'Goals',
                    style: TextStyle(color: appBackground(1)),
                  ),
                  onTap: () {
                    // Navigate to settings screen
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) => const GoalsPage(),
                      ),
                    );
                  },
                ),
                ListTile(
                  leading: Icon(Icons.settings, color: appBackground(1)),
                  title: Text(
                    'Settings',
                    style: TextStyle(color: appBackground(1)),
                  ),
                  onTap: () {
                    // Navigate to settings screen
                  },
                ),
                ListTile(
                  leading: Icon(Icons.info, color: appBackground(1)),
                  title: Text(
                    'About',
                    style: TextStyle(color: appBackground(1)),
                  ),
                  onTap: () {
                    // Navigate to about screen
                  },
                ),
                ListTile(
                  leading: Icon(Icons.help, color: appBackground(1)),
                  title: Text(
                    'Help',
                    style: TextStyle(color: appBackground(1)),
                  ),
                  onTap: () {
                    // Navigate to help screen
                  },
                ),
                ListTile(
                  leading: Icon(Icons.logout, color: Colors.red),
                  title: Text(
                    'Logout',
                    style: TextStyle(color: Colors.redAccent),
                  ),
                  onTap: () {
                    // Handle logout
                  },
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
