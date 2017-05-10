drop database if exists bozor;
create database bozor;

\c bozor;

create extension citext;
create extension "uuid-ossp";
create extension pgcrypto;
create extension tcn;
create extension plv8;

create table users (
  id bigint primary key,
  first_name citext not null,
  last_name citext,
  username citext,
  is_admin bool default false,
  joined timestamptz default timezone('Asia/Tashkent'::text, now())
);

create table contacts (
  user_id bigint not null references users unique,
  phone_number text,
  created timestamptz default timezone('Asia/Tashkent'::text, now())
);
