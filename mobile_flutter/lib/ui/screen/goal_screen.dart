import 'package:flutter/material.dart';

class GoalScreen extends StatefulWidget {
  final String firstName;
  final ValueChanged<String> onGoalSelected;
  final VoidCallback onBack;
  final VoidCallback onNext;

  const GoalScreen({
    super.key,
    required this.firstName,
    required this.onGoalSelected,
    required this.onBack,
    required this.onNext,
  });

  @override
  State<GoalScreen> createState() => _GoalScreenState();
}

class _GoalScreenState extends State<GoalScreen> {
  String? _selectedGoal;

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
              "What's your main goal?",
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            Text(
              "Hi ${widget.firstName}, choose your goal.",
              style: const TextStyle(fontSize: 16, color: Colors.grey),
            ),
            const SizedBox(height: 40),
            _buildGoalOption("Lose Weight"),
            _buildGoalOption("Maintain Weight"),
            _buildGoalOption("Gain Weight"),
            const Spacer(),
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

  Widget _buildGoalOption(String goal) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: ListTile(
        title: Text(goal),
        onTap: () {
          setState(() {
            _selectedGoal = goal;
          });
          widget.onGoalSelected(goal);
        },
        tileColor: _selectedGoal == goal ? Colors.blue[50] : null,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 12,
        ),
      ),
    );
  }
}
