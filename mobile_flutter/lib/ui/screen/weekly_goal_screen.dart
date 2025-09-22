import 'package:flutter/material.dart';

class WeeklyGoalScreen extends StatefulWidget {
  final VoidCallback onBack;
  final VoidCallback onNext;
  final ValueChanged<String> onWeeklyGoalSelected;

  const WeeklyGoalScreen({
    Key? key,
    required this.onBack,
    required this.onNext,
    required this.onWeeklyGoalSelected,
  }) : super(key: key);

  @override
  State<WeeklyGoalScreen> createState() => _WeeklyGoalScreenState();
}

class _WeeklyGoalScreenState extends State<WeeklyGoalScreen> {
  String? _selectedGoal;

  Widget _buildGoalOption(String goal) {
    final selected = _selectedGoal == goal;
    return Card(
      color: selected ? Colors.blue[50] : null,
      child: InkWell(
        onTap: () {
          setState(() {
            _selectedGoal = goal;
          });
          widget.onWeeklyGoalSelected(goal);
        },
        child: Center(
          child: Text(
            goal,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: selected ? Colors.blue : Colors.black,
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 60),
            const Text(
              "What is your weekly weight loss goal?",
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 40),
            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                childAspectRatio: 2.0,
                children: [
                  _buildGoalOption("0.5 lbs/week"),
                  _buildGoalOption("1 lbs/week"),
                  _buildGoalOption("1.5 lbs/week"),
                  _buildGoalOption("2 lbs/week"),
                ],
              ),
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton(
                    onPressed: widget.onBack,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.grey[300],
                      foregroundColor: Colors.black,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                    child: const Text("BACK"),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: ElevatedButton(
                    onPressed: _selectedGoal != null ? widget.onNext : null,
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                    child: const Text("NEXT"),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}
