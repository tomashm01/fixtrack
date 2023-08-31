import { GetUserByEmailHandler } from "./get-user-by-email.handler";
import { GetUserByEmailQuery } from "./get-user-by-email.query";
import { GetUserByIdHandler } from "./get-user-by-id.handler";
import { GetUserByIdQuery } from "./get-user-by-id.query";
import { GetUsersHandler } from "./get-users.handler";
import { GetUsersQuery } from "./get-users.query";

export const QueryHandlers=[
  GetUsersHandler,
  GetUserByIdHandler,
  GetUserByEmailHandler
];

export const Queries=[
  GetUsersQuery,
  GetUserByIdQuery,
  GetUserByEmailQuery
];