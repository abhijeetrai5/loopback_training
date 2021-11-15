import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DataObject, Options, repository} from '@loopback/repository';
import {RoleRepository} from './role.repository';
import {Role, User, UserRelations} from '../models';
import {UserDbDataSource} from '../datasources';
import {SoftCrudRepository} from 'loopback4-soft-delete';
import {DefaultCrudRepository} from '@loopback/repository';
import * as bcrypt from 'bcrypt';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> 
{
  public readonly user_role: BelongsToAccessor<
  Role,
  typeof Role.prototype.id
>;
  constructor(
    @inject('datasources.userDb') dataSource: UserDbDataSource,
    @repository.getter('RoleRepository')
    protected roleRepositoryGetter: Getter<RoleRepository>,
    
  ) {
    super(User, dataSource);

    this.user_role = this.createBelongsToAccessorFor(
      'user_role',
      roleRepositoryGetter,
    );

    this.registerInclusionResolver('user_role', this.user_role.inclusionResolver);
  }
  private readonly saltRounds = 8;

    async create(entity: DataObject<User>, options?: Options): Promise<User> {
  
      entity.password = await bcrypt.hash(
        entity.password ?? '',
        this.saltRounds,
      );
      const user = await super.create(entity, options);
      return user;
    }
}