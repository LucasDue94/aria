/*REGISTRO DE ATENDIMENTO*/
create foreign table registro_atendimento
    (
        id varchar(9) options (key 'true') not null,
        data_entrada timestamp not null,
        data_alta timestamp not null,
        setor_id varchar(9),
        cid_id varchar(9),
        diagnostico varchar(70),
        motivo_alta_id varchar(9) not null,
        tipo char(1) not null ,
        paciente_id varchar(9) not null
    )
    server wpd
    options (table '(SELECT PAC.COD_PAC,
       TO_DATE(TO_CHAR(PAC.DATA_ENT, ''DD-MM-YYYY'') || '' '' || TO_CHAR(PAC.HORA_ENT, ''HH24:MI:SS''),
               ''DD-MM-YYYY HH24:MI:SS'')         AS DATA_ENT,
       DECODE(PAC.DATA_ALTA, NULL, NULL,
              TO_DATE(TO_CHAR(PAC.DATA_ALTA, ''DD-MM-YYYY'') || '' '' || TO_CHAR(PAC.HORA_ALTA, ''HH24:MI:SS''),
                      ''DD-MM-YYYY HH24:MI:SS'')) AS DATA_ALTA,
       CO.COD_SET,
       CID.PK_UR_CID,
       CID.DIAGNOSTICO,
       ALTA.COD_MOT_ALTA,
       PAC.TIPO_PAC,
       PAC.COD_PRT
    FROM ADMWPD.FAPACCAD PAC
         LEFT JOIN ADMWPD.MOTIVO_ALTA ALTA ON PAC.COD_MOT_ALTA = ALTA.COD_MOT_ALTA
         LEFT JOIN ADMWPD.FAPACCOM CO ON CO.COD_PAC = PAC.COD_PAC
         INNER JOIN ADMWPD.FAPRTCAD PRT ON PAC.COD_PRT = PRT.COD_PRT
         LEFT JOIN ADMWPD.URCIDCAD CID ON PAC.FK_UR_CID = CID.PK_UR_CID)', readonly 'true');

alter foreign table registro_atendimento owner to aria;



/*LEITO*/
create foreign table leito(
        id varchar(9) options (key 'true') not null,
        descricao varchar(70) not null,
        setor_id varchar(9) not null
    )
    server wpd
    options (table '(select LEI.LEITO, LEI.DESCRICAO, APT.COD_SET from ADMWPD.FALEICAD LEI inner join ADMWPD.FAAPTCAD APT on LEI.COD_APT = APT.COD_APT)', readonly 'true');

alter foreign table leito owner to aria;


/*REGISTRO ATENDIMENTO LEITOS*/
create foreign table registro_atendimento_leitos (
    registro_atendimento_id varchar(9) options (key 'true') not null,
    leito_id varchar(5) options (key 'true') not null,
    data_entrada timestamp not null
) server wpd
options (table '(select his.COD_PAC, his.LEITO,
       to_date(to_char(his.DATA, ''DD-MM-YYYY'') || '' '' || to_char(his.HORA, ''HH24:MI:SS''), ''DD-MM-YYYY HH24:MI:SS'') as data
from ADMWPD.FALEHCAD his)', readonly 'true');


/*SETOR*/
create foreign table setor
    (
        id varchar(9) options (key 'true') not null,
        descricao varchar(70) not null,
        tipo varchar(70) not null
        )
    server wpd
    options (table '(select COD_SET, DESCRICAO, TIPO_SETOR from ADMWPD.FASETCAD)', readonly 'true');

alter foreign table setor owner to aria;



/*COMANDA*/
create foreign table comanda
    (
        tipo varchar(9) options (key 'true') not null,
        comanda varchar(9) options (key 'true') not null,
        registro_atendimento_id varchar(9) not null,
        data_movimento timestamp not null,
        setor_id varchar(9) not null
        )
    server wpd
    options (table '(select TIPO_COMANDA, COMANDA, COD_PAC,
    TO_DATE(TO_CHAR(DATA_MOV, ''DD-MM-YYYY'') || '' '' || TO_CHAR(HORA_MOV, ''HH24:MI:SS''),
                   ''DD-MM-YYYY HH24:MI:SS'') AS DATA_MOV,
    SET_ORI from ADMWPD.FAMOVCAD)', readonly 'true');

alter foreign table comanda owner to aria;



/*CID*/
create foreign table cid
    (
        id varchar(9) options (key 'true') not null,
        codigo varchar(9) not null,
        diagnostico varchar(250) not null
        )
    server wpd
    options (table '(select CID.PK_UR_CID, CID.COD_CID, CID.DIAGNOSTICO from ADMWPD.URCIDCAD CID)', readonly 'true');

alter foreign table cid owner to aria;



/*PACIENTE*/
create foreign table paciente
    (
        id varchar(9) options (key 'true') not null,
        nome varchar(70) not null,
        sexo char not null,
        nascimento date not null,
        nome_mae varchar(70) not null
        )
    server wpd
    options (table '(select PRT.COD_PRT, PRT.NOME_PAC, PRT.SEXO, to_char(PRT.NASCIMENTO, ''DD-MM-YYYY'') AS nascimento, PRT.NOME_MAE
FROM ADMWPD.FAPRTCAD PRT)', readonly 'true');

alter foreign table paciente owner to aria;

/*MOTIVO DA ALTA*/
create foreign table motivo_alta
    (
        id varchar(9) options (key 'true') not null,
        descricao varchar(70) not null
        )
    server wpd
    options (table '(select ALTA.COD_MOT_ALTA, ALTA.DSC_MOT_ALTA from ADMWPD.MOTIVO_ALTA ALTA)', readonly 'true');

alter foreign table motivo_alta owner to aria;

/*MOTIVO DA ALTA*/
create foreign table exame (
    id varchar(9) options (key 'true') not null,
    registro_id varchar(9),
    setor_id varchar(4) not null
) server wpd options (table '(select exa.COD_PRT_PROV,
       exa.COD_PAC,
       sal.SETOR_COMANDA
from ADMWPD.IMAGNEXA exa
    inner join ADMWPD.IMAGNCAD agn on agn.COD_AGENDA = exa.COD_AGENDA
    inner join ADMWPD.IMSALCAD sal on agn.COD_UNI = sal.COD_UNI and agn.COD_SALA = sal.COD_SALA)', readonly 'true');

alter foreign table exame owner to aria;
