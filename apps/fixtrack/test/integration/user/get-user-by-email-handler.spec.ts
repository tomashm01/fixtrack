import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByEmailHandler } from '../../../src/user/application/query/get-user-by-email.handler';
import {
  USER_FINDER,
  UserFinder
} from '../../../src/user/application/service/user-finder.service';
import { UserEmail } from '../../../src/user/domain';
import { GetUserByEmailQuery } from '../../../src/user/application/query/get-user-by-email.query';
import { UserDTO } from '../../../../../libs/contracts/src';

describe('GetUserByEmailHandler', () => {
  let getUserByEmailHandler: GetUserByEmailHandler;
  let mockUserFinderService: jest.Mocked<UserFinder>;

  beforeEach(async () => {
    // Mock your UserFinderService
    const mockUserFinderProvider = {
      provide: USER_FINDER,
      useFactory: () => ({
        findByEmail: jest.fn()
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserByEmailHandler, mockUserFinderProvider]
    }).compile();

    getUserByEmailHandler = module.get<GetUserByEmailHandler>(
      GetUserByEmailHandler
    );
    mockUserFinderService = module.get(USER_FINDER);
  });

  it('should return a UserDTO when a user is found', async () => {
    // Given
    const userEmail = UserEmail.with('john.doe@example.com');
    const query = new GetUserByEmailQuery(userEmail.value);
    const expectedUserDTO: UserDTO = {
      id: '84750a21-6e17-4833-b76a-dbfe54cc1d85',
      email: 'john.doe@example.com',
      password: 'hashedPassword',
      role: 'ADMIN'
    };

    mockUserFinderService.findByEmail.mockResolvedValue(expectedUserDTO);

    // When
    const result = await getUserByEmailHandler.execute(query);

    // Then
    expect(result).toEqual(expectedUserDTO);
    expect(mockUserFinderService.findByEmail).toHaveBeenCalledWith(userEmail);
    expect(mockUserFinderService.findByEmail).toHaveBeenCalledTimes(1);
  });

  it('should return null when a user is not found', async () => {
    // Given
    const userEmail = UserEmail.with('john.doe@example.com');
    const query = new GetUserByEmailQuery(userEmail.value);

    mockUserFinderService.findByEmail.mockResolvedValue(null);

    // When
    const result = await getUserByEmailHandler.execute(query);

    // Then
    expect(result).toBeNull();
    expect(mockUserFinderService.findByEmail).toHaveBeenCalledWith(userEmail);
    expect(mockUserFinderService.findByEmail).toHaveBeenCalledTimes(1);
  });
});
