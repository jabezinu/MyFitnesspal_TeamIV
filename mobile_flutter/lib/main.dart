import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:myfitnesspal/logic/diary_items/diary_items_bloc.dart';
import 'package:myfitnesspal/logic/main_page_nav/main_page_nav_cubit.dart';
import 'package:myfitnesspal/logic/water_logging/water_logging_cubit.dart';
import 'package:myfitnesspal/router/app_router.dart';
import 'package:myfitnesspal/ui/screen/home.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (context) => MainPageNavCubit()),
        BlocProvider(create: (context) => WaterLoggingCubit()),
        BlocProvider(create: (context) => DiaryItemsBloc()),
      ],
      child: MaterialApp(debugShowCheckedModeBanner: false, routes: appRoute),
    );
  }
}
