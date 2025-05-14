# Project Setup

### For Node:

1. npm init
2. npm i express
3. npm i body-parser cors
4. npm install --save sequelize mysql2
5. npm install --save-dev sequelize-cli
6. npm i express-validator

### For ESLint:

1. npm install eslint --save-dev
2. npm install --save-dev eslint-plugin-node eslint-plugin-import
3. npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier
   eslint-plugin-node eslint-plugin-import

# Database Setup

Temporarily disable foreign key:

`SET FOREIGN_KEY_CHECKS=0; SET FOREIGN_KEY_CHECKS=1;`

Ignore models not required: `includeIgnoreAttributes: false`

## Basic Sequelize Commands:

- `npx sequelize-cli init` - Initialize Sequelize configuration.
- `npx sequelize-cli db:migrate` - Run all migrations.
- `npx sequelize-cli db:migrate:undo` - Undo the last migration.
- `npx sequelize-cli db:migrate:status` - Check migration status.
- `npx sequelize-cli seed:generate --name demo-user` - Generate a seed file.
- `npx sequelize-cli db:seed:all` - Runs all the seed files but this may run
  every seed file multiple times
- `npx sequelize-cli migration:generate --name update-models` - Generate a new
  migration file.
- `npx sequelize-cli db:seed --seed 20250222160508-Role.js` - Generate a seed
  file for specific file.

## Data Types:

| CLI Data Type (Lowercase) | Sequelize Data Type (Uppercase) |
| ------------------------- | ------------------------------- |
| `string`                  | `STRING`                        |
| `integer`                 | `INTEGER`                       |
| `float`                   | `FLOAT`                         |
| `boolean`                 | `BOOLEAN`                       |
| `date`                    | `DATE`                          |
| `uuid`                    | `UUID`                          |
| `text`                    | `TEXT`                          |

## Steps:

- Step 1. `npx sequelize-cli init`
- Step 2. Create models.
- Step 3. Create Database in sql.
- Step 4. `npx sequelize-cli db:migrate`
- Step 5. `npx sequelize-cli seed:generate --name demo-user` for bulkInsert.
- Step 6. `npx sequelize-cli db:seed:all` for running all seed files.
- Step 7. `npx sequelize-cli db:seed --seed 20250222160508-Role.js` Generate a
  seed file.

## Schema Setup:

### Role Model:

```sh
npx sequelize-cli model:generate --name Role --attributes role:string,description:text
```

### User Model:

```sh
npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string,profilePhoto:string
```

### userRole Model:

```sh
npx sequelize-cli model:generate --name UserRole --attributes userId:integer,roleId:integer
```

### Address Model:

```sh
npx sequelize-cli model:generate --name Address --attributes userId:string,address1:string,address2:string,street:string,city:string,state:string,zipcode:string,country:string
```

### Attendance Model:

```sh
npx sequelize-cli model:generate --name Attendance --attributes userId:integer,checkInTime:date,checkOutTime:date,locationLat:float,locationLng:float,status:string
```

### FaceRecognitionLog Model:

```sh
npx sequelize-cli model:generate --name FaceRecognitionLog --attributes userId:integer,faceMatchPercentage:float,imagePath:string
```

### GeofenceLocation Model:

```sh
npx sequelize-cli model:generate --name GeofenceLocation --attributes locationName:string,allowedLat:float,allowedLng:float,radiusMeters:integer
```

### UserGeoLocations Model:

```sh
npx sequelize-cli model:generate --name UserGeoLocations --attributes userId:integer,locationId:integer
```

### Notification Model:

```sh
npx sequelize-cli model:generate --name Notification --attributes userId:integer,message:string,status:string
```

### Country Model:

```sh
npx sequelize-cli model:generate --name Country --attributes name:string,iso2:string,phoneCode:string,nationality:string,latitude:string,longitude:string,emoji:string
```

### State Model:

```sh
npx sequelize-cli model:generate --name State --attributes name:string,countryCode:string,iso2:string,latitude:string,longitude:string
```

### City Model:

```sh
npx sequelize-cli model:generate --name City --attributes name:string,stateCode:string,iso2:string,latitude:string,longitude:string
```

### Attendance Rules Model :

```sh
npx sequelize-cli model:generate --name AttendanceRules --attributes gracePeriod:integer,lateThreshold:integer,leaveTypes:string,annualLeave:integer,enableHalfDay:boolean,autoDeductLeave:boolean,markAbsentAfter:integer,enableAbsentAlert:boolean,notifyAdmin:integer
```

### Leave Model

```sh
npx sequelize-cli model:generate --name LeaveRequest --attributes leaveType:string,duration:integer,from:date,to:date,reason:string,documentUrl:string
```

### generateCountryStateCity Seed

```sh
npx sequelize-cli seed:generate --name generateCountryStateCity
```
