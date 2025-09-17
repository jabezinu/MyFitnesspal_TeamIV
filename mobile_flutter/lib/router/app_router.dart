import 'package:myfitnesspal/auth/landing_page.dart';
import 'package:myfitnesspal/ui/screen/home.dart';
import 'package:myfitnesspal/ui/screen/main_page.dart';
import 'package:myfitnesspal/ui/screen/profile_page.dart';

final appRoute = {
  '/': (_) => LandingPage(),
  '/signup': (_) => Home(),
  '/login': (_) => Home(),
  '/main': (_) => MainPage(),
  '/home': (_) => Home(),
  '/profile': (_) => ProfilePage(),
};
