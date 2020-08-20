/* -- Ambcor -- */
CREATE SERVER ambcor_dev FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'dev.hcal.lan', dbname 'hamb_dev', port '5432');
drop server ambcor_dev cascade;
/*CREATE USER MAPPING FOR aria SERVER ambcor_dev OPTIONS (user 'aria', password 'aria@123-hcor');
*/CREATE USER MAPPING FOR aria SERVER ambcor OPTIONS (user 'aria', password 'aria@123-hcor');
/* --/ Ambcor -- */

drop foreign table atendimento;
/* -- ATENDIMENTO -- */
create foreign table atendimento
    (
        id varchar(9) options (key 'true') not null,
        data_entrada timestamp not null,
        data_alta timestamp not null,
        data_alta_medica timestamp,
        setor_id varchar(9),
        cid_id varchar(9),
        motivo_alta_id varchar(9) not null,
        tipo char(1) not null ,
        paciente_id varchar(9) not null,
        convenio_id varchar(3)
        )
    server wpd
    options (table '(select PAC.COD_PAC,
       TO_DATE(TO_CHAR(PAC.DATA_ENT, ''DD-MM-YYYY'') || '' '' || TO_CHAR(PAC.HORA_ENT, ''HH24:MI:SS''),
               ''DD-MM-YYYY HH24:MI:SS'') AS DATA_ENT,
       case
           when pac.data_alta is not null then
               TO_DATE(TO_CHAR(PAC.DATA_ALTA, ''DD-MM-YYYY'') || '' '' || TO_CHAR(PAC.HORA_ALTA, ''HH24:MI:SS''),
                       ''DD-MM-YYYY HH24:MI:SS'')
           else null
       end                          AS DATA_ALTA,
       PAC.DATA_ALTA_MEDICA,
       COM.COD_SET,
       CID.COD_CID,
       PAC.COD_MOT_ALTA,
       PAC.TIPO_PAC,
       PAC.COD_PRT,
       PAC.COD_CON
    from ADMWPD.FAPACCAD PAC
         LEFT JOIN ADMWPD.FAPACCOM COM ON COM.COD_PAC = PAC.COD_PAC
         LEFT JOIN ADMWPD.URCIDCAD CID ON CID.PK_UR_CID = PAC.FK_UR_CID)', readonly 'true');


alter foreign table atendimento owner to aria;

drop foreign table Consulta;

CREATE FOREIGN TABLE Consulta (
    id bigint not null,
    version bigint,
    cid_id varchar(255) not null,
    atendimento_id varchar(255) options(column_name 'registro_atendimento_id') not null,
    data_atendimento timestamp not null,
    conteudo text
    )
    SERVER ambcor_dev OPTIONS (table_name 'atendimento');


/*LEITO*/
drop foreign table leito;

create foreign table leito(
        id varchar(9) options (key 'true') not null,
        descricao varchar(70) not null,
        setor_id varchar(9) not null,
        tipo varchar(20),
        atendimento_id varchar(9),
        unidade varchar(6),
        data_desativacao timestamp
    )
    server wpd
    options (table '(select LEI.LEITO, LEI.DESCRICAO, APT.COD_SET, TIPO_LEI.DESCRICAO as TIPO, LEI.COD_PAC, CEL.COD_UNIDADE, LEI.DESATIVADO as data_desativacao
                    from ADMWPD.FALEICAD LEI
                    inner join ADMWPD.FAAPTCAD APT on LEI.COD_APT = APT.COD_APT
                    inner join ADMWPD.FALETCAD TIPO_LEI on LEI.TIPO = TIPO_LEI.COD_TIPO
                    inner join ADMWPD.FASETCAD SE on APT.COD_SET = SE.COD_SET
                    inner join ADMWPD.FACELCAD CEL on CEL.COD_CEL = SE.COD_CEL)', readonly 'true');

alter foreign table leito owner to aria;


/*REGISTRO LEITO*/
drop foreign table registro_leito;

create foreign table registro_leito (
    id bigint options (key 'true') not null,
    atendimento_id varchar(9) not null,
    leito_id varchar(9) not null,
    data_entrada timestamp not null
) server wpd
options (table '(select his.ID_REG, his.COD_PAC, his.LEITO,
       to_date(to_char(his.DATA, ''DD-MM-YYYY'') || '' '' || to_char(his.HORA, ''HH24:MI:SS''), ''DD-MM-YYYY HH24:MI:SS'') as data
from ADMWPD.FALEHCAD his inner join ADMWPD.FALEICAD lei on lei.LEITO = his.LEITO inner join ADMWPD.FAAPTCAD apt on lei.COD_APT = apt.COD_APT)', readonly 'true');


/*SETOR*/
create schema wpd;

drop foreign table wpd.setor_wpd;

create foreign table wpd.setor_wpd
    (
        id varchar(9) options (key 'true') not null,
        descricao varchar(70) not null,
        tipo varchar(70) not null
        )
    server wpd
    options (table '(select COD_SET, DESCRICAO, TIPO_SETOR from ADMWPD.FASETCAD WHERE COD_CEL = ''001'' )', readonly 'true');

alter foreign table wpd.setor_wpd owner to aria;



/*COMANDA*/
create foreign table comanda
    (
        tipo varchar(9) options (key 'true') not null,
        comanda varchar(9) options (key 'true') not null,
        atendimento_id varchar(9) not null,
        data_movimento timestamp not null,
        setor_id varchar(9) not null
        )
    server wpd
    options (table '(select TIPO_COMANDA, COMANDA, COD_PAC,
     ,
                   ''DD-MM-YYYY HH24:MI:SS'') AS DATA_MOV,
    SET_ORI from ADMWPD.FAMOVCAD)', readonly 'true');

alter foreign table comanda owner to aria;


drop foreign table cid;
/*CID*/
create foreign table cid
    (
        id varchar(9) options (key 'true') not null,
        descricao varchar(250) not null
        )
    server wpd
    options (table '(select CID.COD_CID, CID.DIAGNOSTICO from ADMWPD.URCIDCAD CID)', readonly 'true');

alter foreign table cid owner to aria;



/*PACIENTE*/
drop foreign table paciente;
create foreign table paciente
    (
        id varchar(9) options (key 'true') not null,
        nome varchar(70) not null,
        sexo char not null,
        nascimento date not null,
        nome_mae varchar(70) not null
        )
    server wpd
    options (table '((select PRT.COD_PRT, PRT.NOME_PAC, PRT.SEXO, PRT.NASCIMENTO, PRT.NOME_MAE FROM ADMWPD.FAPRTCAD PRT))', readonly 'true');

alter foreign table paciente owner to aria;

/*MOTIVO DA ALTA*/
create foreign table motivo_alta
    (
        id varchar(9) options (key 'true') not null,
        descricao varchar(70) not null,
        classificacao varchar(1)
        )
    server wpd
    options (table '(select ALTA.COD_MOT_ALTA, ALTA.DSC_MOT_ALTA, ALTA.CLAS_MOT_ALTA from ADMWPD.MOTIVO_ALTA ALTA)', readonly 'true');

alter foreign table motivo_alta owner to aria;

/*EXAME*/
drop foreign table exame;

create foreign table exame (
    id varchar(9) options (key 'true') not null,
    atendimento_id varchar(9),
    setor_id varchar(4) not null
) server wpd options (table '(select exa.COD_PRT_PROV,
       exa.COD_PAC,
       sal.SETOR_COMANDA
from ADMWPD.IMAGNEXA exa
    inner join ADMWPD.IMAGNCAD agn on agn.COD_AGENDA = exa.COD_AGENDA
    inner join ADMWPD.IMSALCAD sal on agn.COD_UNI = sal.COD_UNI and agn.COD_SALA = sal.COD_SALA)', readonly 'true');

alter foreign table exame owner to aria;

drop foreign table cirurgia;

create foreign table cirurgia (
    id varchar(6) options (key 'true') not null,
    atendimento_id varchar(9),
    cancelada boolean
) server wpd options (table '(select CD_CIRU_REALIZADA, COD_PAC, decode(MOT_CANCELAMENTO, null, 0, 1) as cancelada from admwpd.BLCIRU_REALIZADA)');

drop foreign table cirurgia;

create foreign table reserva_leito (
    id varchar(6) options (key 'true') not null,
    data_inicio timestamp,
    data_fim timestamp,
    tipo varchar(1),
    leito_id varchar(9) not null
) server wpd options (table '(select COD_RSV,
       to_date(to_char(DATA_INICIAL, ''DD-MM-YYYY'') || '' '' || to_char(HORA_INICIAL, ''HH24:MI:SS''),
               ''DD-MM-YYYY HH24:MI:SS'') as data_inicio,
       to_date(to_char(DATA_FINAL, ''DD-MM-YYYY'') || '' '' || to_char(HORA_FINAL, ''HH24:MI:SS''),
               ''DD-MM-YYYY HH24:MI:SS'') as data_fim,
       TIPO_RSV, leito
from ADMWPD.RCRSVCAD where TIPO_RSV = ''L'')');

drop foreign table reserva_leito;

create foreign table interdicao_leito (
    id varchar(6) options (key 'true') not null,
    data_inicio timestamp,
    data_fim timestamp,
    leito_id varchar(9) not null
    ) server wpd options (table '(select COD_INT,
       to_date(to_char(DATA_INI, ''DD-MM-YYYY'') || '' '' || to_char(HORA_INI, ''HH24:MI:SS''),
               ''DD-MM-YYYY HH24:MI:SS'') as data_inicio,
       to_date(to_char(DATA_FIN, ''DD-MM-YYYY'') || '' '' || to_char(HORA_FIN, ''HH24:MI:SS''),
               ''DD-MM-YYYY HH24:MI:SS'') as data_fim,
       leito
from ADMWPD.RCINTCAD)');

drop foreign table interdicao_leito;

create foreign table higienizacao_leito (
    leito_id varchar(5) not null,
    data_abertura timestamp,
    status varchar(1),
    atendimento_id varchar(7)
    ) server wpd options (table '(select LEITO, DATA_HORA_ABERTURA, STATUS_ATUAL, COD_PAC from ADMWPD.LIMPEZA_LEITO)');

drop foreign table higienizacao_leito;

create foreign table convenio (
    id varchar(3) not null,
    fantasia varchar(15)
    ) server wpd options (table '(select COD_CON, FANTASIA from ADMWPD.FACONCAD)');

drop foreign table convenio;




