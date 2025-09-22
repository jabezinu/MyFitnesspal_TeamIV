class CaloryCalState {
  final double foodCal;
  final double exerciseCal;

  final double goal = 2520.0;
  final double netCal;
  const CaloryCalState({
    required this.exerciseCal,
    required this.foodCal,
    this.netCal = 0.0,
  });
}
