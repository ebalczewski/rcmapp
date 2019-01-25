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
    "S2",
    "date",
    "date2"
);

INSERT INTO addresses (
    current,
    latitude,
    longitude,
    createdAt,
    updatedAt,
    userId
) VALUES (
    "true",
    "40.690252",
    "-73.973060",
    "date",
    "date2",
    1
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

INSERT INTO users (
    email,
    firstName,
    lastName,
    batch,
    createdAt,
    updatedAt
) VALUES (
    "ned@email.com",
    "Ned",
    "Stark",
    "W2",
    "date",
    "date2"
);

INSERT INTO addresses (
    current,
    latitude,
    longitude,
    createdAt,
    updatedAt,
    userid
) VALUES (
    "true",
    "40.7484",
    "73.9857",
    "date",
    "date2",
    2
);

INSERT INTO UserAddress (
    userId,
    addressId,
    createdAt,
    updatedAt
) VALUES (
    2,
    2,
    "date",
    "date2"
);



SELECT * FROM users;
SELECT * FROM addresses;

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
