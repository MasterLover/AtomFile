select *
from (

  select
    ID,
    PROC_INST_ID_,
    CREATOR__,
    PAY_STATUS,
    wf.*
  from (
         select
           ID__ ID,
           CREATOR__,
           PROC_INST_ID_,
           PAY_STATUS
         FROM F_DAILY_COST_FORM
         where PID__ is not null

         union

         select
           ID__ ID,
           CREATOR__,
           PROC_INST_ID_,
           PAY_STATUS
         FROM F_LOAN_FORM
         where PID__ is not null

         union
         select
           ID__ ID,
           CREATOR__,
           PROC_INST_ID_,
           PAY_STATUS
         FROM F_TRAVEL_FORM
         where PID__ is not null

         union
         select
           ID__ ID,
           CREATOR__,
           PROC_INST_ID_,
           PAY_STATUS
         FROM F_PAYMENT_FORM
         where PID__ is not null
       ) t
    join (
           select
             RES.ID_                                         TASK_ID_,
             RES.EXECUTION_ID_,
             p.PROC_INST_ID_                                 WF_PROC_INST_ID_,
             p.PROC_DEF_ID_,
             (select name_
              from ACT_RE_PROCDEF
              where id_ = p.PROC_DEF_ID_)                    PROC_DEF_NAME_,
             RES.NAME_                                       TASK_NAME_,
             RES.PARENT_TASK_ID_,
             RES.DESCRIPTION_,
             RES.TASK_DEF_KEY_,
             RES.OWNER_,
             RES.ASSIGNEE_,
             RES.PRIORITY_,
             TO_char(P.START_TIME_, 'YYYY-MM-DD HH24:MI:SS') CREATE_TIME_,
             RES.DUE_DATE_,
             RES.CATEGORY_,
             RES.TENANT_ID_,
             RES.FORM_KEY_
           from (select p.*
                 from ACT_HI_PROCINST p
                 where p.proc_inst_id_ in (select v.proc_inst_id_
                                           from ACT_HI_VARINST v
                                           where v.name_ = 'TASK_EXECUTOR_' and v.text_ = '222')) p left join
             (select *
              from ACT_HI_TASKINST t
              where t.end_time_ is null) RES on p.proc_inst_id_ = res.proc_inst_id_
         ) wf

      on t.proc_inst_id_ = wf.wf_proc_inst_id_

)


where PAY_STATUS = '1' and CREATOR__ = '222'
order by CREATE_TIME_ desc
