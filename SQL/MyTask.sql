select
  ID__,
  PID__,
  PROC_INST_ID_,
  CREATE_DATE,
  (select ITEMVALUE
   from T_SYS_CONST
   where CATACODE = 'task_type' and ITEMCODE = TASK_TYPE) TASK_TYPE,
  (select ITEMVALUE
   from T_SYS_CONST
   where CATACODE = 'work_type' and ITEMCODE = WORK_TYPE) WORK_TYPE,
  USER_NAME                                               CREATOR__,
  '这里查环节'                                                 STEP,
  CASE WHEN t.MAIN_TASK IS NULL
    THEN '无'
  WHEN t.MAIN_TASK = '0'
    THEN '无'
  ELSE (SELECT P.subject
        FROM f_task_publish P
        WHERE P.proc_inst_id_ = T.main_task) end          MAIN_TASK,
  SUBJECT,
  PATICIPANT,
  status

from f_task_publish t
where 1 = 1 and PATICIPANT like '%王恒  %' and PID__ is null
order by CREATE_DATE desc
