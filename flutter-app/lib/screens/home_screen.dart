import 'package:flutter/material.dart';
import '../api_service.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<dynamic> cars = [];

  @override
  void initState() {
    super.initState();
    loadCars();
  }

  Future<void> loadCars() async {
    final fetchedCars = await ApiService.fetchCars();
    setState(() {
      cars = fetchedCars;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Welrent Vehicles'),
        actions: [
          IconButton(
            icon: const Icon(Icons.login),
            onPressed: () async {
              // Test API login
              final data = await ApiService.login('test@test.com', 'password');
              if (data != null && context.mounted) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Logged in! Token: ${data['token']}')),
                );
              }
            },
          )
        ],
      ),
      body: cars.isEmpty
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: cars.length,
              itemBuilder: (context, index) {
                final car = cars[index];
                return Card(
                  margin: const EdgeInsets.all(12),
                  child: ListTile(
                    title: Text(car['name']),
                    subtitle: Text('\$${car['price'] ?? 150} / day'),
                    trailing: const Icon(Icons.arrow_forward_ios),
                  ),
                );
              },
            ),
    );
  }
}
