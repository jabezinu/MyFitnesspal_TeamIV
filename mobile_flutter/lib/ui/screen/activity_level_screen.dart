import 'package:flutter/material.dart';

class ActivityLevelScreen extends StatefulWidget {
  final ValueChanged<String> onActivitySelected;
  final VoidCallback onBack;
  final VoidCallback onNext;

  const ActivityLevelScreen({
    Key? key,
    required this.onActivitySelected,
    required this.onBack,
    required this.onNext,
  }) : super(key: key);

  @override
  State<ActivityLevelScreen> createState() => _ActivityLevelScreenState();
}

class _ActivityLevelScreenState extends State<ActivityLevelScreen> {
  String? _selectedActivity;

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
              "Select Your Activity Level",
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 40),
            _buildActivityOption("Sedentary"),
            _buildActivityOption("Lightly Active"),
            _buildActivityOption("Moderately Active"),
            _buildActivityOption("Very Active"),
            _buildActivityOption("Super Active"),
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
                    onPressed: _selectedActivity != null ? widget.onNext : null,
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

  Widget _buildActivityOption(String activity) {
    final isSelected = _selectedActivity == activity;

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      color: isSelected ? Colors.blue[50] : null,
      child: ListTile(
        title: Text(activity),
        onTap: () {
          setState(() {
            _selectedActivity = activity;
          });
          widget.onActivitySelected(activity);
        },
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 12,
        ),
        trailing: isSelected ? const Icon(Icons.check) : null,
      ),
    );
  }
}
