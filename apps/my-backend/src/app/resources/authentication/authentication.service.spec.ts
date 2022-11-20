import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { LocalStrategy } from '../../guards/auth-guards/strategy/local.strategy';
import { JwtStrategy } from '../../guards/auth-guards/strategy/jwt.strategy';
import { UserService } from '../user/user.service';
import { DbService } from '@my-full-stack-app/my-backend/data-access-db';
import { JwtService } from '@nestjs/jwt';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationResolver,
        AuthenticationService,
        LocalStrategy,
        JwtStrategy,
        UserService,
        DbService,
        JwtService,
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
