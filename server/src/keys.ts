import {ILogger} from './providers/logger.provider';
import {BindingKey} from '@loopback/context';
import {User, Cred} from './models';
import {UserService} from '@loopback/authentication';

export namespace LoggerBindings {
  export const LOGGER = BindingKey.create<ILogger>('providers.logger');
}

export namespace UserBindings {
  export const USER_SERVICE = BindingKey.create<UserService<User, Cred>>('service.user.service');
}

