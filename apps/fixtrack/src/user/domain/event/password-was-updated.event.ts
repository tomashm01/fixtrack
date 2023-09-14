import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

import { ChangePasswordDTO, CreateUserDTO } from '@fixtrack/contracts';

export class PasswordWasChanged extends Event<ChangePasswordDTO> {
  constructor(
    public readonly id: string,
    public readonly password: string,
  ) {
    super(id, { _id:id, password });
  }
}
