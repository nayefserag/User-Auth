import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/general/user.entity';
import { Repository } from 'typeorm';
import { SignupDto } from 'src/app/modules/application/auth/model/signup.dto';
import { OAuthDto } from 'src/app/modules/application/auth/model/o-auth.dto';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    let logger = new Logger();
    logger.log('AuthRepository created', AuthRepository.name);
  }
  async createUser(user: SignupDto | OAuthDto) {
    try {
      let entity = this.userRepository.create(user);
      entity = await this.userRepository.save(entity);
      Logger.log('User created successfully', AuthRepository.name);
      return entity;
    } catch (error) {
      Logger.error(error.message, AuthRepository.name);
      throw error;
    }
  }
  async updateUser(user: Partial<UserEntity>) {
    try {
      let entity = await this.userRepository.save(user);
      Logger.log('User updated successfully', AuthRepository.name);
      return entity;
    } catch (error) {
      Logger.error(error.message, AuthRepository.name);
      throw error;
    }
  }

  async getUserByFelid(field: keyof UserEntity, value: any) {
    try {
      let entity = await this.userRepository.findOne({
        where: { [field]: value },
      });
      Logger.log(`User fetched successfully by ${field}`, AuthRepository.name);
      return entity;
    } catch (error) {
      Logger.error(`Error fetching user by ${field}`, AuthRepository.name);
      throw error;
    }

  }
  async deleteUser(userId: string) {
    try {
      let entity = await this.userRepository.delete(userId);
      Logger.log('User deleted successfully', AuthRepository.name);
      return entity;
    } catch (error) {
      Logger.error(error.message, AuthRepository.name);
      throw error;
    }
  }
}
