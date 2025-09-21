import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:myfitnesspal/constatnts/app_colors.dart';
import 'package:percent_indicator/percent_indicator.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomePage();
}

class _HomePage extends State<Home> {
  int currentPageIndex = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leadingWidth: 80,
        leading: InkWell(
          borderRadius: BorderRadius.circular(30),
          onTap: () => Navigator.pushNamed(context, "/profile"),
          child: CircleAvatar(
            radius: 30,
            backgroundImage: NetworkImage('https://example.com/profile.jpg'),
          ),
        ),
        title: Text(
          "myfitnesspal",
          style: TextStyle(color: Colors.blue, fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            onPressed: () {},
            icon: Icon(Icons.notifications_active_outlined),
          ),
        ],
      ),
      body: _buildHeader(),
    );
  }

  Widget _buildHeader() {
    return ListView(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 28.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                "Today",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 25,
                  color: appBackground(1),
                ),
              ),
              ElevatedButton(
                onPressed: () {},
                style: ButtonStyle(
                  backgroundColor: WidgetStateColor.transparent,
                ),
                child: const Text("Edit"),
              ),
            ],
          ),
        ),
        _buildCaloriesCard(),
        _buildCard(),
        _buildInfoCards(),
        SizedBox(height: 80),
      ],
    );
  }
}

Widget _buildCard() {
  final Map<String, dynamic> data = {
    'macronutrient': {
      'Carbohydrate': {
        'goal': '66/311g',
        'left': '32g left',
        'percent': 0.5,
        'color': Colors.red,
      },
      'Fat': {
        'goal': '66/311g',
        'left': '32g left',
        'percent': 0.6,
        'color': Colors.yellow,
      },
      'Protien': {
        'goal': '66/311g',
        'left': '32g left',
        'percent': 0.1,
        'color': Colors.purple,
      },
    },
    'calories': {
      'goal': {'num': 1500},
      'objectif de base': {'num': 2150},
      'aliment': {'num': 890},
      'exercise': {'num': 337},
    },
  };

  return SizedBox(
    height: 260,
    child: PageView.builder(
      itemCount: 5,
      itemBuilder: (context, index) {
        return Card(
          elevation: 3,
          margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                Align(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "Macronutrient",
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                  ),
                ),
                const SizedBox(height: 20),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children:
                      data['macronutrient'].entries.map<Widget>((entry) {
                        final name = entry.key;
                        final goal = entry.value['goal'];
                        final percent = entry.value['percent'];
                        final left = entry.value['left'];
                        final color = entry.value['color'];
                        return Column(
                          children: [
                            Text(name),
                            const SizedBox(height: 8),
                            CircularPercentIndicator(
                              radius: 45.0,
                              lineWidth: 10.0,
                              percent: percent,
                              center: Text(goal),
                              progressColor: color,
                              animateToInitialPercent: true,
                              animation: true,
                              restartAnimation: true,
                              animationDuration: 600,
                            ),
                            const SizedBox(height: 8),
                            Text(left),
                          ],
                        );
                      }).toList(),
                ),
              ],
            ),
          ),
        );
      },
    ),
  );
}

Widget _buildCaloriesCard() {
  final List<Map<String, dynamic>> someData = [
    {"label": "Base Goal", "icon": Icons.flag_circle_rounded},
    {"label": "Food", "icon": Icons.food_bank_outlined},
    {"label": "Exercise", "icon": Icons.fitness_center_rounded},
  ];
  return SizedBox(
    height: 260,
    child: Card(
      elevation: 3,
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Align(
              alignment: Alignment.topLeft,
              child: Text(
                "Calories",
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              ),
            ),
            Align(
              alignment: Alignment.topLeft,
              child: Text(
                "Remaining = Goal - Food + Exercise",
                style: TextStyle(color: appGrey(0.61)),
              ),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                CircularPercentIndicator(
                  lineWidth: 10,
                  radius: 70,
                  percent: 0.1,
                  progressColor: Colors.blue,
                  animateToInitialPercent: true,
                  animation: true,
                  restartAnimation: true,
                  animationDuration: 600,
                  center: Padding(
                    padding: const EdgeInsets.only(top: 50.0),
                    child: Column(
                      children: [
                        Text(
                          "2419",
                          style: TextStyle(
                            color: appBackground(1),
                            fontSize: 25,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          "Remaining",
                          style: TextStyle(color: appGrey(0.6)),
                        ),
                      ],
                    ),
                  ),
                ),
                Column(
                  spacing: 5,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    for (var item in someData)
                      Row(
                        spacing: 15,
                        children: [
                          Icon(
                            item["icon"],
                            size: 20,
                            color: const Color.fromARGB(255, 243, 33, 86),
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                item["label"],
                                style: TextStyle(color: appGrey(0.6)),
                              ),
                              Text(
                                "2520",
                                textAlign: TextAlign.left,
                                style: TextStyle(
                                  color: appBackground(1),
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    ),
  );
}

Widget _buildInfoCards() {
  return Column(
    children: [
      Row(
        children: [
          _buildSingleCard(
            title: "Stops",
            value: "8,342",
            subtitle: "Courts 10,000 ways",
          ),

          _buildSingleCard(
            title: "Engine",
            value: "400 cal",
            subtitle: "1:01 hr",
          ),
        ],
      ),
      SizedBox(height: 10),
      Row(
        children: [
          _buildSingleCard(
            title: "Engine",
            value: "47",
            subtitle: "Courts 7kg",
          ),
          _buildSingleCard(
            title: "Cholesterol",
            value: "180",
            subtitle: "Courts 300 mg",
          ),
        ],
      ),
    ],
  );
}

Widget _buildSingleCard({
  required String title,
  required String value,
  required String subtitle,
}) {
  return SizedBox(
    width: 170,
    height: 170,
    child: Card(
      elevation: 4,
      margin: EdgeInsets.symmetric(horizontal: 16),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.grey[600],
              ),
            ),
            SizedBox(height: 8),
            Text(
              value,
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            Text(subtitle, style: TextStyle(fontSize: 14, color: Colors.grey)),
          ],
        ),
      ),
    ),
  );
}
