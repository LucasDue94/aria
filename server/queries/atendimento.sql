CREATE SERVER ambcor_dev FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'dev.hcal.lan', dbname 'hamb_dev', port '5432');
drop server ambcor_dev cascade;

CREATE USER MAPPING FOR aria SERVER ambcor_dev OPTIONS (user 'aria', password 'aria@123-hcor');

CREATE FOREIGN TABLE atendimento (
    id bigint not null,
    version bigint,
    cid_id varchar(255) not null,
    registro_atendimento_id varchar(255) not null,
    data_atendimento timestamp not null,
    conteudo text
    )
    SERVER ambcor_dev OPTIONS (table_name 'atendimento');
