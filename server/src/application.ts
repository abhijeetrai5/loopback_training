import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
export {ApplicationConfig};
import {LoggerProvider} from './providers/logger.provider';
import {LoggerBindings, UserBindings} from './keys';
import {AuthenticationComponent} from '@loopback/authentication';
import {JWTAuthenticationComponent} from '@loopback/authentication-jwt';
import {MyUserService} from './services/user.service';
import {
  AuthorizationBindings,
  AuthorizationComponent
} from 'loopback4-authorization';


export class ServerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
      indexTitle: 'My LoopBack API Explorer',
    });
    this.component(RestExplorerComponent);
    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);

    // this.configure(LoggingBindings.COMPONENT).to({
    //   enableFluent: false, // default to true
    //   enableHttpAccessLog: true, // default to true
    // });
    // this.configure(LoggingBindings.WINSTON_LOGGER).to({
    //   level: 'info',
    //   defaultMeta: {framework: 'LoopBack'},
    // });
    // this.component(LoggingComponent);
    
    this.bind(LoggerBindings.LOGGER).toProvider(LoggerProvider);
    this.bind(UserBindings.USER_SERVICE).toClass(MyUserService);

    this.bind(AuthorizationBindings.CONFIG).to({
      allowAlwaysPaths: ['/explorer'],
    });
    this.component(AuthorizationComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
