import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../../fixtrack/src/user/infraestructure/controller/user.controller';
import { UserService } from '../../../../fixtrack/src/user/infraestructure/service/user.service';
import { INestApplication } from '@nestjs/common';
import { CreateUserDTO, UserDTO } from '../../../../../libs/contracts/src';
import { CommandBus, QueryBus } from "@nestjs/cqrs";

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService,UserService,
        {
          provide: CommandBus, 
          useValue: {}, 
        },
        {
          provide: QueryBus, 
          useValue: {}, 
        },],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('/api/user (GET)', () => {
    it('should return an array of users', async () => {
      const result : UserDTO[] = [
        {
          "id": "af727a9e-46ac-11ee-be56-0242ac120002",
          "email": "john.doe@example.com",
          "password": "StrongPasswordHere",
          "role": "ADMIN"
        },
        {
          "id": "af727a9e-46ac-11ee-be56-0242ac120003",
          "email": "tpefopf@gmail.com",
          "password": "StrongPasswordHere",
          "role": "USER"
        }
      ];
      jest.spyOn(userService, 'getUsers').mockImplementation(() => Promise.resolve(result));

      expect(await userController.findAll()).toBe(result);
    });
  });

  describe('/api/user (POST)', () => {
    it('should create a user', async () => {
      // Mocking the request object of type CreateUserDTO
      const createUserDto: CreateUserDTO = {
        _id: 'af727a9e-46ac-11ee-be56-0242ac120002',
        email: 'john.doe@example.com',
        password: 'StrongPasswordHere',
        role: 'ADMIN',
      };
  
      // Mocking the response object of type UserDTO
      const result: UserDTO = {
        id: 'af727a9e-46ac-11ee-be56-0242ac120002',
        email: 'john.doe@example.com',
        password: 'StrongPasswordHere',
        role: 'ADMIN',
      };
  
      // Mocking the UserService method to return the mocked UserDTO
      jest.spyOn(userService, 'createUser').mockImplementation(() => Promise.resolve(result));
  
      // Testing the UserController method
      expect(await userController.create(createUserDto)).toBe(result);
    });

  });
});
