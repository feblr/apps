/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS feeds (
    id bigint primary key,
    publisher varchar not null,
    content json not null,
    created_at datetime not null,
    updated_at datetime,
    status int default 0
)