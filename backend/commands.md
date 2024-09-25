npx dotenv sequelize-cli migration:generate --name NAME --attributes NAME:DATATYPE, ETC

npx dotenv sequelize-cli model:generate --name NAME --attributes NAME:DATATYPE, ETC

npx sequelize model:generate --name Spot --attributes address:string,city:string,state:string,country:string,lat:decimal,lng:decimal,name:string,description:text,price:decimal


npx sequelize seed:generate --name demo-spot

npx sequelize model:generate --name SpotImages --attributes url:text,spotId:integer