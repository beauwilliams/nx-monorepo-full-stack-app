import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { DbService } from '@my-full-stack-app/my-backend/data-access-db';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
  providers: [UserResolver, UserService, DbService],
  exports: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
