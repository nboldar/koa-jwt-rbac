export default class ModeratorPermission {
  static get can() {
    return ['/', '/login', '/signup', '/confirm_email', '/refresh_token'];
  }
}
