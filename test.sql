DELETE FROM users;
DELETE FROM addresses;
DELETE FROM UserAddress;

INSERT INTO users (
    email,
    firstName,
    lastName,
    batch,
    createdAt,
    updatedAt
) VALUES (
    "john@email.com",
    "John",
    "Snow",
    "F2",
    "date",
    "date2"
);

INSERT INTO addresses (
    current,
    latitude,
    longitude,
    createdAt,
    updatedAt
) VALUES (
    "true",
    "40.7484",
    "73.9857",
    "date",
    "date2"
);

INSERT INTO UserAddress (
    userId,
    addressId,
    createdAt,
    updatedAt
) VALUES (
    1,
    1,
    "date",
    "date2"
);

SELECT * FROM users;

/*INSERT INTO users (
    email,
    firstName,
    lastName,
    batch,
    createdAt,
    updatedAt
) VALUES (
    "marie@email.com",
    "Marie",
    "Antoinette",
    "W2",
    "date",
    "date2"
)
*/