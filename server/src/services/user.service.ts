import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {UserProfile,securityId} from '@loopback/security';
import {User,Cred} from '../models';
import {UserRepository} from '../repositories';
import * as bcrypt from 'bcrypt';

export class MyUserService implements UserService<User, Cred>{


  constructor(
    @repository(UserRepository)
    private userRepo: UserRepository,
  ) {
  }

  async verifyCredentials(credentials: Cred): Promise<User> {
      console.log('Credentials', credentials.email)
    const foundUser = await this.userRepo.findOne({
      where: {
        email: credentials.email
      }
    });

    if (!foundUser) {
      throw new HttpErrors.NotFound("User not found");
    }
    console.log(credentials.password, foundUser.password)
    const matched = await bcrypt.compare(credentials.password, foundUser.password);
    if (!matched) {
      throw new HttpErrors.Unauthorized("Invalid password");
    }
    return foundUser
  }
  convertToUserProfile(user: User): UserProfile {
    const userId: string = String(user.id)
    return {
        id: user.id,
        name: '<' + user.email + '>' + user.name,
        [securityId]: userId,
      };
  }

}