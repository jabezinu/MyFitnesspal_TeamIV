import 'package:flutter/material.dart';
import 'package:myfitnesspal/constatnts/app_colors.dart';

class DailyCheckinPage extends StatefulWidget {
  const DailyCheckinPage({Key? key}) : super(key: key);

  @override
  State<DailyCheckinPage> createState() => _DailyCheckinPageState();
}

class _DailyCheckinPageState extends State<DailyCheckinPage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController weightController = TextEditingController();
  final TextEditingController bmrController = TextEditingController();
  final TextEditingController caloriesController = TextEditingController();
  final TextEditingController tdeeController = TextEditingController();

  @override
  void dispose() {
    weightController.dispose();
    bmrController.dispose();
    caloriesController.dispose();
    tdeeController.dispose();
    super.dispose();
  }

  void _saveData() {
    if (_formKey.currentState!.validate()) {
      // Save logic here
      final weight = weightController.text;
      final bmr = bmrController.text;
      final calories = caloriesController.text;
      final tdee = tdeeController.text;

      // Example: print to console
      print("Weight: $weight, BMR: $bmr, Calories: $calories, TDEE: $tdee");

      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Daily check-in saved!')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Daily Check-in"),
        // backgroundColor: appBackground(1),
        // foregroundColor: appWhite(1),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            spacing: 20,
            children: [
              Text(
                "Record your daily progress and metrics",
                style: TextStyle(color: appBackground(1)),
              ),
              _buildTextField("Weight (kg)", weightController),
              // _buildTextField("BMR (kcal)", bmrController),
              // _buildTextField("Calories (kcal)", caloriesController),
              // _buildTextField("TDEE (kcal)", tdeeController),
              const SizedBox(height: 20),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _saveData,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: appBackground(1),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    textStyle: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  child: const Text("Save Check-In"),
                ),
              ),
              SizedBox(height: 30),
              Row(
                spacing: 20,
                children: [
                  Icon(
                    Icons.history,
                    color: const Color.fromARGB(255, 105, 148, 240),
                    size: 30,
                  ),
                  Text(
                    "Check-in History",
                    style: TextStyle(color: appBackground(1), fontSize: 25),
                  ),
                ],
              ),
              Text("No Data entered yet!"),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTextField(String label, TextEditingController controller) {
    return TextFormField(
      controller: controller,
      keyboardType: TextInputType.number,
      decoration: InputDecoration(
        labelText: label,
        labelStyle: TextStyle(color: appBackground(1)),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: appBackground(1), width: 2),
        ),
      ),
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Please enter $label';
        }
        return null;
      },
    );
  }
}
