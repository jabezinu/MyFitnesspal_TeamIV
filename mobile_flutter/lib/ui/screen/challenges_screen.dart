import 'package:flutter/material.dart';

class ChallengesScreen extends StatelessWidget {
  final VoidCallback onBack;
  final VoidCallback onNext;
  final ValueChanged<List<String>>? onChallengesSelected;

  ChallengesScreen({
    required this.onBack,
    required this.onNext,
    this.onChallengesSelected,
  });

  final List<String> _selectedChallenges = [];

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
              "What challenges have made reaching your goal harder?",
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            const Text(
              "Select all that apply.",
              style: TextStyle(fontSize: 16, color: Colors.grey),
            ),
            const SizedBox(height: 40),
            _buildChallengeOption("Struggled with food cravings"),
            _buildChallengeOption("Found the plan too difficult to follow"),
            _buildChallengeOption("Limited time to stick to the routine"),
            _buildChallengeOption(
              "Challenges from social events and gatherings",
            ),
            const Spacer(),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton(
                    onPressed: onBack,
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
                    onPressed: () {
                      onChallengesSelected?.call(_selectedChallenges);
                      onNext();
                    },
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

  Widget _buildChallengeOption(String challenge) {
    return StatefulBuilder(
      builder: (context, setState) {
        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          child: CheckboxListTile(
            title: Text(challenge),
            value: _selectedChallenges.contains(challenge),
            onChanged: (value) {
              setState(() {
                if (value == true) {
                  _selectedChallenges.add(challenge);
                } else {
                  _selectedChallenges.remove(challenge);
                }
              });
            },
            controlAffinity: ListTileControlAffinity.leading,
          ),
        );
      },
    );
  }
}
