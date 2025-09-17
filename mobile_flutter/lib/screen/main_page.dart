import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:myfitnesspal/constatnts/app_colors.dart';
import 'package:myfitnesspal/logic/main_page_nav/main_page_nav_cubit.dart';
import 'package:myfitnesspal/logic/main_page_nav/main_page_nav_state.dart';
import 'package:myfitnesspal/screen/add.dart';
import 'package:myfitnesspal/screen/diary.dart';
import 'package:myfitnesspal/screen/home.dart';
import 'package:myfitnesspal/screen/more.dart';
import 'package:myfitnesspal/screen/paln.dart';

class MainPage extends StatelessWidget {
  MainPage({super.key});

  final List<Map<String, dynamic>> userPages = [
    {'name': "Dashboard", "icon": Icons.dashboard, "target": Home()},
    {'name': "Diary", "icon": Icons.book_outlined, "target": Diary()},
    {'name': "", "icon": Icons.add, "target": Add()},
    {
      'name': "Progress",
      "icon": Icons.format_list_numbered_sharp,
      "target": Plan(),
    },
    {'name': "More", "icon": Icons.more_horiz, "target": More()},
  ];

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<MainPageNavCubit, MainPageNavState>(
      builder: (context, state) {
        return SafeArea(
          child: Scaffold(
            body: state.currentPage,
            bottomSheet: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                for (var item in userPages)
                  InkWell(
                    onTap: () {
                      // identify role and change userPages.indexOf(item)
                      BlocProvider.of<MainPageNavCubit>(
                        context,
                      ).changePage(item['target'], userPages.indexOf(item));
                    },
                    child: SizedBox(
                      height: 50,
                      child: Column(
                        // mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          DecoratedBox(
                            decoration:
                                userPages.indexOf(item) == 2
                                    ? BoxDecoration(
                                      color: Colors.blue,
                                      borderRadius: BorderRadius.circular(10),
                                    )
                                    : BoxDecoration(),
                            child: Icon(
                              item['icon'],
                              color:
                                  BlocProvider.of<MainPageNavCubit>(
                                            context,
                                          ).state.currentIndex ==
                                          userPages.indexOf(item)
                                      ? appBlack(1)
                                      : appGrey(1),
                            ),
                          ),
                          Text(
                            "${item['name']}",
                            style: TextStyle(
                              color:
                                  BlocProvider.of<MainPageNavCubit>(
                                            context,
                                          ).state.currentIndex ==
                                          userPages.indexOf(item)
                                      ? appBlack(1)
                                      : appGrey(1),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
              ],
            ),
          ),
        );
      },
    );
  }
}
