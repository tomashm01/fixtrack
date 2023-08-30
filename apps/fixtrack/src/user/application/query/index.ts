import { GetUserByIdHandler } from "./get-user-by-id.handler";
import { GetUserByIdQuery } from "./get-user-by-id.query";
import { GetUsersHandler } from "./get-users.handler";
import { GetUsersQuery } from "./get-users.query";

export const QueryHandlers=[
  GetUsersHandler,
  GetUserByIdHandler
];

export const Queries=[
  GetUsersQuery,
  GetUserByIdQuery
];