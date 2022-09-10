/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS feeds (
    id varchar primary key,
    content json not null,
    created_at datetime not null,
    updated_at datetime,
    status int default 0
)