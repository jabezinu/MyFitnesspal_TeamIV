import 'package:myfitnesspal/auth/landing_page.dart';
import 'package:myfitnesspal/screen/home.dart';
import 'package:myfitnesspal/screen/main_page.dart';
import 'package:myfitnesspal/screen/profile_page.dart';

final appRoute = {
  '/': (_) => LandingPage(),
  '/signup': (_) => Home(),
  '/login': (_) => Home(),
  '/main': (_) => MainPage(),
  '/home': (_) => Home(),
  '/profile': (_) => ProfilePage(),
};
