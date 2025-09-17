import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:myfitnesspal/logic/main_page_nav/main_page_nav_state.dart';
import 'package:myfitnesspal/screen/home.dart';

class MainPageNavCubit extends Cubit<MainPageNavState> {
  MainPageNavCubit() : super(MainPageNavState(Home(), 0));

  void changePage(Widget page, int index) =>
      emit(MainPageNavState(page, index));
}
