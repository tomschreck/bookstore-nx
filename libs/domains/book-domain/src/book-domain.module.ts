import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from './1_application';
import { InfrastructureModule } from "./2_infrastructure";
import { UseCasesModule } from './3_use-cases';

@Module({
  imports:
    [
      TypeOrmModule.forRootAsync({
        imports: [ ConfigModule ],
        inject: [ ConfigService ],
        useFactory: (configService: ConfigService) => ({
          type: "postgres",
          host: configService.get("POSTGRES_HOST"),
          port: configService.get("POSTGRES_PORT"),
          database: configService.get("POSTGRES_DATABASE"),
          username: configService.get("POSTGRES_USERNAME"),
          password: configService.get("POSTGRES_PASSWORD"),
          synchronize: true,
          autoLoadEntities: true,
          entities: [ "dist/**/*.entity{ .ts,.js}" ]
        }),
      }),
      CqrsModule,
      ApplicationModule,
      InfrastructureModule,
      UseCasesModule,
    ],
  controllers: [],
  providers: [],
  exports: [ UseCasesModule ],
})
export class BookDomainModule { }
