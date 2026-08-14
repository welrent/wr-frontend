import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const WelrentApp());
}

class WelrentApp extends StatelessWidget {
  const WelrentApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welrent',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF1C263A)),
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}
