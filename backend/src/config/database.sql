
-- Создаем таблицу ролей
CREATE TABLE roles (
   id BIGSERIAL PRIMARY KEY,
   name VARCHAR(300) NOT NULL
);

-- Добавляем роли
INSERT INTO roles (name)
VALUES 
   ('admin'),
   ('manager'),
   ('employee'),
   ('client')
;

-- Создаем таблицу пользователей
CREATE TABLE users (
   id BIGSERIAL PRIMARY KEY,
   role_id BIGINT REFERENCES roles(id) ON DELETE SET NULL,
   name VARCHAR(300) NOT NULL,
   email VARCHAR(300) NOT NULL,
   date_birth DATE,
   phone TEXT DEFAULT NULL,
   avatar TEXT DEFAULT NULL,
   password_hash VARCHAR(500) NOT NULL,
   is_deleted BOOLEAN DEFAULT false,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP
);

-- Создаем таблицу профили мастеров
CREATE TABLE profiles_masters (
   id BIGSERIAL PRIMARY KEY,
   user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
   profile_name TEXT DEFAULT NULL,
   work_experience FLOAT,
   biography TEXT DEFAULT NULL,
   photos_works JSONB DEFAULT '[]'::jsonb,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP
);

-- Создаем таблицу графиков мастеров
CREATE TABLE master_graphics (
   id BIGSERIAL PRIMARY KEY,
   master_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
   day_date DATE, -- Конкретный день
   start_work TIME,
   end_work TIME,
   breaks TIME,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP
);

-- Создаем таблицу услуг
CREATE TABLE services (
   id BIGSERIAL PRIMARY KEY,
   service_name VARCHAR(500),
   price NUMERIC(10, 2),
   duration_minutes INTEGER,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP
);

-- Статусы записей бронирования
CREATE TABLE booking_record_statuses (
   id BIGSERIAL PRIMARY KEY,
   name TEXT,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP
);

-- Добавляем статусы записей
INSERT INTO booking_record_statuses (name) 
VALUES 
   ('pending'),
   ('confirmed'),
   ('cancelled'),
   ('completed')
;

-- Создаем таблицу записей бронирования
CREATE TABLE appointments (
   id BIGSERIAL PRIMARY KEY,
   client_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
   employee_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
   service_id BIGINT REFERENCES services(id) ON DELETE SET NULL,
   start_time TIMESTAMP, -- Начало сеанса
   end_time TIMESTAMP,
   status_id BIGINT REFERENCES booking_record_statuses(id) ON DELETE RESTRICT,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);