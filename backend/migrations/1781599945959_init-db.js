/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
   // 1. Таблица ролей
   pgm.createTable('roles', {
      id: { type: 'bigserial', primaryKey: true },
      name: { type: 'varchar(300)', notNull: true },
   });

   // Добавляем роли справочника
   pgm.sql(`
    INSERT INTO roles (name) VALUES ('admin'), ('manager'), ('employee'), ('client');
  `);

   // 2. Таблица пользователей
   pgm.createTable('users', {
      id: { type: 'bigserial', primaryKey: true },
      role_id: {
         type: 'bigint',
         references: '"roles"',
         onDelete: 'SET NULL',
      },
      name: { type: 'varchar(300)', notNull: true },
      email: { type: 'varchar(300)', notNull: true },
      date_birth: { type: 'date' },
      phone: { type: 'text', default: null },
      avatar: { type: 'text', default: null },
      password_hash: { type: 'varchar(500)', notNull: true },
      is_deleted: { type: 'boolean', default: false, notNull: true },
      created_at: {
         type: 'timestamp',
         notNull: true,
         default: pgm.func('current_timestamp'),
      },
      updated_at: { type: 'timestamp' },
   });

   // 3. Таблица профилей мастеров
   pgm.createTable('profiles_masters', {
      id: { type: 'bigserial', primaryKey: true },
      user_id: {
         type: 'bigint',
         references: '"users"',
         onDelete: 'CASCADE',
      },
      profile_name: { type: 'text', default: null },
      work_experience: { type: 'float' },
      biography: { type: 'text', default: null },
      photos_works: { type: 'jsonb', default: '[]' },
      created_at: {
         type: 'timestamp',
         notNull: true,
         default: pgm.func('current_timestamp'),
      },
      updated_at: { type: 'timestamp' },
   });

   // 4. Таблица графиков мастеров
   pgm.createTable('master_graphics', {
      id: { type: 'bigserial', primaryKey: true },
      master_id: {
         type: 'bigint',
         references: '"users"',
         onDelete: 'CASCADE',
      },
      day_date: { type: 'date' },
      start_work: { type: 'time' },
      end_work: { type: 'time' },
      breaks: { type: 'time' },
      created_at: {
         type: 'timestamp',
         notNull: true,
         default: pgm.func('current_timestamp'),
      },
      updated_at: { type: 'timestamp' },
   });

   // 5. Таблица услуг
   pgm.createTable('services', {
      id: { type: 'bigserial', primaryKey: true },
      service_name: { type: 'varchar(500)', notNull: true },
      price: { type: 'numeric(10,2)', notNull: true },
      duration_minutes: { type: 'integer', notNull: true },
      created_at: {
         type: 'timestamp',
         notNull: true,
         default: pgm.func('current_timestamp'),
      },
      updated_at: { type: 'timestamp' },
   });

   // 6. Статусы записей бронирования
   pgm.createTable('booking_record_statuses', {
      id: { type: 'bigserial', primaryKey: true },
      name: { type: 'text', notNull: true },
      created_at: {
         type: 'timestamp',
         notNull: true,
         default: pgm.func('current_timestamp'),
      },
      updated_at: { type: 'timestamp' },
   });

   // Добавляем системные статусы визитов
   pgm.sql(`
    INSERT INTO booking_record_statuses (name) VALUES ('pending'), ('confirmed'), ('cancelled'), ('completed');
  `);

   // 7. Таблица записей бронирования (Appointments)
   pgm.createTable('appointments', {
      id: { type: 'bigserial', primaryKey: true },
      client_id: {
         type: 'bigint',
         references: '"users"',
         onDelete: 'SET NULL',
      },
      employee_id: {
         type: 'bigint',
         references: '"users"',
         onDelete: 'SET NULL',
      },
      service_id: {
         type: 'bigint',
         references: '"services"',
         onDelete: 'SET NULL',
      },
      start_time: { type: 'timestamp', notNull: true },
      end_time: { type: 'timestamp', notNull: true },
      status_id: {
         type: 'bigint',
         references: '"booking_record_statuses"',
         onDelete: 'RESTRICT',
      },
      created_at: {
         type: 'timestamp',
         notNull: true,
         default: pgm.func('current_timestamp'),
      },
   });
};;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
   // Удаляем таблицы программно в обратном порядке
   pgm.dropTable('appointments', { ifExists: true, cascade: true });
   pgm.dropTable('booking_record_statuses', { ifExists: true, cascade: true });
   pgm.dropTable('services', { ifExists: true, cascade: true });
   pgm.dropTable('master_graphics', { ifExists: true, cascade: true });
   pgm.dropTable('profiles_masters', { ifExists: true, cascade: true });
   pgm.dropTable('users', { ifExists: true, cascade: true });
   pgm.dropTable('roles', { ifExists: true, cascade: true });
};
