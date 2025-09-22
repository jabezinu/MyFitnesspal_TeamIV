import 'package:flutter/material.dart';

class GoalsPage extends StatelessWidget {
  const GoalsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Goals'),
        elevation: 0.5,
        backgroundColor: Colors.white,
        foregroundColor: Colors.black87,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).maybePop(),
        ),
      ),
      body: const SafeArea(child: _GoalsContent()),
    );
  }
}

class _GoalsContent extends StatelessWidget {
  const _GoalsContent();

  @override
  Widget build(BuildContext context) {
    // small helper to create the trailing blue action text
    Text trailingText(String text) => Text(
      text,
      style: const TextStyle(
        color: Color(0xFF1E88E5), // blue like screenshot
        fontWeight: FontWeight.w500,
      ),
    );

    return ListView(
      children: [
        // Top simple rows
        _settingsRow(
          title: 'Starting Weight',
          trailing: trailingText('55 kg on 24 Aug 2025'),
          onTap: () {},
        ),
        const Divider(height: 1),
        _settingsRow(
          title: 'Current Weight',
          trailing: trailingText('55 kg'),
          onTap: () {},
        ),
        const Divider(height: 1),
        _settingsRow(
          title: 'Goal Weight',
          trailing: trailingText('70 kg'),
          onTap: () {},
        ),
        const Divider(height: 1),
        _settingsRow(
          title: 'Weekly Goal',
          trailing: trailingText('Gain 0.5 kg per week'),
          onTap: () {},
        ),
        const Divider(height: 1),
        _settingsRow(
          title: 'Activity Level',
          trailing: trailingText('Not Very Active'),
          onTap: () {},
        ),

        // Nutrition Goals section header
        const SizedBox(height: 18),
        Container(
          width: double.infinity,
          color: const Color(0xFFF0F0F0),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: const Text(
            'Nutrition Goals',
            style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
          ),
        ),

        // Nutrition items with subtitle and some premium icons
        _settingsRow(
          title: 'Calorie, Carbs, Protein and Fat Goals',
          subtitle: 'Customize your default or daily goals.',
          onTap: () {},
        ),
        const Divider(height: 1, indent: 16),
        _settingsRow(
          title: 'Calorie Goals by Meal',
          subtitle: 'Stay on track with a calorie goal for each meal.',
          trailing: _premiumIcon(),
          onTap: () {},
        ),
        const Divider(height: 1, indent: 16),
        _settingsRow(
          title: 'Show Carbs, Protein and Fat By Meal',
          subtitle: 'View carbs, protein and fat by gram or percent.',
          trailing: _premiumIcon(),
          onTap: () {},
        ),
        const Divider(height: 1, indent: 16),
        _settingsRow(title: 'Additional Nutrient Goals', onTap: () {}),

        // Fitness Goals section header
        const SizedBox(height: 18),
        Container(
          width: double.infinity,
          color: const Color(0xFFF0F0F0),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: const Text(
            'Fitness Goals',
            style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
          ),
        ),

        _settingsRow(
          title: 'Workouts / Week',
          trailing: trailingText('0'),
          onTap: () {},
        ),
        const Divider(height: 1, indent: 16),
        _settingsRow(
          title: 'Minutes / Workout',
          trailing: trailingText('0'),
          onTap: () {},
        ),
        const Divider(height: 1, indent: 16),
        _settingsRow(
          title: 'Exercise Calories',
          subtitle: 'Decide whether to adjust daily goals when you exercise',
          trailing: _premiumIcon(),
          onTap: () {},
        ),

        // extra spacing so last divider doesn't sit tight at bottom
        const SizedBox(height: 32),
      ],
    );
  }

  static Widget _premiumIcon() => Padding(
    padding: const EdgeInsets.only(right: 12.0),
    child: Icon(
      Icons.workspace_premium,
      color: Colors.amber.shade700,
      size: 18,
    ),
  );

  static Widget _settingsRow({
    required String title,
    String? subtitle,
    Widget? trailing,
    required VoidCallback onTap,
  }) {
    return ListTile(
      title: Text(title, style: const TextStyle(fontSize: 16)),
      subtitle:
          subtitle != null
              ? Text(
                subtitle,
                style: TextStyle(color: Colors.grey.shade600, fontSize: 13),
              )
              : null,
      trailing: trailing ?? const Icon(Icons.chevron_right, color: Colors.grey),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      onTap: onTap,
    );
  }
}
