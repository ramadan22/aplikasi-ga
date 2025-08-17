/**
 * Request permission untuk menampilkan notifikasi desktop.
 * @returns Promise<boolean> true jika diizinkan, false jika tidak.
 */
export function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false); // SSR-safe

  if (!('Notification' in window)) {
    console.warn('Browser tidak mendukung Notification API');
    return Promise.resolve(false);
  }

  if (Notification.permission === 'granted') {
    return Promise.resolve(true);
  }

  if (Notification.permission !== 'denied') {
    return Notification.requestPermission().then(
      (permission: NotificationPermission) => permission === 'granted',
    );
  }

  return Promise.resolve(false);
}

/**
 * Menampilkan notifikasi desktop.
 * @param title Judul notifikasi.
 * @param options Opsi notifikasi bawaan Notification API.
 */
export function showNotification(
  title: string,
  options?: NotificationOptions & { data?: { url?: string }; duration?: number },
) {
  if (typeof window === 'undefined') return;
  if (!('Notification' in window)) return;

  if (Notification.permission === 'granted') {
    const notif = new Notification(title, options);

    // Tutup otomatis setelah durasi tertentu
    if (options?.duration) {
      setTimeout(() => notif.close(), options.duration);
    }

    notif.onclick = () => {
      window.focus();
      const url = options?.data?.url;
      if (url) window.open(url, '_blank');
    };
  } else {
    console.warn('Permission not granted for Notification');
  }
}
