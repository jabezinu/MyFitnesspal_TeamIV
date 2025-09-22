import 'package:flutter/material.dart';

class SummaryScreen extends StatelessWidget {
  final Map<String, dynamic>? userData;
  final VoidCallback onBack;
  final VoidCallback onNext;

  SummaryScreen({required this.onBack, required this.onNext, this.userData});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 40),
              const Text(
                "Your Personalized Calorie Report",
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 30),
              _buildInfoRow(
                "Name:",
                "${userData?['firstName'] ?? ''} ${userData?['lastName'] ?? ''}",
              ),
              _buildInfoRow("Gender:", userData?['gender'] ?? ''),
              _buildInfoRow("Country:", userData?['country'] ?? ''),
              _buildInfoRow("Date of Birth:", userData?['dob'] ?? ''),
              _buildInfoRow(
                "Height:",
                "${userData?['heightFeet'] ?? ''}'${userData?['heightInches'] ?? ''}\"",
              ),
              _buildInfoRow(
                "Weight:",
                "${userData?['currentWeight'] ?? ''} lbs",
              ),
              _buildInfoRow(
                "Goal Weight:",
                "${userData?['goalWeight'] ?? ''} lbs",
              ),
              _buildInfoRow(
                "Activity Level:",
                userData?['activityLevel'] ?? '',
              ),
              _buildInfoRow("Goal:", userData?['goal'] ?? ''),
              _buildInfoRow("Weekly Goal:", userData?['weeklyGoal'] ?? ''),
              const SizedBox(height: 30),
              const Text(
                "BMR (Basal Metabolic Rate)",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              const Text(
                "1541 kcal/day",
                style: TextStyle(fontSize: 16, color: Colors.blue),
              ),
              const SizedBox(height: 20),
              const Text(
                "Calories Based on Your Goal",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              const Text(
                "1618 kcal/day",
                style: TextStyle(fontSize: 16, color: Colors.green),
              ),
              const SizedBox(height: 40),
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
                        // Save user data and navigate to main app
                        onNext();
                      },
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                      ),
                      child: const Text("FINISH"),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 120,
            child: Text(
              label,
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
          ),
          const SizedBox(width: 10),
          Expanded(child: Text(value.isNotEmpty ? value : 'Not provided')),
        ],
      ),
    );
  }
}
