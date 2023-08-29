import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";

import { CreateUserCommand } from "./create-user.command";
import { User, UserAlreadyExistsError, UserEmail, UserId, UserPassword, UserRole,} from "../../domain";
import { USER_FINDER, UserFinder } from "../service/user-finder.service";
import { AggregateRepository, InjectAggregateRepository } from "@aulasoftwarelibre/nestjs-eventstore";


@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@Inject(USER_FINDER) private readonly userFinder:UserFinder,
  @InjectAggregateRepository(User) private readonly users: AggregateRepository<User, UserId>
  ) {}

  async execute(command: CreateUserCommand) {

    const userId : UserId = UserId.generate();
    const email= UserEmail.fromString(command.email);
    const password = UserPassword.fromString(command.password);
    const role = UserRole.fromString(command.role);

    if(this.userFinder.findByEmail(command.email)==null){
      throw UserAlreadyExistsError.withEmail(email);
    }

    if(this.userFinder.findById(userId.value)==null){
      throw UserAlreadyExistsError.withId(userId);
    }

    const user = User.add(userId, email, password, role);

    this.users.save(user);

    return user;
  }
}
