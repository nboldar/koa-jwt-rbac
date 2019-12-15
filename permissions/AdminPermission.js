export default class AdminPermission {
  static get can() {
    return ['/', '/login', '/signup', '/confirm_email', '/refresh_token'];
  }
}
