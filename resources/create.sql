drop schema data cascade;

create schema data;

create table data.client(
    email text primary key,
    name text not null
);

create table data.wishlist(
    client_email text references data.client(email),
    product_id uuid not null
);