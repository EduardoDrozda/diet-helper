import 'knex';

declare module 'knex/types/tables' {
  interface Tables {
    users: {
      id: string;
      name: string;
      email: string;
      password: string;
      created_at: string;
      updated_at: string;
    };
  }
}
