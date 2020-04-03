drop foreign table registro_atendimento;
/*REGISTRO DE ATENDIMENTO*/
create foreign table registro_atendimento
    (
        id varchar(9) options (key 'true') not null,
        data_entrada timestamp not null,
        data_alta timestamp not null,
        setor_id varchar(9),
        cid_id varchar(9),
        motivo_alta_id varchar(9) not null,
        tipo char(1) not null ,
        paciente_id varchar(9) not null
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
       COM.COD_SET,
       CID.COD_CID,
       PAC.COD_MOT_ALTA,
       PAC.TIPO_PAC,
       PAC.COD_PRT
from ADMWPD.FAPACCAD PAC
         LEFT JOIN ADMWPD.FAPACCOM COM ON COM.COD_PAC = PAC.COD_PAC
         LEFT JOIN ADMWPD.URCIDCAD CID ON CID.PK_UR_CID = PAC.FK_UR_CID)', readonly 'true');

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


drop foreign table registro_atendimento_leito;
/*REGISTRO ATENDIMENTO LEITO*/
create foreign table registro_atendimento_leito (
    registro_atendimento_id varchar(9) options (key 'true') not null,
    leito_id varchar(9) options (key 'true') not null,
    data_entrada timestamp not null
) server wpd
options (table '(select his.COD_PAC, his.LEITO,
       to_date(to_char(his.DATA, ''DD-MM-YYYY'') || '' '' || to_char(his.HORA, ''HH24:MI:SS''), ''DD-MM-YYYY HH24:MI:SS'') as data
from ADMWPD.FALEHCAD his inner join ADMWPD.FALEICAD lei on lei.LEITO = his.LEITO inner join ADMWPD.FAAPTCAD apt on lei.COD_APT = apt.COD_APT)', readonly 'true');


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


drop foreign table cid;
/*CID*/
create foreign table cid
    (
        id varchar(9) options (key 'true') not null,
        diagnostico varchar(250) not null
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

create foreign table cirurgia (
    id varchar(6) options (key 'true') not null,
    registro_atendimento_id varchar(9),
    cancelada boolean
) server wpd options (table '(select CD_CIRU_REALIZADA, COD_PAC, decode(MOT_CANCELAMENTO, null, 0, 1) as cancelada from admwpd.BLCIRU_REALIZADA)');
