---
---

# Expanding

Expanding means querying nested objects. Normally, Schedjuice only returns foreign keys for relationships.
If you want to retrieve the whole object, you need to set the `expand` parameter in the url query param. See [here](../query-param-reference.md) for more details.

## Relationship nomenclature

There are 3 types of relationships to consider:

- one-to-one
- many-to-one
- one-to-many

For one-to-one relationships, the related field name is the same as the model name.

For many-to-one relationships, the related field name should exist on the model. (meaning, the `Book` model should already have the `author` field)

For one-to-many relationships, the related field name is in this pattern: `f"{field_name}_set"`.

## A simple example

Consider a database having two tables `Book` and `Author`.

It includes the following books:

| id | title | author |
| --- | --- | --- |
| 1 | A Brief History of Time | 1 |
| 2 | The Lord of the Rings | 2 |
| 3 | The Hobbit | 2 |

And these authors:

| id | name | is_alive |
| --- | --- | --- |
| 1 | Stephen Hawkings | false |
| 2 | J. R. R. Tolkien | false |

Querying to `/books` will yield:

```json
[
  {
    "id": 1,
    "title": "A Brief History of Time",
    "author": 1
  },
  {
    "id": 2,
    "title": "The Lord of the Rings",
    "author": 2
  },
  {
    "id": 3,
    "title": "The Hobbit",
    "author": 2
  }
]
```

If you want the `author` field to be populated, your query will look like this: `/books?expand=["author"]` (the `expand` param has to be base64 encoded).

```json
[
  {
    "id": 1,
    "title": "A Brief History of Time",
    "author": {
      "id": 1,
      "name": "Stephen Hawkings",
      "is_alive": false
    }
  },
  {
    "id": 2,
    "title": "The Lord of the Rings",
    "author": {
      "id": 2,
      "name": "J. R. R. Tolkien",
      "is_alive": false
    }
  },
  {
    "id": 3,
    "title": "The Hobbit",
    "author": {
      "id": 2,
      "name": "J. R. R. Tolkien",
      "is_alive": false
    }
  }
]
```

A normal query to `/authors` will yield this result. Notice here that there is no sign of foreign relationships unlike our previous model.

```json
[
  {
    "id": 1,
    "name": "Stephen Hawkings",
    "is_alive": false
  },
  {
    "id": 2,
    "name": "J. R. R. Tolkien",
    "is_alive": false
  }
]
```

If you want to query the list of books, your query will look like this: `/authors?expand=["book_set"]`. Thus, yielding:

```json
[
  {
    "id": 1,
    "name": "Stephen Hawkings",
    "is_alive": false,
    "book_set": [
      {
        "id": 1,
        "title": "A Brief History of Time",
        "author": 1
      }
    ]
  },
  {
    "id": 2,
    "name": "J. R. R. Tolkien",
    "is_alive": false,
    "book_set": [
      {
        "id": 2,
        "title": "The Lord of the Rings",
        "author": 2
      },
      {
        "id": 3,
        "title": "The Hobbit",
        "author": 2
      }
    ]
  }
]
```

You can take a step further and make this request: `/authors?expand=["book_set", "book_set.author"]`.

```json
[
  {
    "id": 1,
    "name": "Stephen Hawkings",
    "is_alive": false,
    "book_set": [
      {
        "id": 1,
        "title": "A Brief History of Time",
        "author": {
          "id": 1,
          "name": "Stephen Hawkings",
          "is_alive": false
        }
      }
    ]
  },
  {
    "id": 2,
    "name": "J. R. R. Tolkien",
    "is_alive": false,
    "book_set": [
      {
        "id": 2,
        "title": "The Lord of the Rings",
        "author": {
          "id": 2,
          "name": "J. R. R. Tolkien",
          "is_alive": false
        }
      },
      {
        "id": 3,
        "title": "The Hobbit",
        "author": {
          "id": 2,
          "name": "J. R. R. Tolkien",
          "is_alive": false
        }
      }
    ]
  }
]
```

This is of course completely useless for this case.

## Nest as much as you want

Nesting is not limited to only dept of 1. You can query the grandchildren and great-grandchildren as well. However, do be mindful about the performance issues.

## Errors are silent

Supplying a non-existent field name will **not** raise any errors.

> This is implemented using drf-ff, for more information see its docs [here](https://github.com/rsinger86/drf-flex-fields).