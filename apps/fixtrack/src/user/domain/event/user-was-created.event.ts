import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

import { CreateUserDTO } from '@fixtrack/contracts';

export class UserWasCreated extends Event<CreateUserDTO> {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: string,
  ) {
    super(id, { _id: id, email, password, role });
  }
}