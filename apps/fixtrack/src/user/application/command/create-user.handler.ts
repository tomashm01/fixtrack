import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { AggregateRepository, InjectAggregateRepository } from "@aulasoftwarelibre/nestjs-eventstore";

import { CreateUserCommand } from "./create-user.command";
import { User, UserAlreadyExistsError, UserEmail, UserId, UserPassword, UserRole,} from "../../domain";
import { USER_FINDER, UserFinder } from "../service/user-finder.service";
import { UserDTO } from "@fixtrack/contracts";


@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
  @InjectAggregateRepository(User) private readonly users: AggregateRepository<User, UserId>,
  @Inject(USER_FINDER) private readonly userFinder: UserFinder
  ) {}

  async execute(command: CreateUserCommand) : Promise<User> {
    const userId : UserId = UserId.with(command.id);
    const email= UserEmail.with(command.email);
    const password = UserPassword.with(command.password);
    const role = UserRole.with(command.role);

    if((await this.userFinder.findById(userId)) instanceof UserDTO){
      throw UserAlreadyExistsError.withId(userId);
    }

    if((await this.userFinder.findByEmail(email)) instanceof UserDTO){
      throw UserAlreadyExistsError.withEmail(email);
    }
    
    const user = User.add(userId, email, password, role);

    this.users.save(user);

    return user;

  }
}
