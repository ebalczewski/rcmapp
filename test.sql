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
    "W1",
    "date",
    "date2"
);

INSERT INTO addresses (
    streetAddress1,
    city,
    state,
    zip,
    country,
    createdAt,
    updatedAt
) VALUES (
    "20 W 34th St",
    "New York",
    "New York",
    "10001",
    "USA",
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