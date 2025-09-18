import 'package:flutter/material.dart';

Future<void> showCongratsDialog(
  BuildContext context, {
  required String title, // e.g. "Great Job!"
  required String message, // e.g. "You reached your daily water goal"
  String? subMessage, // optional: e.g. "8 glasses consumed"
  IconData icon = Icons.star, // default icon
  Color iconColor = Colors.blueAccent,
  VoidCallback? onShare,
  VoidCallback? onClose,
}) {
  return showGeneralDialog(
    context: context,
    barrierLabel: "congrats",
    barrierDismissible: true,
    barrierColor: Colors.black54,
    transitionDuration: const Duration(milliseconds: 350),
    pageBuilder: (_, __, ___) {
      return _UniversalCongratsDialog(
        title: title,
        message: message,
        subMessage: subMessage,
        icon: icon,
        iconColor: iconColor,
        onShare: onShare,
        onClose: onClose,
      );
    },
    transitionBuilder: (_, anim, __, child) {
      final curved = Curves.easeOutBack.transform(anim.value);
      return Transform.scale(
        scale: curved,
        child: Opacity(opacity: anim.value, child: child),
      );
    },
  );
}

class _UniversalCongratsDialog extends StatefulWidget {
  final String title;
  final String message;
  final String? subMessage;
  final IconData icon;
  final Color iconColor;
  final VoidCallback? onShare;
  final VoidCallback? onClose;

  const _UniversalCongratsDialog({
    Key? key,
    required this.title,
    required this.message,
    this.subMessage,
    required this.icon,
    required this.iconColor,
    this.onShare,
    this.onClose,
  }) : super(key: key);

  @override
  State<_UniversalCongratsDialog> createState() =>
      _UniversalCongratsDialogState();
}

class _UniversalCongratsDialogState extends State<_UniversalCongratsDialog>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _pulse;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000),
    )..repeat(reverse: true);
    _pulse = Tween<double>(
      begin: 0.92,
      end: 1.08,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOut));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Widget _sparkles() {
    return IgnorePointer(
      child: SizedBox(
        width: 220,
        height: 220,
        child: AnimatedBuilder(
          animation: _controller,
          builder: (_, __) {
            final t = _controller.value;
            return Stack(
              children: [
                Positioned(
                  left: 16 + 40 * t,
                  top: 24 * (1 - t),
                  child: Opacity(
                    opacity: 1 - t,
                    child: const Icon(
                      Icons.star,
                      size: 14,
                      color: Colors.amber,
                    ),
                  ),
                ),
                Positioned(
                  right: 16 + 30 * (1 - t),
                  top: 28 * t,
                  child: Opacity(
                    opacity: t,
                    child: const Icon(
                      Icons.star_border,
                      size: 12,
                      color: Colors.greenAccent,
                    ),
                  ),
                ),
                Positioned(
                  left: 90,
                  bottom: 12 + 20 * t,
                  child: Opacity(
                    opacity: 0.6 + 0.4 * t,
                    child: const Icon(
                      Icons.brightness_1,
                      size: 8,
                      color: Colors.lightBlue,
                    ),
                  ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Center(
      child: Material(
        color: Colors.transparent,
        child: SizedBox(
          width: 320,
          child: Stack(
            alignment: Alignment.center,
            children: [
              // Dialog card
              Container(
                padding: const EdgeInsets.symmetric(
                  vertical: 20,
                  horizontal: 18,
                ),
                decoration: BoxDecoration(
                  color: theme.cardColor,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.18),
                      blurRadius: 16,
                      offset: const Offset(0, 8),
                    ),
                  ],
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Animated icon with pulse
                    ScaleTransition(
                      scale: _pulse,
                      child: CircleAvatar(
                        radius: 36,
                        backgroundColor: widget.iconColor.withOpacity(0.15),
                        child: Icon(
                          widget.icon,
                          size: 44,
                          color: widget.iconColor,
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      widget.title,
                      style: theme.textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      widget.message,
                      style: theme.textTheme.bodyMedium,
                      textAlign: TextAlign.center,
                    ),
                    if (widget.subMessage != null) ...[
                      const SizedBox(height: 12),
                      Text(
                        widget.subMessage!,
                        style: theme.textTheme.titleMedium?.copyWith(
                          color: widget.iconColor,
                        ),
                      ),
                    ],
                    const SizedBox(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        TextButton(
                          onPressed:
                              widget.onClose ??
                              () => Navigator.of(context).pop(),
                          child: const Text('Close'),
                        ),
                        const SizedBox(width: 8),
                        ElevatedButton.icon(
                          onPressed: () {
                            Navigator.of(context).pop();
                            widget.onShare?.call();
                          },
                          icon: const Icon(Icons.share_outlined),
                          label: const Text('Share'),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              // Decorative sparkles
              Positioned(top: -10, right: 6, child: _sparkles()),
            ],
          ),
        ),
      ),
    );
  }
}
