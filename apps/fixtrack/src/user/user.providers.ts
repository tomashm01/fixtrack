import { USER_FINDER } from "./application/service/user-finder.service";
import { UserInMemory } from "./infraestructure/service/userInMemory.service";

export const UserProviders = [
  {
    provide: USER_FINDER,
    useClass: UserInMemory,
  },
];