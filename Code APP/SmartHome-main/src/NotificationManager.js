import PushNotification from 'react-native-push-notification';

class NotificationManager {
  configure = () => {
    PushNotification.configure({
      // Cấu hình các thiết lập cho thông báo
      onNotification: function (notification) {
        console.log('Notification:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  };

  createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'channel-id', // ID của kênh thông báo
        channelName: 'Channel Name', // Tên của kênh thông báo
        channelDescription: 'A channel for notifications', // Mô tả kênh thông báo
        soundName: 'default', // Âm thanh mặc định cho thông báo
        importance: 4, // Mức độ quan trọng của thông báo
        vibrate: true, // Rung khi có thông báo
      },
      (created) => console.log(`Channel created: ${created}`),
    );
  };

  scheduleNotification = (message, date) => {
    PushNotification.localNotificationSchedule({
      // Cấu hình thông báo
      channelId: 'channel-id', // ID của kênh thông báo
      message: message, // Nội dung thông báo
      date: date, // Ngày giờ để hiển thị thông báo (định dạng: yyyy-mm-dd hh:mm:ss)
    });
  };
}

export const notificationManager = new NotificationManager();
