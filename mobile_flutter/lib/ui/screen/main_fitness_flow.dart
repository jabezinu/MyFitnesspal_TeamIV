import 'package:flutter/material.dart';
import 'name_screen.dart';
import 'goal_screen.dart';
import 'educational_screen.dart';
import 'challenges_screen.dart';
import 'encouragement_screen.dart';
import 'activity_level_screen.dart';
import 'profile_screen.dart';
import 'weekly_goal_screen.dart';
import 'summary_screen.dart';

class FitnessFlow extends StatefulWidget {
  @override
  _FitnessFlowState createState() => _FitnessFlowState();
}

class _FitnessFlowState extends State<FitnessFlow> {
  int _currentScreenIndex = 0;
  Map<String, dynamic> _userData = {};

  void _nextScreen() {
    setState(() {
      if (_currentScreenIndex < 8) {
        _currentScreenIndex++;
      } else {
        Navigator.pushNamed(context, '/main');
      }
    });
  }

  void _previousScreen() {
    setState(() {
      if (_currentScreenIndex > 0) {
        _currentScreenIndex--;
      } else {
        Navigator.pop(context);
      }
    });
  }

  void _updateUserData(String key, dynamic value) {
    setState(() {
      _userData[key] = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(body: _buildCurrentScreen());
  }

  Widget _buildCurrentScreen() {
    switch (_currentScreenIndex) {
      case 0:
        return NameScreen(
          onBack: _previousScreen,
          onNext: _nextScreen,
          onDataUpdate: _updateUserData,
        );
      case 1:
        return GoalScreen(
          firstName: _userData['firstName'] ?? '',
          onGoalSelected: (goal) => _updateUserData('goal', goal),
          onBack: _previousScreen,
          onNext: _nextScreen,
        );
      case 2:
        return EducationalScreen(
          goal: _userData['goal'] ?? '',
          onBack: _previousScreen,
          onNext: _nextScreen,
        );
      case 3:
        return ChallengesScreen(
          onBack: _previousScreen,
          onNext: _nextScreen,
          onChallengesSelected:
              (challenges) => _updateUserData('challenges', challenges),
        );
      case 4:
        return EncouragementScreen(
          onBack: _previousScreen,
          onNext: _nextScreen,
        );
      case 5:
        return ActivityLevelScreen(
          onActivitySelected:
              (activity) => _updateUserData('activityLevel', activity),
          onBack: _previousScreen,
          onNext: _nextScreen,
        );
      case 6:
        return ProfileScreen(
          activityLevel: _userData['activityLevel'] ?? '',
          onBack: _previousScreen,
          onNext: _nextScreen,
          onProfileDataUpdate: _updateUserData,
        );
      case 7:
        return WeeklyGoalScreen(
          onBack: _previousScreen,
          onNext: _nextScreen,
          onWeeklyGoalSelected: (goal) => _updateUserData('weeklyGoal', goal),
        );
      case 8:
        return SummaryScreen(
          onBack: _previousScreen,
          onNext: _nextScreen,
          userData: _userData,
        );
      default:
        return Container();
    }
  }
}
