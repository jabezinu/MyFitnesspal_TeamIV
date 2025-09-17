import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:myfitnesspal/constatnts/app_colors.dart';
import 'package:myfitnesspal/logic/main_page_nav/main_page_nav_cubit.dart';
import 'package:myfitnesspal/logic/main_page_nav/main_page_nav_state.dart';
import 'package:myfitnesspal/ui/widgets/add.dart';
import 'package:myfitnesspal/ui/screen/diary.dart';
import 'package:myfitnesspal/ui/screen/home.dart';
import 'package:myfitnesspal/ui/screen/more.dart';
import 'package:myfitnesspal/ui/screen/paln.dart';

class MainPage extends StatelessWidget {
  MainPage({super.key});

  final List<Map<String, dynamic>> userPages = [
    {'name': "Dashboard", "icon": Icons.dashboard_rounded, "target": Home()},
    {'name': "Diary", "icon": Icons.book_outlined, "target": Diary()},
    {'name': "", "icon": Icons.add, "target": addIconWidget()},
    {'name': "Progress", "icon": Icons.bar_chart, "target": Plan()},
    {'name': "More", "icon": Icons.more_horiz, "target": More()},
  ];

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<MainPageNavCubit, MainPageNavState>(
      builder: (context, state) {
        return Scaffold(
          body: state.currentPage,

          bottomSheet: DecoratedBox(
            decoration: BoxDecoration(
              border: BoxBorder.all(color: appGrey(0.1)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                for (var item in userPages)
                  InkWell(
                    onTap: () {
                      // identify role and change userPages.indexOf(item)

                      if (userPages.indexOf(item) != 2) {
                        BlocProvider.of<MainPageNavCubit>(
                          context,
                        ).changePage(item['target'], userPages.indexOf(item));
                      } else {
                        showModalBottomSheet(
                          context: context,
                          builder:
                              (context) => Row(
                                children: [Expanded(child: addIconWidget())],
                              ),
                          elevation: 5,
                        );
                      }
                    },
                    child: SizedBox(
                      height: 70,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          (userPages.indexOf(item) == 2)
                              ? Container(
                                decoration: BoxDecoration(
                                  color: Colors.blue,
                                  borderRadius: BorderRadius.circular(30),
                                ),
                                child: Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Icon(
                                    Icons.add,
                                    color: Colors.white,
                                    size: 30,
                                  ),
                                ),
                              )
                              : Icon(
                                item['icon'],
                                size: 30,
                                color:
                                    BlocProvider.of<MainPageNavCubit>(
                                              context,
                                            ).state.currentIndex ==
                                            userPages.indexOf(item)
                                        ? appBlack(1)
                                        : appGrey(0.51),
                              ),
                          Text(
                            "${item['name']}",
                            style: TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.bold,
                              color:
                                  BlocProvider.of<MainPageNavCubit>(
                                            context,
                                          ).state.currentIndex ==
                                          userPages.indexOf(item)
                                      ? appBlack(1)
                                      : appGrey(0.51),
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
