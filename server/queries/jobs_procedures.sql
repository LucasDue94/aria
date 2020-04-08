-- https://github.com/citusdata/pg_cron

-- on PostgreSQL 9.x, do this instead:
CREATE EXTENSION pg_cron VERSION '1.0';
ALTER EXTENSION pg_cron UPDATE;

-- optionally, grant usage to regular users:
GRANT USAGE ON SCHEMA cron TO aria;

-- List cron jobs
SELECT * FROM cron.job;

-- Create job to update aria.setores table from wpd every hour
SELECT cron.schedule(
  '0 * * * *',
  $$INSERT INTO setor (id, descricao) SELECT sw.id, sw.descricao
         FROM wpd.setor_wpd sw
                  LEFT JOIN setor s ON sw.id = s.id
         WHERE s.id IS NULL$$
);


-- Update setor table from wpd
INSERT INTO setor (id, descricao) SELECT sw.id, sw.descricao
         FROM wpd.setor_wpd sw
                  LEFT JOIN setor s ON sw.id = s.id
         WHERE s.id IS NULL;


SELECT sw.id, sw.descricao
FROM wpd.setor_wpd sw
         LEFT JOIN setor s ON sw.id = s.id WHERE s.id IS NULL;

-- Stop screduled job
select cron.unschedule(5);

-- drop table tipo_incidente_risco cascade;



-- create function update_setores() returns integer
-- as $$
--     begin
--         insert into foo values (to_char(current_date));
--         return 0;
--     end;
-- $$ language plpgsql;
--
-- select update_setores();





