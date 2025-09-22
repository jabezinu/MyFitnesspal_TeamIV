import 'package:flutter/material.dart';
import 'package:myfitnesspal/constatnts/app_colors.dart';

class Plan extends StatelessWidget {
  const Plan({super.key});

  final List<double> sampleWeights = const [55, 55, 55, 55, 55, 55, 55];
  final List<String> sampleDates = const [
    '24/06',
    '8/07',
    '22/07',
    '5/08',
    '19/08',
    '2/09',
    '16/09',
  ];

  @override
  Widget build(BuildContext context) {
    return _ProgressScreen(
      weights: sampleWeights,
      xLabels: sampleDates,
      title: 'Progress',
    );
  }
}

class _ProgressScreen extends StatelessWidget {
  final List<double> weights;
  final List<String> xLabels;
  final String title;

  const _ProgressScreen({
    required this.weights,
    required this.xLabels,
    required this.title,
  });

  @override
  Widget build(BuildContext context) {
    const double minY = 53;
    const double maxY = 57;

    return Scaffold(
      appBar: AppBar(
        title: Text(title),
        elevation: 0.5,
        backgroundColor: appWhite(10),
        foregroundColor: appBlack(15),
        actions: [
          IconButton(
            icon: const Icon(Icons.insert_drive_file_outlined),
            onPressed: () {},
          ),
          IconButton(icon: const Icon(Icons.add), onPressed: () {}),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                color: appWhite(10),
                child: Row(
                  children: [
                    Expanded(
                      flex: 1,
                      child: InkWell(
                        onTap: () {},
                        child: SizedBox(
                          height: 56,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: const [
                              Icon(Icons.show_chart_outlined, size: 22),
                            ],
                          ),
                        ),
                      ),
                    ),
                    Container(height: 56, width: 1, color: appGrey(10)),
                    Expanded(
                      flex: 3,
                      child: InkWell(
                        onTap: () {},
                        child: SizedBox(
                          height: 56,
                          child: Center(
                            child: Text(
                              'Weight',
                              style: TextStyle(
                                color: Colors.blue.shade700,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Container(height: 56, width: 1, color: appGrey(10)),
                    Expanded(
                      flex: 3,
                      child: InkWell(
                        onTap: () {},
                        child: SizedBox(
                          height: 56,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.calendar_today_outlined,
                                size: 18,
                                color: Colors.grey.shade800,
                              ),
                              const SizedBox(width: 6),
                              const Text(
                                '3 Months',
                                style: TextStyle(
                                  color: Colors.black87,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              // chart area
              Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12.0,
                  vertical: 18,
                ),
                child: AspectRatio(
                  aspectRatio: 1.9,
                  child: Card(
                    elevation: 0,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Column(
                        children: [
                          Expanded(
                            child: CustomPaint(
                              painter: _LineChartPainter(
                                weights: weights,
                                minY: minY,
                                maxY: maxY,
                                xLabels: xLabels,
                              ),
                              child: Container(),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),

              Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 16.0,
                  vertical: 6,
                ),
                child: Row(
                  children: [
                    const Text(
                      'Entries',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const Spacer(),
                    IconButton(
                      onPressed: () {},
                      icon: const Icon(Icons.share_outlined),
                    ),
                  ],
                ),
              ),

              const Divider(height: 1),

              // Entry tile (sample)
              ListTile(
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: 16.0,
                  vertical: 8,
                ),
                title: const Text('Sunday, 24 Aug 2025'),
                subtitle: const Text('55 kg'),
                trailing: Container(
                  width: 36,
                  height: 36,
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.grey.shade300),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: const Icon(
                    Icons.photo_size_select_actual_outlined,
                    size: 20,
                  ),
                ),
                onTap: () {},
              ),

              const SizedBox(height: 280),
            ],
          ),
        ),
      ),

      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: const Icon(Icons.add),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }
}

class _LineChartPainter extends CustomPainter {
  final List<double> weights;
  final double minY;
  final double maxY;
  final List<String> xLabels;

  _LineChartPainter({
    required this.weights,
    required this.minY,
    required this.maxY,
    required this.xLabels,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paintGrid =
        Paint()
          ..color = Colors.grey.shade300
          ..strokeWidth = 1;

    final paintAxis =
        Paint()
          ..color = appBlack(10)
          ..strokeWidth = 1;

    final paintLine =
        Paint()
          ..color = Colors.green.shade600
          ..strokeWidth = 3
          ..style = PaintingStyle.stroke
          ..strokeCap = StrokeCap.round;

    final double leftPadding = 32; // space for y labels
    final double bottomPadding = 24;
    final double topPadding = 8;
    final double rightPadding = 12;

    final plotWidth = size.width - leftPadding - rightPadding;
    final plotHeight = size.height - topPadding - bottomPadding;

    const int horizontalLines = 5;
    final double stepYValue = (maxY - minY) / (horizontalLines - 1);

    final textPainter = TextPainter(textDirection: TextDirection.ltr);

    for (int i = 0; i < horizontalLines; i++) {
      final yValue = maxY - i * stepYValue;
      final double y = topPadding + (i / (horizontalLines - 1)) * plotHeight;
      canvas.drawLine(
        Offset(leftPadding, y),
        Offset(leftPadding + plotWidth, y),
        paintGrid,
      );
      textPainter.text = TextSpan(
        text: yValue.toStringAsFixed(0),
        style: TextStyle(color: Colors.grey.shade600, fontSize: 12),
      );
      textPainter.layout();
      textPainter.paint(
        canvas,
        Offset(leftPadding - 8 - textPainter.width, y - textPainter.height / 2),
      );
    }

    if (xLabels.isNotEmpty) {
      final int count = xLabels.length;
      for (int i = 0; i < count; i++) {
        final double x = leftPadding + (i / (count - 1)) * plotWidth;
        textPainter.text = TextSpan(
          text: xLabels[i],
          style: TextStyle(color: Colors.grey.shade700, fontSize: 11),
        );
        textPainter.layout();
        textPainter.paint(
          canvas,
          Offset(x - textPainter.width / 2, topPadding + plotHeight + 6),
        );
      }
    }

    if (weights.length >= 2) {
      final path = Path();
      for (int i = 0; i < weights.length; i++) {
        final double x = leftPadding + (i / (weights.length - 1)) * plotWidth;
        final double normalized = (weights[i] - minY) / (maxY - minY); // 0..1
        final double y = topPadding + (1 - normalized) * plotHeight;
        if (i == 0)
          path.moveTo(x, y);
        else
          path.lineTo(x, y);
      }
      canvas.drawPath(path, paintLine);
    }
  }

  @override
  bool shouldRepaint(covariant _LineChartPainter oldDelegate) {
    return oldDelegate.weights != weights ||
        oldDelegate.minY != minY ||
        oldDelegate.maxY != maxY ||
        oldDelegate.xLabels != xLabels;
  }
}
