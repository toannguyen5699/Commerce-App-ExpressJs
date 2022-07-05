import { ConnectionOptions, createConnection } from 'typeorm';
import { join } from 'path';
import { createClient } from 'redis';

import { IServer } from '../../common/interface/app.interface';
import APP_CONFIG from '../locales/app.config';
import { logger } from '../../utils';

export const client = createClient({
  host: APP_CONFIG.ENV.DATABASE.REDIS.HOST,
  port: APP_CONFIG.ENV.DATABASE.REDIS.PORT,
  password: '',
  db: APP_CONFIG.ENV.DATABASE.REDIS.DATABASE,
});

// function connectMongoDB() {
//   // const connectionUri = `mongodb://${APP_CONFIG.ENV.DATABASE.MONGODB.USERNAME}:${APP_CONFIG.ENV.DATABASE.MONGODB.PASSWORD}@${APP_CONFIG.ENV.DATABASE.MONGODB.HOST}:${APP_CONFIG.ENV.DATABASE.MONGODB.PORT}/${APP_CONFIG.ENV.DATABASE.MONGODB.NAME}`;
//   // const connectionUri = `mongodb://${APP_CONFIG.ENV.DATABASE.MONGODB.HOST}
//   // :${APP_CONFIG.ENV.DATABASE.MONGODB.PORT}/${APP_CONFIG.ENV.DATABASE.MONGODB.NAME}`;
//   const connectionUri = 'mongodb://localhost:27017/ts-node-base';
//   connect(connectionUri);
//   connection.on('error', (err) => {
//     error('Could not connect to Mongodb: ', err);
//   });

//   connection.on('disconnected', () => {
//     error('Database has lost connection...');
//   });

//   connection.on('connected', () => {
//     success(
//       green(
//         `[Mongodb] "${APP_CONFIG.ENV.DATABASE.MONGODB.NAME}" has connected successfully!`
//       )
//     );
//   });

//   connection.on('reconnected', () => {
//     sAwait('Db has reconnected!');
//   });
// }

async function connectRedis() {
  client.on('error', (err) => {
    logger.error('Redis Client Error', err);
    process.exit();
  });

  client.on('connect', () =>
    logger.info(`[Database][Redis] Database has connected successfully!`)
  );
}

export const databaseConfig = (app: IServer): void => {
  const databaseOptions: ConnectionOptions = {
    type: 'postgres',
    host: APP_CONFIG.ENV.DATABASE.POSTGRES.HOST,
    port: APP_CONFIG.ENV.DATABASE.POSTGRES.PORT,
    username: APP_CONFIG.ENV.DATABASE.POSTGRES.USERNAME,
    password: APP_CONFIG.ENV.DATABASE.POSTGRES.PASSWORD,
    database: APP_CONFIG.ENV.DATABASE.POSTGRES.NAME,
    synchronize: true,
    entities: [join(__dirname, '../../modules/**/*.entity.{js,ts}')],
    logging: false,
    // connectTimeoutMS: 20000,
    // maxQueryExecutionTime: 20000,
    // logNotifications: true,
  };
  createConnection(databaseOptions)
    .then((connection) => {
      if (connection.isConnected) {
        logger.info(
          `[Database][${databaseOptions.type}] "${APP_CONFIG.ENV.DATABASE.POSTGRES.NAME}" has connected successfully!`
        );
        connectRedis();
        app.start();
      } else {
        logger.error(
          `[Database][${databaseOptions.type}] Database has lost connection.`
        );
      }
    })
    .catch((err) => {
      logger.error(
        `[Database][${databaseOptions.type}] Database connection error.`
      );
      logger.error(err);
      process.exit();
    });
};
