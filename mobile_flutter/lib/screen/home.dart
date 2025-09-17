import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
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
      // bottomNavigationBar: _buildNavigationBar(),
      appBar: AppBar(
        leading: IconButton(
          onPressed: () {
            Navigator.pushNamed(context, "/profile");
          },
          icon: Icon(CupertinoIcons.person),
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
              const Text(
                "Today",
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
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
        _buildCard(),
        _buildCaloriesCard(),
        _buildInfoCards(),
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
            const SizedBox(height: 20),
            Row(
              children: [
                CircularPercentIndicator(
                  lineWidth: 10,
                  radius: 50,
                  percent: 0.5,
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
