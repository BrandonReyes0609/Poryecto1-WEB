FROM postgres:latest

COPY ./src/api/db/schema.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_USER=u4eksis8dnhmm3
ENV POSTGRES_PASSWORD=pf3f0c104763c37ac94c02ddbdbed871e9e490199d63681bed928377611aeee74

EXPOSE 5432
