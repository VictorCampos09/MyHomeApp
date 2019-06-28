import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

import packageJson from '../../package.json';
import validaTipo from '../utils/validaTipo';

/**
 * Push
 *
 * @export
 * @class Push
 */
export default class Push {
  static ID_CHANNEL = packageJson.name;

  /**
   * listenerPush
   *
   * @static
   * @returns {function{listener}}
   * @memberof Push
   */
  static listenerPush() {
    try {
      const removeNotificationListener = firebase.notifications().onNotification(notification => {
        console.log('Notificação', notification);

        // Obter ação para a notificação
        const action = this.getAction();

        notification.android
          .setChannelId(this.ID_CHANNEL)
          .android.setAutoCancel(true)
          .android.setLocalOnly(true)
          .android.setSmallIcon('ic_launcher')
          .android.setPriority(firebase.notifications.Android.Priority.Max)
          .android.setCategory(firebase.notifications.Android.Category.Alarm)
          .android.addAction(action);
        firebase.notifications().displayNotification(notification);
      });
      return removeNotificationListener;
    } catch (error) {
      return false;
    }
  }

  /**
   * agendarPushUnico
   *
   * @static
   * @param {string} id
   * @param {string} titulo
   * @param {string} mensagem
   * @param {string} data
   * @param {object} [dados={}]
   * @returns {boolean}
   * @memberof Push
   */
  static async agendarPushUnico(id, titulo, mensagem, data, dados = {}) {
    try {
      // Verificações de tipos
      if (!validaTipo(id, 'string') || !validaTipo(titulo, 'string') || !validaTipo(mensagem, 'string') || !validaTipo(data, 'object')) {
        return false;
      }

      // Verificação de permissões
      if (!(await this.confirmarPermissoes())) return false;

      // Criação do canal de envio da mensagem
      if (!(await this.criarCanal())) return false;
      console.log('chegou até criar');

      // Montagem da notificação
      const date = new Date();
      date.setSeconds(date.getSeconds() + 5);
      const draftNotificacao = new firebase.notifications.Notification()
        .setNotificationId(id)
        .setTitle(titulo)
        .setBody(mensagem)
        .setData(dados)
        .android.setChannelId(this.ID_CHANNEL)
        .android.setAutoCancel(true)
        .android.setLocalOnly(true)
        .android.setSmallIcon('ic_launcher')
        .android.setPriority(firebase.notifications.Android.Priority.Max)
        .android.setCategory(firebase.notifications.Android.Category.Alarm);
      firebase.notifications().scheduleNotification(draftNotificacao, {
        fireDate: date.getTime(),
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async agendarPushRecorrente(mensagem, data) {
    try {
      const resp = { mensagem, data };
      return resp;
    } catch (error) {
      return false;
    }
  }

  /**
   * getAction
   *
   * @static
   * @returns {object{firebase.androidaction}}
   * @memberof Push
   */
  static getAction() {
    try {
      const action = new firebase.notifications.Android.Action('test_action', 'ic_launcher', 'Abrir no APP');
      return action;
    } catch (error) {
      return true;
    }
  }

  /**
   * confirmarPermissoes
   *
   * @static
   * @returns {boolean}
   * @memberof Push
   */
  static async confirmarPermissoes() {
    try {
      const enabled = await firebase.messaging().hasPermission();
      if (!enabled) {
        await firebase.messaging().requestPermission();
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * criarCanal
   *
   * @static
   * @returns {boolean}
   * @memberof Push
   */
  static async criarCanal() {
    try {
      if (Platform.OS === 'android') {
        const channel = new firebase.notifications.Android.Channel(
          this.ID_CHANNEL,
          this.ID_CHANNEL,
          firebase.notifications.Android.Importance.Max,
        ).setDescription(`Canal do App ${this.ID_CHANNEL}`);
        await firebase.notifications().android.createChannel(channel);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * obterkTokenFCM
   *
   * @static
   * @returns {string}
   * @memberof Push
   */
  static async obterTokenFCM() {
    try {
      return await firebase.messaging().getToken();
    } catch (error) {
      return false;
    }
  }
}

// CODIGO DE EXEMPLO PARA IMPLEMENTAÇÃO
//   const enabled = await firebase.messaging().hasPermission();
//   if (enabled) {
//     console.log('App habilitado');
//   } else {
//     try {
//       await firebase.messaging().requestPermission();
//       // User has authorised
//     } catch (error) {
//       console.log('Erro ao buscar permissões');
//     }
//   }

//   if (Platform.OS === 'android') {
//     const channel = new firebase.notifications.Android.Channel(
//       'test-channel',
//       'Test Channel',
//       firebase.notifications.Android.Importance.Max,
//     ).setDescription('My apps test channel');
//     // Create the channel
//     await firebase.notifications().android.createChannel(channel);
//   }

//   this.removeNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed(notification => {
//     // Process your notification as required
//     // ANDROID: Remote notifications do not contain the channel ID.
//     // You will have to specify this manually if you'd like to re-display the notification.
//     console.log('Notificação display', notification);
//   });

//   // ---------------------------------------------------------
//   // Notificação agendada
//   // ---------------------------------------------------------
//   // const date = new Date();
//   // date.setMinutes(date.getMinutes() + 1);
//   // const notific = new firebase.notifications.Notification()
//   //   .setNotificationId('testeNot')
//   //   .setTitle('TesteSched')
//   //   .setBody('Teste de notificação agendada')
//   //   .setData({
//   //     key1: 'value1',
//   //     key2: 'value2',
//   //   })
//   //   .android.setChannelId('test-channel')
//   //   .android.setAutoCancel(true)
//   //   .android.setSmallIcon('ic_launcher')
//   //   .android.setPriority(firebase.notifications.Android.Priority.Max)
//   //   .android.setCategory(firebase.notifications.Android.Category.Alarm);
//   // firebase.notifications().scheduleNotification(notific, {
//   //   fireDate: date.getTime(),
//   // });
//   this.removeNotificationListener = firebase.notifications().onNotification(notification => {
//     // Process your notification as required
//     console.log('Notificação recebida', notification);
//     const notificationDisplay = new firebase.notifications.Notification()
//       .setNotificationId(notification.notificationId)
//       .setTitle(notification.title)
//       .setBody(notification.body)
//       .setData({
//         key1: 'value1',
//         key2: 'value2',
//       })
//       .android.setChannelId('test-channel')
//       .android.setAutoCancel(true)
//       .android.setSmallIcon('ic_launcher')
//       .android.setPriority(firebase.notifications.Android.Priority.Max)
//       .android.setCategory(firebase.notifications.Android.Category.Alarm);
//     const action = new firebase.notifications.Android.Action('test_action', 'ic_launcher', 'My Test Action');
//     notificationDisplay.android.addAction(action);
//     firebase.notifications().displayNotification(notificationDisplay);
//   });
