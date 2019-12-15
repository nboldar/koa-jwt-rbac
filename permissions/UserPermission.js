export default class UserPermission {
  static get can() {
    return ['/', '/login', '/signup', '/confirm_email', '/refresh_token'];
  }
}
