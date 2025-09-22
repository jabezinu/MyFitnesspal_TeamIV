import 'package:flutter/material.dart';

class ProfileScreen extends StatefulWidget {
  final String activityLevel;
  final VoidCallback onBack;
  final VoidCallback onNext;
  final Function(String, dynamic)? onProfileDataUpdate;

  const ProfileScreen({
    Key? key,
    required this.activityLevel,
    required this.onBack,
    required this.onNext,
    this.onProfileDataUpdate,
  }) : super(key: key);

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final TextEditingController dobController = TextEditingController();
  final TextEditingController currentWeightController = TextEditingController();
  final TextEditingController goalWeightController = TextEditingController();

  String? _selectedGender;
  String? _selectedCountry;
  String? _heightFeet;
  String? _heightInches;

  @override
  void dispose() {
    dobController.dispose();
    currentWeightController.dispose();
    goalWeightController.dispose();
    super.dispose();
  }

  Future<void> _pickDob() async {
    final now = DateTime.now();
    final initial = DateTime(now.year - 25, now.month, now.day);
    final picked = await showDatePicker(
      context: context,
      initialDate: initial,
      firstDate: DateTime(1900),
      lastDate: now,
    );

    if (picked != null) {
      final formatted =
          '${picked.month.toString().padLeft(2, '0')}/${picked.day.toString().padLeft(2, '0')}/${picked.year}';
      dobController.text = formatted;
      widget.onProfileDataUpdate?.call('dob', formatted);
      setState(() {});
    }
  }

  Widget _genderCard(String gender) {
    final selected = _selectedGender == gender;
    return Expanded(
      child: GestureDetector(
        onTap: () {
          setState(() {
            _selectedGender = gender;
          });
          widget.onProfileDataUpdate?.call('gender', gender);
        },
        child: Card(
          color: selected ? Colors.blue[50] : null,
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 14),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(gender, style: const TextStyle(fontSize: 16)),
                if (selected) ...[
                  const SizedBox(width: 8),
                  const Icon(Icons.check, size: 20),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: widget.onBack,
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 4),
              const Text(
                'Selected activity level',
                style: TextStyle(fontSize: 14, color: Colors.black54),
              ),
              const SizedBox(height: 6),
              Text(
                widget.activityLevel,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 24),

              // Section title (replaces markdown headings)
              const Text(
                'Tell us more about yourself',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 20),

              // Gender
              const Text('Select your gender', style: TextStyle(fontSize: 14)),
              const SizedBox(height: 8),
              Row(
                children: [
                  _genderCard('Male'),
                  const SizedBox(width: 12),
                  _genderCard('Female'),
                ],
              ),
              const SizedBox(height: 20),

              // Country
              const Text('Country', style: TextStyle(fontSize: 14)),
              const SizedBox(height: 8),
              DropdownButtonFormField<String>(
                value: _selectedCountry,
                hint: const Text('Choose your country'),
                items:
                    ['Ethiopia', 'United States', 'Other']
                        .map(
                          (country) => DropdownMenuItem(
                            value: country,
                            child: Text(country),
                          ),
                        )
                        .toList(),
                onChanged: (value) {
                  setState(() {
                    _selectedCountry = value;
                  });
                  widget.onProfileDataUpdate?.call('country', value);
                },
                decoration: const InputDecoration(border: OutlineInputBorder()),
              ),
              const SizedBox(height: 20),

              // DOB with date picker
              const Text('Date of Birth', style: TextStyle(fontSize: 14)),
              const SizedBox(height: 8),
              TextFormField(
                controller: dobController,
                readOnly: true,
                onTap: _pickDob,
                decoration: const InputDecoration(
                  hintText: 'mm/dd/yyyy',
                  border: OutlineInputBorder(),
                  suffixIcon: Icon(Icons.calendar_today),
                ),
              ),
              const SizedBox(height: 20),

              // Height
              const Text('Height', style: TextStyle(fontSize: 14)),
              const SizedBox(height: 8),
              Row(
                children: [
                  Expanded(
                    child: DropdownButtonFormField<String>(
                      value: _heightFeet,
                      hint: const Text('Feet'),
                      items:
                          List.generate(8, (i) => i + 1)
                              .map(
                                (feet) => DropdownMenuItem(
                                  value: feet.toString(),
                                  child: Text('$feet ft'),
                                ),
                              )
                              .toList(),
                      onChanged: (value) {
                        setState(() {
                          _heightFeet = value;
                        });
                        widget.onProfileDataUpdate?.call('heightFeet', value);
                      },
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: DropdownButtonFormField<String>(
                      value: _heightInches,
                      hint: const Text('Inches'),
                      items:
                          List.generate(12, (i) => i)
                              .map(
                                (inches) => DropdownMenuItem(
                                  value: inches.toString(),
                                  child: Text('$inches in'),
                                ),
                              )
                              .toList(),
                      onChanged: (value) {
                        setState(() {
                          _heightInches = value;
                        });
                        widget.onProfileDataUpdate?.call('heightInches', value);
                      },
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Current weight
              const Text(
                'Current Weight (lbs)',
                style: TextStyle(fontSize: 14),
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: currentWeightController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  hintText: 'Current weight',
                  border: OutlineInputBorder(),
                ),
                onChanged:
                    (value) => widget.onProfileDataUpdate?.call(
                      'currentWeight',
                      value,
                    ),
              ),
              const SizedBox(height: 20),

              // Goal weight
              const Text('Goal Weight (lbs)', style: TextStyle(fontSize: 14)),
              const SizedBox(height: 8),
              TextFormField(
                controller: goalWeightController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  hintText: 'Goal weight',
                  border: OutlineInputBorder(),
                ),
                onChanged:
                    (value) =>
                        widget.onProfileDataUpdate?.call('goalWeight', value),
              ),

              const SizedBox(height: 32),

              // Back + Next
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: widget.onBack,
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 14),
                      ),
                      child: const Text('BACK'),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () {
                        // push latest values to callback before navigating forward
                        widget.onProfileDataUpdate?.call(
                          'gender',
                          _selectedGender,
                        );
                        widget.onProfileDataUpdate?.call(
                          'country',
                          _selectedCountry,
                        );
                        widget.onProfileDataUpdate?.call(
                          'dob',
                          dobController.text,
                        );
                        widget.onProfileDataUpdate?.call(
                          'heightFeet',
                          _heightFeet,
                        );
                        widget.onProfileDataUpdate?.call(
                          'heightInches',
                          _heightInches,
                        );
                        widget.onProfileDataUpdate?.call(
                          'currentWeight',
                          currentWeightController.text,
                        );
                        widget.onProfileDataUpdate?.call(
                          'goalWeight',
                          goalWeightController.text,
                        );

                        widget.onNext();
                      },
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 14),
                      ),
                      child: const Text('NEXT'),
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
}
