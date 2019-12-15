import config from '../config';
import AdminPermission from './AdminPermission';
import UserPermission from './UserPermission';
import ModeratorPermission from './ModeratorPermission';
import GuestPermission from './GuestPermission';

const { roles } = config;
const permissions = {
  [roles.guest]: GuestPermission.can,
  [roles.user]: UserPermission.can,
  [roles.moderator]: ModeratorPermission.can,
  [roles.admin]: AdminPermission.can,
};
export default permissions;
