Omlet Sport Pinned App

1. git clone https://github.com/aaqibhabib/omlet-sport.git
2. cd omlet-sport
3. npm install
4. node start
5. Navigate to `localhost:8080/` for angular app, or `localhost:8080/api/` for api message

# API Documentation
##/api/games/
## Resquest
###/api/games/
## Response
Returns the next 16 games scheduled to be played from todays date. This will return at most 1 weeks worth of games.

```
[
  {
    "id": "010a5f1e-3af5-48d6-a610-7149cefb6957",
    "status": "scheduled",
    "reference": "56693",
    "number": 191,
    "scheduled": "2015-12-07T01:30:00.000Z",
    "venue": {
      "id": "7349a2e6-0ac9-410b-8bd2-ca58c9f7aa34",
      "name": "Heinz Field",
      "city": "Pittsburgh",
      "state": "PA",
      "country": "USA",
      "zip": "15212",
      "address": "100 Art Rooney Avenue",
      "capacity": 65050,
      "surface": "turf",
      "roof_type": "outdoor"
    },
    "home": {
      "name": "Pittsburgh Steelers",
      "alias": "PIT",
      "game_number": 12,
      "id": "cb2f9f1f-ac67-424e-9e72-1475cb0ed398"
    },
    "away": {
      "name": "Indianapolis Colts",
      "alias": "IND",
      "game_number": 12,
      "id": "82cf9565-6eb9-4f01-bdbd-5aa0d472fcd9"
    },
    "broadcast": {
      "network": "NBC"
    }
  },
  ...
]
```
##/api/games/:game_id
### Resquest
####/api/games/c8ca977e-77ad-42fc-a80b-0d4a78e73b87
### Response
Returns the game score, delayed up to 5mins
```
{
  "clock": "00:00",
  "status": "closed",
  "quarter": 4,
  "home": {
    "name": "Cowboys",
    "market": "Dallas",
    "alias": "DAL",
    "reference": "4949",
    "used_timeouts": 3,
    "remaining_timeouts": 0,
    "id": "e627eec7-bbae-4fa4-8e73-8e1d6bc5c060",
    "points": 27
  },
  "away": {
    "name": "Giants",
    "market": "New York",
    "alias": "NYG",
    "reference": "4962",
    "used_timeouts": 0,
    "remaining_timeouts": 3,
    "id": "04aa1c9d-66da-489d-b16a-1dee3f2eec4d",
    "points": 26
  },
  "updatedAt": 1448950454988
}
```

### Resquest
####/api/games/010a5f1e-3af5-48d6-a610-7149cefb6957
### Response
Returns the game score, delayed up to 5mins. Null values for scheduled games
```
{
  "clock": null,
  "status": "scheduled",
  "home": {
    "name": "Steelers",
    "market": "Pittsburgh",
    "alias": "PIT",
    "id": "cb2f9f1f-ac67-424e-9e72-1475cb0ed398"
  },
  "away": {
    "name": "Colts",
    "market": "Indianapolis",
    "alias": "IND",
    "id": "82cf9565-6eb9-4f01-bdbd-5aa0d472fcd9"
  },
  "updatedAt": 1448950440933
}
```