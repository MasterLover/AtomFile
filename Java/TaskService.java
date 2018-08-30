package com.wisdragon.erp.task.service;

import com.asgi.mis.framework.common.VTools;
import com.asgi.mis.framework.system.entity.T_SYS_USER;
import com.wisdragon.erp.workflow.service.CommonService;
import com.wisdragon.erp.workflow.service.SubProcessService;
import com.wisdragon.framework.service.GlobalService;
import com.wisdragon.pfs.sysform.core.entity.FORM_FIELD;
import com.wisdragon.pfs.sysform.core.entity.FORM_MODEL;
import com.wisdragon.pfs.sysform.core.service.OraclePersistenceService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.activiti.engine.delegate.DelegateExecution;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by penghao on 2018/1/31.
 */
@Service("TaskService")
@Scope("request")
public class TaskService extends OraclePersistenceService {

    @Resource(name = "commonService")
    private CommonService commonService;

    @Resource(name = "GlobalService")
    private GlobalService globalService;

    @Resource(name = "SubProcessService")
    private SubProcessService subProcessService;

    /**
     * 获取任务参与者 ${TaskService.getParticipant(execution)}
     *
     * @param execution
     */
    @Transactional
    public void getParticipant(DelegateExecution execution) throws Exception {
        //获取任务参与人姓名
        String participant = execution.getVariable("paticipant").toString().replace("@", "");
        //获取任务参与人id
        String userId = commonService.getUserInfoByUserName(participant).getID();
        //获取任务参与人的角色
        List<String> roleIds = commonService.getRolesIdByUserId(userId);
        String pid = commonService.getRolesPid(roleIds, "t_sys_role_auth");
        execution.setVariable("participantId", userId);
        List<String> loginRoleIds = commonService.getRolesIdByUserId(super.getLoginInfo().getUser().getID());
        boolean flag = true;
        for (int i = 0; i < loginRoleIds.size(); i++) {
            if (pid.equals(loginRoleIds.get(i))) {
                flag = false;
            }
        }
        if (flag) {
            execution.setVariable("directorId", pid);
        } else {
            execution.setVariable("directorId", null);
        }
    }

    /**
     * 获取任务参与者 ${TaskService.updateMainFlowStatus(execution)}
     *
     * @param execution
     */
    @Transactional
    public void updateMainFlowStatus(DelegateExecution execution) throws Exception {
        //获取任务参与人姓名
        String prodId = execution.getProcessInstanceId();
        String update = "update f_task_publish set status = '3' where proc_inst_id_ = ?";
        super.update(update, prodId);
    }

    /**
     * 根据流程启动者身份获取售前采购任务发布的流程类型
     * ${TaskService.getPresalesPurchaseTaskType(execution)}
     *
     * @param execution
     */
    @Transactional
    public void getPresalesPurchaseTaskType(DelegateExecution execution) throws Exception {
        //获取流程启动者id
        String creatorId = commonService.getCreatorIdByProc(execution.getProcessInstanceId());
        //获取流程启动者所占角色id
        List<String> roleIds = commonService.getRolesIdByUserId(creatorId);
        int type = 0;

        for (int i = 0; i < roleIds.size(); i++) {
            if (commonService.getPropertyValueByKey("presalesDirector").equals(roleIds.get(i))) {//方案中心总监
                type = 1;
            }
            if (commonService.getPropertyValueByKey("productDirector").equals(roleIds.get(i))) {//产品中心总监
                type = 2;
            }
            if (commonService.getPropertyValueByKey("VPDevelopment").equals(roleIds.get(i))) {//副总裁（研发）
                type = 3;
            }
        }
        execution.setVariable("type", type);
        //获取任务参与人及其直属上级并转为流程变量
        getParticipant(execution);
    }

    /**
     * 根据流程启动者身份获取销售采购任务发布的流程类型
     * ${TaskService.getSalesPurchaseTaskType(execution)}
     *
     * @param execution
     */
    @Transactional
    public void getSalesPurchaseTaskType(DelegateExecution execution) throws Exception {
        //获取流程启动者id
        String creatorId = commonService.getCreatorIdByProc(execution.getProcessInstanceId());
        //获取流程启动者所占角色id
        List<String> roleIds = commonService.getRolesIdByUserId(creatorId);
        int type = 0;

        for (int i = 0; i < roleIds.size(); i++) {
            if (commonService.getPropertyValueByKey("VPSales").equals(roleIds.get(i))) {//副总裁（销售）
                type = 1;
            }
        }
        execution.setVariable("type", type);
        //获取任务参与人及其直属上级并转为流程变量
        getParticipant(execution);
    }

    /**
     * 根据流程启动者身份获取产品采购任务发布的流程类型
     * ${TaskService.getProductPurchaseTaskType(execution)}
     *
     * @param execution
     */
    @Transactional
    public void getProductPurchaseTaskType(DelegateExecution execution) throws Exception {
        //获取流程启动者id
        String creatorId = commonService.getCreatorIdByProc(execution.getProcessInstanceId());
        //获取流程启动者所占角色id
        List<String> roleIds = commonService.getRolesIdByUserId(creatorId);
        int type = 0;

        for (int i = 0; i < roleIds.size(); i++) {
            if (commonService.getPropertyValueByKey("productDirector").equals(roleIds.get(i))) {//产品中心总监
                type = 1;
            }
            if (commonService.getPropertyValueByKey("VPDevelopment").equals(roleIds.get(i))) {//副总裁（研发）
                type = 2;
            }
        }
        execution.setVariable("type", type);
        //获取任务参与人及其直属上级并转为流程变量
        getParticipant(execution);
    }

    /**
     * 根据流程启动者身份获取交付采购任务发布的流程类型
     * ${TaskService.getDeliveryPurchaseTaskType(execution)}
     *
     * @param execution
     */
    @Transactional
    public void getDeliveryPurchaseTaskType(DelegateExecution execution) throws Exception {
        //获取流程启动者id
        String creatorId = commonService.getCreatorIdByProc(execution.getProcessInstanceId());
        //获取流程启动者所占角色id
        List<String> roleIds = commonService.getRolesIdByUserId(creatorId);
        int type = 0;

        for (int i = 0; i < roleIds.size(); i++) {
            if (commonService.getPropertyValueByKey("VPDelivery").equals(roleIds.get(i))) {//副总裁（交付）
                type = 1;
            }
        }
        execution.setVariable("type", type);
        //获取任务参与人及其直属上级并转为流程变量
        getParticipant(execution);
    }

    /**
     * 根据流程启动者身份获取行政采购任务发布的流程类型
     * ${TaskService.getDeliveryPurchaseTaskType(execution)}
     *
     * @param execution
     */
    @Transactional
    public void getAdministrationPurchaseTaskType(DelegateExecution execution) throws Exception {
        //获取流程启动者id
        String creatorId = commonService.getCreatorIdByProc(execution.getProcessInstanceId());
        //获取流程启动者所占角色id
        List<String> roleIds = commonService.getRolesIdByUserId(creatorId);
        int type = 0;

        for (int i = 0; i < roleIds.size(); i++) {
            if (commonService.getPropertyValueByKey("CEO").equals(roleIds.get(i))) {//总裁
                type = 1;
            }
            if (commonService.getPropertyValueByKey("hr").equals(roleIds.get(i)) //人事成员
                    || !commonService.getPropertyValueByKey("HRD").equals(roleIds.get(i))) { //人事行政经理
                type = 2;
            }
            if (commonService.getPropertyValueByKey("cf").equals(roleIds.get(i)) //财务成员
                    || !commonService.getPropertyValueByKey("CFO").equals(roleIds.get(i))) { //财务经理
                type = 3;
            }
        }

        execution.setVariable("type", type);
        //获取任务参与人及其直属上级并转为流程变量
        getParticipant(execution);
    }

    /**
     * 根据流程启动者身份获取公司级会议采购任务发布的流程类型
     * ${TaskService.getCompanyPurchaseTaskType(execution)}
     *
     * @param execution
     */
    @Transactional
    public void getCompanyPurchaseTaskType(DelegateExecution execution) throws Exception {
        //获取流程启动者id
        String creatorId = commonService.getCreatorIdByProc(execution.getProcessInstanceId());
        //获取流程启动者所占角色id
        List<String> roleIds = commonService.getRolesIdByUserId(creatorId);
        int type = 0;

        for (int i = 0; i < roleIds.size(); i++) {
            if (commonService.getPropertyValueByKey("CEO").equals(roleIds.get(i))) {//总裁
                type = 1;
            }
        }
        execution.setVariable("type", type);
        //获取任务参与人及其直属上级并转为流程变量
        getParticipant(execution);
    }

    /**
     * 根据获取任务参与人、审定人及验收人信息 ${TaskService.getPeople(execution)}
     *
     * @param execution
     */
    @Transactional
    public void getPeople(DelegateExecution execution) throws Exception {
        //获取任务参与人姓名
        String participant = execution.getVariable("paticipant").toString().replace("@", "");
        //获取任务参与人id
        String participantId = commonService.getUserInfoByUserName(participant).getID();
        //获取任务审定人姓名
        String responsibilityUser = execution.getVariable("responsibility_user").toString().replace("@", "");
        //获取任务审定人id
        String responsibilityUserId = commonService.getUserInfoByUserName(responsibilityUser).getID();
        //获取任务验收人姓名
        String[] copyToUsers = execution.getVariable("copy_to_user").toString().split("@");
        List<String> assigneeList = new ArrayList<>();
        for (String assignee : copyToUsers) {
            if (!VTools.StringIsNullOrSpace(assignee)) {
                assigneeList.add(commonService.getUserInfoByUserName(assignee).getID());
            }

        }

        execution.setVariable("participantId", participantId);
        execution.setVariable("responsibilityUserId", responsibilityUserId);
        execution.setVariable("assigneeList", assigneeList);
        execution.setVariable("agreeNum", 0);
    }


    /**
     * 根据获取任务参与人、审定人及验收人信息 ${TaskService.summaryAgreeCount(execution)}
     *
     * @param execution
     */
    @Transactional
    public void summaryAgreeCount(DelegateExecution execution) throws Exception {

        String isAgree = execution.getVariable("IS_AGREE").toString();
        int agreeNum = Integer.valueOf(execution.getVariable("agreeNum").toString());
        if ("1".equals(isAgree)) {
            agreeNum++;
        }
    }

    /**
     * 服务下拉框获取主任务
     *
     * @return
     */
    @Transactional
    public List<Map> queryMainTask() {
        List<Map> mainTaskList = new ArrayList<>();

        String sql = " select proc_inst_id_, subject from f_task_publish where task_type = 'main_task' and "
                + " status = '1' and paticipant like '%" + super.getLoginInfo().getUser().getNAME() + "%'";
        List<Map> list = super.sqlQuery(sql);

        if (VTools.ListIsNullOrEmpty(list)) {
            Map map = new HashMap<>();
            map.put("value", "0");
            map.put("text", "没有需要您参与的任务");
            mainTaskList.add(map);
        }

        for (int i = 0; i < list.size(); i++) {
            String value = list.get(i).get("PROC_INST_ID_").toString();
            String text = list.get(i).get("SUBJECT").toString();
            Map map = new HashMap<>();
            map.put("value", value);
            map.put("text", text);
            mainTaskList.add(map);
        }
        return mainTaskList;
    }

    /**
     * 服务下拉框获取工作类型
     *
     * @return
     */
    @Transactional
    public List<Map> queryWorkType() {
        return commonService.queryConst("work_type");
    }

    /**
     * 服务下拉框获取任务类型
     *
     * @return
     */
    @Transactional
    public List<Map> queryTaskType() {
        return commonService.queryConst("task_type");
    }

    /**
     * 服务下拉框获取优先级
     *
     * @return
     */
    @Transactional
    public List<Map> queryPriority() {
        return commonService.queryConst("priority");
    }

    /**
     * 查询合同号
     *
     * @return
     */
    @Transactional
    public JSONObject queryContractCode() {
        String projectCode = super.getSurestream().getString("projectCode");
        String sql = "select case when t.contract_code is null then '无合同' else t.contract_code "
                + " end contract_code, customer_name from wd_erp_project t where project_code = ?";
        List<Map> list = super.sqlQuery(sql, projectCode);
        JSONObject jsonObject = new JSONObject();
        if (!VTools.ListIsNullOrEmpty(list)) {
            jsonObject.put("contractCode", list.get(0).get("CONTRACT_CODE").toString());
            jsonObject.put("customerName", list.get(0).get("CUSTOMER_NAME").toString());
        }

        return jsonObject;
    }

    /**
     * 根据条件查询任务列表
     *
     * @return
     */
    @Transactional
    public Map queryTask() {
        //获取查询条件
        String mainTask = super.getSurestream().getString("mainTask");
        String status = super.getSurestream().getString("status");
        String taskType = super.getSurestream().getString("taskType");
        String workType = super.getSurestream().getString("workType");
        String userName = super.getSurestream().getString("userName");
        String type = super.getSurestream().getString("type");

        StringBuffer sql = new StringBuffer("select ID__, PROC_INST_ID_, SUBJECT, USER_NAME, DEPARTMENT, "
                + " CASE WHEN t .MAIN_TASK IS NULL THEN '无' WHEN t .MAIN_TASK = '0' THEN '无' ELSE (  "
                + " SELECT P .subject FROM f_task_publish P WHERE P .proc_inst_id_ = T .main_task ) end MAIN_TASK,"
                + " START_DATE, END_DATE  from f_task_publish t  where 1=1 ");

        if ("myTask".equals(type)) {
            sql = getSql();
        }

        if (!VTools.StringIsNullOrSpace(status)) {
            sql.append(" and status = '").append(status).append("' ");
        } else {
            sql.append(" and status is null ");
        }
        if (!VTools.StringIsNullOrSpace(taskType)) {
            sql.append(" and task_type = '").append(taskType).append("' ");
        }
        if (!VTools.StringIsNullOrSpace(mainTask)) {
            sql.append(" and main_task = '").append(mainTask).append("' ");
        }
        if (!VTools.StringIsNullOrSpace(workType)) {
            sql.append(" and work_type = '").append(workType).append("' ");
        }
        if (!VTools.StringIsNullOrSpace(userName)) {
            sql.append(" and paticipant like '%").append(userName).append("%' ");
        }
//        sql.append("order by create_date asc");

        return super.wisdragonPageQuery(sql.toString());
    }

    public StringBuffer getSql() {
        String sq = "SELECT * FROM ( " +
                "    SELECT ID__, PROC_INST_ID_, SUBJECT, USER_NAME, DEPARTMENT,CREATOR__,\n" +
                "    CASE WHEN T .MAIN_TASK IS NULL THEN '无' WHEN T .MAIN_TASK = '0' THEN '无'\n" +
                "    ELSE ( SELECT P .subject FROM f_task_publish P WHERE P .proc_inst_id_ = T .main_task )\n" +
                "    END MAIN_TASK,  START_DATE, END_DATE, paticipant, status, create_date " +
                "  FROM f_task_publish T WHERE 1 = 1 AND status IS NULL AND paticipant LIKE '%" +
                super.getLoginInfo().getUser().getNAME() + "%') t";

        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT * from ( ").append(sq).append(" LEFT JOIN (                         ");
        sql.append(" SELECT DISTINCT RES.ID_ TASK_ID_, RES.PROC_INST_ID_ WF_PROC_INST_ID_,      \n");
        sql.append("        RES.PROC_DEF_ID_, RES.TASK_DEF_KEY_, RES.ASSIGNEE_ FROM (           \n");
        sql.append("            SELECT * FROM ACT_RU_TASK WHERE SUSPENSION_STATE_ = 1 ) RES     \n");
        sql.append("            JOIN ACT_RE_PROCDEF procdef ON procdef.ID_ = RES.Proc_Def_Id_   \n");
        sql.append("        ) wf ON t.PROC_INST_ID_ = wf.WF_PROC_INST_ID_                       \n");
        sql.append(" ) WHERE ( proc_inst_id_ IS NULL AND CREATOR__ = '").append(super.getLoginInfo().getUser().getID());
        sql.append("' ) OR assignee_ = '").append(super.getLoginInfo().getUser().getID()).append("'  \n ");
        sql.append(" UNION                                                                      ");
        sql.append(" SELECT * from ( ").append(sq).append(" JOIN (                              \n");
        sql.append(" SELECT DISTINCT RES.ID_ TASK_ID_, RES.PROC_INST_ID_ WF_PROC_INST_ID_,      \n");
        sql.append("        RES.PROC_DEF_ID_, RES.TASK_DEF_KEY_, RES.ASSIGNEE_   FROM  (        \n");
        sql.append("            SELECT * FROM ACT_RU_TASK WHERE SUSPENSION_STATE_ = 1 ) RES     \n");
        sql.append("            INNER JOIN ACT_RU_IDENTITYLINK I ON I.TASK_ID_ = RES.ID_        \n");
        sql.append("                  JOIN ACT_RE_PROCDEF procdef ON procdef.ID_ = RES.Proc_Def_Id_  \n");
        sql.append("                  WHERE RES.ASSIGNEE_ IS NULL AND I.TYPE_ = 'candidate'     \n");
        sql.append(" AND ( I.User_Id_ = '").append(super.getLoginInfo().getUser().getID()).append("' ");
        sql.append(" OR I.Group_Id_ IN ( select r.roleid from t_sys_user_role r where  ");
        sql.append("    r.userid = '").append(super.getLoginInfo().getUser().getID()).append("' ");
        sql.append(" OR I.ORG_ID_ = (select u.orgid from t_sys_user u where                     ");
        sql.append("    u.id = '").append(super.getLoginInfo().getUser().getID()).append("' ))) \n");
        sql.append(" ) wf ON T .proc_inst_id_ = wf.WF_PROC_INST_ID_ )   where 1 = 1             ");

        return sql;
    }


    /**
     * 查询主线任务列表
     *
     * @return
     */
    @Transactional
    public JSONObject queryMainTaskList() {
        JSONObject jsonObject = new JSONObject();
        StringBuffer sql = new StringBuffer();
        sql.append(" select * from f_task_publish where task_type = 'main_task' and (status = '1' or status is null)");
        List<Map> list = super.sqlQuery(sql.toString());
        if (VTools.ListIsNullOrEmpty(list)) {
            return null;
        }
        jsonObject.put("mainTask", JSONArray.fromObject(list));
        return jsonObject;
    }

    /**
     * 查询主任务下拉
     *
     * @return
     */
    @Transactional
    public JSONObject queryMainTaskSelect() {
        JSONObject jsonObject = new JSONObject();
        StringBuffer sql = new StringBuffer();
        sql.append(" select\n" +
                "  proc_inst_id_,\n" +
                "  subject\n" +
                "from f_task_publish\n" +
                "where\n" +
                "  task_type = 'main_task'\n" +
                "  and PID__ is not null\n" +
                "  and\n" +
                "  (status = '1' or status is null)\n" +
                "  and PATICIPANT like '%' || ? || '%' ");
        String username = super.getSurestream().getString("username");
        List<Map> list = super.sqlQuery(sql.toString(), username);
        for (int i = 0; i < list.size(); i++) {
            jsonObject.put(list.get(i).get("PROC_INST_ID_").toString(), list.get(i).get("SUBJECT").toString());
        }
        return jsonObject;
    }

    /**
     * 获取我的任务数量
     *
     * @return
     */
    @Transactional
    public JSONObject getMyTaskCount() {
        JSONObject jsonObject = new JSONObject();
        StringBuffer sql = new StringBuffer();
        sql.append(" select count(1) count from ( ").append(getSql()).append(" ) ");
        sql.append(" where (status = '1' or status is null) and paticipant like '%");
        sql.append(super.getLoginInfo().getUser().getNAME()).append("%' ");
//        String sql = "select count(1) count from f_task_publish where (status = '1' or status is null) and paticipant like '%"
//                + super.getLoginInfo().getUser().getNAME() + "%' ";
        List<Map> list = super.sqlQuery(sql.toString());
        jsonObject.put("toGetCount", list.get(0).get("COUNT").toString());
        jsonObject.put("success", true);
        return jsonObject;
    }

    /**
     * 获取进行中、待领取、已完成任务数量
     *
     * @return
     */
    @Transactional
    public JSONObject getCount() {
        JSONObject jsonObject = new JSONObject();
        String userName = super.getSurestream().getString("userName");
//        if(VTools.StringIsNullOrSpace(userName)){
//            userName = super.getLoginInfo().getUser().getNAME();
//        }
        //待领取
        StringBuffer sql1 = new StringBuffer();
        //进行中
        StringBuffer sql2 = new StringBuffer();
        //已结束
        StringBuffer sql3 = new StringBuffer();
        sql1.append("select count(1) count from ( ").append(getSql()).append(" ) where status is null ");
        sql2.append("select count(1) count from ( ").append(getSql()).append(" ) where status = '1' ");
        sql3.append("select count(1) count from ( ").append(getSql()).append(" ) where status = '2' ");

        if (!VTools.StringIsNullOrSpace(userName)) {
            sql1.append(" and paticipant like '%").append(userName).append("' ");
            sql2.append(" and paticipant like '%").append(userName).append("' ");
            sql3.append(" and paticipant like '%").append(userName).append("' ");
        }
        List<Map> list1 = super.sqlQuery(sql1.toString());
        List<Map> list2 = super.sqlQuery(sql2.toString());
        List<Map> list3 = super.sqlQuery(sql3.toString());
        jsonObject.put("toGetCount", list1.get(0).get("COUNT").toString());
        jsonObject.put("goingCount", list2.get(0).get("COUNT").toString());
        jsonObject.put("finishCount", list3.get(0).get("COUNT").toString());
        jsonObject.put("success", true);
        return jsonObject;
    }

    /**
     * 获取我的任务中进行中、待领取、已完成任务数量
     *
     * @return
     */
    @Transactional
    public JSONObject getCountNo() {
        JSONObject jsonObject = new JSONObject();
        String userName = super.getSurestream().getString("userName");
        //待领取
        StringBuffer sql1 = new StringBuffer();
        //进行中
        StringBuffer sql2 = new StringBuffer();
        //已结束
        StringBuffer sql3 = new StringBuffer();
        StringBuffer sql = new StringBuffer();
        sql.append("select ID__,PID__,PROC_INST_ID_,SUBJECT,USER_NAME,DEPARTMENT,status,CASE WHEN t.MAIN_TASK IS NULL THEN '无' WHEN t.MAIN_TASK = '0'\n" +
                "  THEN '无' ELSE (SELECT P.subject FROM f_task_publish P WHERE P.proc_inst_id_ = T.main_task) end MAIN_TASK,START_DATE,END_DATE\n" +
                "from f_task_publish t where PID__ is not null ");
        if (!VTools.StringIsNullOrSpace(userName)) {
            sql.append(" and paticipant like '%").append(userName).append("' ");
        }
        sql1.append("select count(1) count from ( ").append(sql).append(" ) where status is null ");
        sql2.append("select count(1) count from ( ").append(sql).append(" ) where status = '1' ");
        sql3.append("select count(1) count from ( ").append(sql).append(" ) where status = '2' ");


        List<Map> list1 = super.sqlQuery(sql1.toString());
        List<Map> list2 = super.sqlQuery(sql2.toString());
        List<Map> list3 = super.sqlQuery(sql3.toString());
        jsonObject.put("toGetCount", list1.get(0).get("COUNT").toString());
        jsonObject.put("goingCount", list2.get(0).get("COUNT").toString());
        jsonObject.put("finishCount", list3.get(0).get("COUNT").toString());
        jsonObject.put("success", true);
        return jsonObject;
    }

    /**
     * 查询子任务列表
     *
     * @return
     */
    @Transactional
    public Map querySonTask() {
        String mainTask = super.getSurestream().getString("mainTask");
        StringBuffer sql = new StringBuffer();
        sql.append("select * from f_task_publish where main_task = ?");
        return super.wisdragonPageQuery(sql.toString(), mainTask);
    }

    /**
     * 主任务表达式代理类方法 ${TaskService.updateTaskStatus(execution)}
     *
     * @param execution
     */
    @Transactional
    public void updateTaskStatus(DelegateExecution execution) throws Exception {
        //获取流程实例id
        String procId = execution.getProcessInstanceId();
        //修改任务状态为结束
        String update = "update f_task_publish set status = '2' where proc_inst_id_ = ? ";
        super.update(update, procId);

    }

    /**
     * 主任务表达式代理类方法 ${TaskService.getTaskPublisher(execution)}
     *
     * @param execution
     */
    @Transactional
    public void getTaskPublisher(DelegateExecution execution) throws Exception {
        //获取流程实例id
        String mainTask = execution.getVariable("main_task").toString();
        //修改任务状态为结束
        String sql = "select creator__ from f_task_publish where proc_inst_id_ = ? ";
        List<Map> list = super.sqlQuery(sql, mainTask);
        if (!VTools.ListIsNullOrEmpty(list)) {
            execution.setVariable("publisher", list.get(0).get("CREATOR__").toString());
        }

    }

    /**
     * 主任务表达式代理类方法 ${TaskService.publishMainTask(execution)}
     *
     * @param execution
     */
    @Transactional
    public void publishMainTask(DelegateExecution execution) throws Exception {
        noticeTaskMessage(execution, "发布了一个任务");

        String procId = execution.getProcessInstanceId();
        String update = "update f_task_publish set status = '1' where proc_inst_id_ = ?";
        super.update(update, procId);
    }

    /**
     * 主任务表达式代理类方法 ${TaskService.getTask(execution)}
     *
     * @param execution
     */
    @Transactional
    public void getTask(DelegateExecution execution) throws Exception {
        noticeTaskMessage(execution, "领取了一个任务");
    }

    /**
     * 邮件通知任务相关信息
     *
     * @param execution
     * @param title
     */
    @Transactional
    public void noticeTaskMessage(DelegateExecution execution, String title) {
        //获取表单信息
        String userName = execution.getVariable("user_name").toString();
        String subject = execution.getVariable("subject").toString();
        String participant = execution.getVariable("paticipant").toString();
        String responsibilityUser = execution.getVariable("responsibility_user").toString();
        String copyToUser = execution.getVariable("copy_to_user").toString();
        String mainTask = execution.getVariable("main_task").toString();
        String taskHours = execution.getVariable("task_hours").toString();
        String description = execution.getVariable("description").toString();
        String expectGoal = execution.getVariable("expect_goal").toString();
        String startDate = execution.getVariable("start_date").toString();
        String endDate = execution.getVariable("end_date").toString();

        String users = participant + responsibilityUser + copyToUser;
        String[] user = users.split("@");
        for (int i = 0; i < user.length; i++) {
            String name = user[i];
            boolean flag = true;
            for (int j = 0; j < user.length; j++) {
                if (i != j && name.equals(user[j])) {
                    flag = false;
                    break;
                }
            }
            if (name.equals(super.getLoginInfo().getUser().getNAME())) {
                flag = false;
            }
            if (!VTools.StringIsNullOrSpace(name) && flag) {
                String email = commonService.getUserInfoByUserName(name).getEMAIL();
                title = userName + title;
                StringBuffer msg = new StringBuffer();
                msg.append("任务主题：  ").append(subject).append("<BR>");
                msg.append("主任务：    ").append(getTaskSubject(mainTask)).append("<BR>");
                msg.append("任务参与人：").append(participant).append("<BR>");
                msg.append("任务责任人：").append(responsibilityUser).append("<BR>");
                msg.append("任务抄送人：").append(copyToUser).append("<BR>");
                msg.append("任务工时：  ").append(taskHours).append("<BR>");
                msg.append("任务描述：  ").append(description).append("<BR>");
                msg.append("预期目标：  ").append(expectGoal).append("<BR>");
                msg.append("开始时间：  ").append(startDate).append("<BR>");
                msg.append("结束时间：  ").append(endDate).append("<BR>");

//                SendEmailUtils.sendEmail(email, title, msg.toString());
            }
        }
    }

    /**
     * 任务发布表达式代理类方法 ${TaskService.getApprover(execution)}
     *
     * @param execution
     */
    @Transactional
    public void getApprover(DelegateExecution execution) throws Exception {
        //获取数据库表名
        String tableName = commonService.getTableNameByProperties("task");
        //获取任务类型
        String taskType = execution.getVariable("task_type").toString();
        String workType = execution.getVariable("work_type").toString();

        //获取参与人信息
        String participant = execution.getVariable("paticipant").toString();
        T_SYS_USER userInfo = commonService.getUserInfoByUserName(participant.split("@")[1]);
        List<String> approverList = new ArrayList<>();
        //获取任务参与者角色
        List<String> participantRoles = commonService.getRolesIdByUserId(userInfo.getID());
        //获取任务参与人直属上级角色id
        String participantDirector = commonService.getRolesPid(participantRoles, tableName);

        if ("daily_task".equals(taskType) || "evection_task".equals(taskType)) {
            approverList.add(participantDirector);
        }

        if ("procurement_task".equals(taskType)) { //采购任务
            boolean flag = true;
            String pid = "root";
            while (flag) {
                String sql = "select * from " + tableName + " where pid = ? and remark = ? ";
                List<Map> list = super.sqlQuery(sql, pid, workType);
                if (!VTools.ListIsNullOrEmpty(list)) {
                    //判断申请人身份
//                    if(){
//
//                    }
                    pid = list.get(0).get("ROLEID").toString();
                    approverList.add(pid);
                } else {
                    flag = false;
                }
            }
        }

        //去重
        Set set = new HashSet();
        List<String> newList = new ArrayList();
        for (String approver : approverList) {
            if (set.add(approver)) {
                newList.add(approver);
            }
        }
        Object object = execution.getVariable("cnt");
        if (approverList.size() > 0) {//
            int index = approverList.size();
            if (object != null) {

                index = Integer.parseInt(object + "") - 1;
            }

            if (index >= 0) {
                String roleId = newList.get(index);
                //设置流程变量
                execution.setVariable("cnt", index);
                execution.setVariable("approver", roleId);

                T_SYS_USER user = commonService.getUserInfoByRoleId(roleId);
                String title = "任务发布审批通知";
                String msg = user.getNAME() + "发布的任务请您审批！";
//                SendEmailUtils.sendEmail(user.getEMAIL(), title, msg);
            } else {
                execution.setVariable("cnt", null);
                execution.setVariable("approver", null);
            }
        } else if ("main_task".equals(taskType)) {
            execution.setVariable("cnt", null);
            execution.setVariable("approver", null);
        } else {
            throw new Exception("获取审批人信息失败，或者没有流程申请权限");
        }
    }

    /**
     * 查询任务主题
     *
     * @param taskId
     * @return
     */
    @Transactional
    public String getTaskSubject(String taskId) {
        String mainTaskSubject = "";
        if (VTools.StringIsNullOrSpace(taskId)) {
            mainTaskSubject = "无";
        } else {
            String sql = "select subject from f_task_publish where proc_inst_id_ = ?";
            List<Map> list = super.sqlQuery(sql, taskId);
            if (!VTools.ListIsNullOrEmpty(list)) {
                mainTaskSubject = list.get(0).get("SUBJECT").toString();
            }
        }
        return mainTaskSubject;
    }

    /**
     * 汇报任务进度
     *
     * @return
     */
    @Transactional
    public JSONObject reportProgress() {

        String taskData = super.getSurestream().getString("taskData");
        String procId = super.getSurestream().getString("procId");
        String mainTask = super.getSurestream().getString("mainTask");
        JSONObject json = JSONObject.fromObject(taskData);

        String update = "update f_task_publish set progress = ? where proc_inst_id_ = ?";
        super.update(update, json.get("progress"), procId);

        String users = json.getString("responsibilityUser") + json.getString("copyToUser");
        String[] user = users.split("@");
        for (int i = 0; i < user.length; i++) {
            String name = user[i];
            boolean flag = true;
            for (int j = 0; j < user.length; j++) {
                if (i != j && name.equals(user[j])) {
                    flag = false;
                    break;
                }
            }
            if (name.equals(super.getLoginInfo().getUser().getID())) {
                flag = false;
            }
            if (!VTools.StringIsNullOrSpace(name) && flag) {
                String email = commonService.getUserInfoByUserName(name).getEMAIL();
                String title = super.getLoginInfo().getUser().getNAME() + "更新了一条任务进度";
                StringBuffer msg = new StringBuffer();
                msg.append("任务主题：  ").append(json.getString("subject")).append("<BR>");
                msg.append("任务进度：  ").append(json.getString("progress")).append("<BR>");
                msg.append("主任务：    ").append(getTaskSubject(json.getString("mainTask"))).append("<BR>");
                msg.append("任务参与人：").append(json.getString("participant")).append("<BR>");
                msg.append("任务责任人：").append(json.getString("responsibilityUser")).append("<BR>");
                msg.append("任务抄送人：").append(json.getString("copyToUser")).append("<BR>");
                msg.append("任务工时：  ").append(json.getString("taskHours")).append("<BR>");
                msg.append("任务描述：  ").append(json.getString("description")).append("<BR>");
                msg.append("预期目标：  ").append(json.getString("expectGoal")).append("<BR>");
                msg.append("开始时间：  ").append(json.getString("startDate")).append("<BR>");
                msg.append("结束时间：  ").append(json.getString("endDate")).append("<BR>");

//                SendEmailUtils.sendEmail(email, title, msg.toString());
            }
        }
//        summaryMainTaskProgress(mainTask);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", true);
        jsonObject.put("msg", "保存成功");

        return jsonObject;
    }

    /**
     * 根据流程实例id查询任务干系人
     *
     * @return
     */
    @Transactional
    public JSONObject queryPeople() {
        JSONObject jsonObject = new JSONObject();

        String mainTask = super.getSurestream().getString("mainTask");

        String sql = "select project_name, project_code, contract_code, paticipant, responsibility_user,copy_to_user, "
                + " remain_percentage from f_task_publish where proc_inst_id_ = ?";
        List<Map> list = super.sqlQuery(sql, mainTask);
        if (VTools.ListIsNullOrEmpty(list)) {
            jsonObject.put("success", false);
            jsonObject.put("msg", "查询主任务干系人时出错");
        }
        jsonObject.put("projectName", list.get(0).get("PROJECT_NAME").toString());
        jsonObject.put("projectCode", list.get(0).get("PROJECT_CODE").toString());
        jsonObject.put("contractCode", list.get(0).get("CONTRACT_CODE").toString());
        jsonObject.put("participant", list.get(0).get("PATICIPANT").toString());
        jsonObject.put("responsibilityUser", list.get(0).get("RESPONSIBILITY_USER").toString());
        jsonObject.put("copyToUser", list.get(0).get("COPY_TO_USER").toString());
        jsonObject.put("remain_percentage", list.get(0).get("REMAIN_PERCENTAGE").toString());
        jsonObject.put("success", true);
        jsonObject.put("msg", "查询成功");
        return jsonObject;
    }

    /**
     * 汇总主任务进度
     *
     * @param mainTask 当前修改任务的主任务流程实例id
     */
    @Transactional
    public void summaryMainTaskProgress(String mainTask) {
        String sql = "select progress, percentage from f_task_publish where main_task = ?";
        List<Map> list = super.sqlQuery(sql, mainTask);
        double mainPercentage = 0;
        for (int i = 0; i < list.size(); i++) {
            String PROGRESS = list.get(i).get("PROGRESS").toString();
            double progress = VTools.StringIsNullOrSpace(PROGRESS) ? 0 : Double.valueOf(PROGRESS.replace("%", ""));
            double percentage = Double.valueOf(list.get(i).get("PERCENTAGE").toString());
            mainPercentage += percentage / 100 * progress;
        }
        String update = "update f_task_publish set progress = ? where proc_inst_id_ = ?";
        super.update(update, String.format("%.2f", mainPercentage) + "%", mainTask);
        String sql1 = "select main_task from f_task_publish where has_main_task = '1' and proc_inst_id_ = ?";
        List<Map> list1 = super.sqlQuery(sql1, mainTask);
        if (VTools.ListIsNullOrEmpty(list1)) {
            return;
        } else {
            summaryMainTaskProgress(list1.get(0).get("MAIN_TASK").toString());
        }

    }

    /**
     * 检查主任务所剩百分比
     *
     * @return
     */
    @Transactional
    public JSONObject checkMainTaskPercentage() {

        JSONObject jsonObject = new JSONObject();
        //用户准备领取任务的百分比
        double percentage = Double.valueOf(super.getSurestream().getString("percentage"));
        //主任务的流程实例id
        String mainTask = super.getSurestream().getString("mainTask");

        String sql = "select remain_percentage from f_task_publish where proc_inst_id_ = ? ";
        List<Map> list = super.sqlQuery(sql, mainTask);
        if (VTools.ListIsNullOrEmpty(list)) {
            jsonObject.put("success", "false");
            jsonObject.put("msg", "查询当前可领取任务的百分比失败");
            return jsonObject;
        }

        //主任务剩余的百分比
        double remainPercentage = Double.valueOf(list.get(0).get("REMAIN_PERCENTAGE").toString());

        if (percentage <= remainPercentage) {
            String update = "update f_task_publish set remain_percentage = ? where proc_inst_id_ = ?";
            super.update(update, String.valueOf(remainPercentage - percentage), mainTask);

            jsonObject.put("success", "true");
            jsonObject.put("msg", "查询成功");
            return jsonObject;
        } else {
            jsonObject.put("success", "false");
            jsonObject.put("msg", "当前任务百分比大于可领取的任务百分比,可领取任务百分比为：" + remainPercentage + "%");
            return jsonObject;
        }
    }

    /**
     * 查询以保存的拉下框的值
     *
     * @return
     */
    @Transactional
    public JSONObject querySelectValue() {
        JSONObject jsonObject = new JSONObject();
        String procId = super.getSurestream().getString("procId");
        String sql = "select main_task,work_type,task_type,priority from f_task_publish where proc_inst_id_ = ?";
        List<Map> list = super.sqlQuery(sql, procId);
        if (VTools.ListIsNullOrEmpty(list)) {
            jsonObject.put("success", false);
            jsonObject.put("msg", "查询数据为空!");
            return null;
        }
        jsonObject.put("workType", list.get(0).get("WORK_TYPE").toString());
        jsonObject.put("taskType", list.get(0).get("TASK_TYPE").toString());
        jsonObject.put("priority", list.get(0).get("PRIORITY").toString());
        jsonObject.put("mainTask", list.get(0).get("MAIN_TASK").toString());

        jsonObject.put("success", true);
        jsonObject.put("msg", "查询成功!");

        return jsonObject;
    }

    /**
     * 重写保存提交方法
     *
     * @return
     */
    @Transactional
    public JSONObject saveAndSubmit() {
        JSONObject jo = new JSONObject();
//        String hasMainTask = super.getSurestream().getString("hasMainTask");
        String procId = super.getSurestream().getString("procId");
        String operate = super.getSurestream().getString("operate");
        String workType = super.getSurestream().getString("workType");
        String taskType = super.getSurestream().getString("taskType");
        String priority = super.getSurestream().getString("precedence");
        String mainTask = super.getSurestream().getString("mainTask");
        if (VTools.StringIsNullOrSpace(mainTask)) {
            mainTask = "0";
        }

        try {
            //工作流提交
            FORM_MODEL form = new FORM_MODEL();
            if ("save".equals(operate)) {
                form = super.submitForm();
                String sql = "update f_task_publish set status = 'pre_publish' where proc_inst_id_ = ? ";
                super.update(sql, procId);
            } else {
                form = super.submitFormAndSend();
            }

            if ("shutTask".equals(operate)) {
                //结束任务操作，将任务状态设置为已结束
                String sql = "update f_task_publish set status = 'sub_completed' where proc_inst_id_ = ? ";
                super.update(sql, procId);
            }
            if ("submit".equals(operate) || "save".equals(operate)) {
                String sql = "update f_task_publish set work_type = ?, task_type = ?, priority = ?,main_task = ? where proc_inst_id_ = ? ";
                super.update(sql, workType, taskType, priority, mainTask, procId);
            }

            jo.putAll(form.getReJson());
            jo.put("success", Boolean.valueOf(true));
            if ("save".equals(operate)) {
                jo.put("model", "{\"modelId\":\"" + form.getID() + "\", \"ID\":\"" + ((FORM_FIELD) form.getFields().get(0)).getValue() + "\"}");
            } else {
                jo.put("model", "{\"modelId\":\"" + form.getID() + "\", \"bizId\":\"" + ((FORM_FIELD) form.getFields().get(0)).getValue() + "\"}");
            }
            jo.put("msg", "保存成功。");

            //放在后面是为了判断，在领取任务的时候显示领取成功
            //自己的业务处理
            if ("getTask".equals(operate)) {
                //领取任务操作，将任务状态设置为已领取
                String sql = "update f_task_publish set status = 'reporting' where proc_inst_id_ = ? ";
                super.update(sql, procId);
                jo.put("msg", "领取成功。");
            }
        } catch (Exception e) {
            e.printStackTrace();
            jo.put("success", Boolean.valueOf(false));
            jo.put("model", "{}");
            jo.put("msg", "保存失败，消息：" + e.getMessage());
        }

        return jo;
    }

    /**
     * 大表单提交
     *
     * @return
     */
    @Transactional
    public JSONObject saveAndSendSubProcess() {
        JSONObject jo = new JSONObject();
        String type = super.getSurestream().getString("type");
        String[] participant = super.getSurestream().getString("participants").split("@");
        String procDefKey = super.getSurestream().getString("procDefKey");

        try {
            if ("submit".equals(type)) {
                //大表单提交
                FORM_MODEL form = super.submitFormAndSend();
                FORM_FIELD field = form.getField("id__");
                jo.putAll(form.getReJson());
                jo.put("model", "{\"modelId\":\"" + form.getID() + "\", \"bizId\":\"" + ((FORM_FIELD) form.getFields().get(0)).getValue() + "\"}");

                int i = 0;
                while (i < participant.length) {
                    String aParticipant = participant[i];
                    if (VTools.StringIsNullOrSpace(aParticipant)) {
                        i++;
                        continue;
                    }
//                    String userId = commonService.getUserInfoByUserName(participant[i]).getID();
                    //启动子流程
                    JSONObject jsonObject = subProcessService.startProcessById(procDefKey, VTools.getNewUUID());
                    if (!Boolean.valueOf(jsonObject.get("success").toString())) {
                        return jsonObject;
                    } else {
                        //获取流程实例id
                        String procId = jsonObject.getString("processInstanceId");

                        //加载表单数据，参数为表单id
                        FORM_MODEL formModel = super.loadFormModel(commonService.getPropertyValueByKey("taskForm"));
                        //将大表单模型中的流程实例id改为小表单的流程实例id
                        JSONObject reJson = new JSONObject();
                        reJson.put("PROC_INST_ID_", procId);
                        formModel.setReJson(reJson);

                        List<FORM_FIELD> formFields = formModel.getFields();
                        for (FORM_FIELD formField : formFields) {
                            if (formField.getCOLUMN_NAME().equals("pid__")) {
                                formField.setValue(field.getValue());
                            }
                            if (formField.getCOLUMN_NAME().equals("creator__")) {
                                formField.setValue(super.getLoginInfo().getUser().getID());
                            }
                            if (formField.getCOLUMN_NAME().equals("paticipant")) {
                                formField.setValue("@" + aParticipant);
                            }
                            formField.setValueChanged(false);
                        }
                        //提交子流程
                        subProcessService.submitFormAndSend(formModel, procDefKey, procId, jsonObject.getString("taskId"));
                    }
                    i++;
                }
                String update = "update f_task_publish set main_task = '0' where main_task is null ";
                super.update(update, null);

                jo.put("success", Boolean.valueOf(true));
                jo.put("model", "{\"modelId\":\"" + form.getID() + "\", \"bizId\":\"" + ((FORM_FIELD) form.getFields().get(0)).getValue() + "\"}");
                jo.put("msg", "保存成功。");
            } else {
                FORM_MODEL e = super.submitForm();

                jo.put("success", Boolean.valueOf(true));
                jo.put("model", "{\"modelId\":\"" + e.getID() + "\", \"ID\":\"" + ((FORM_FIELD) e.getFields().get(0)).getValue() + "\"}");
                jo.put("msg", "保存成功。");
            }
        } catch (Exception e) {
            e.printStackTrace();
            e.printStackTrace();
            jo.put("success", Boolean.valueOf(false));
            jo.put("model", "{}");
            jo.put("msg", "保存失败，消息：" + e.getMessage());
        }
        return jo;
    }

    /**
     * 根据条件查询任务列表
     *
     * @return
     */
    @Transactional
    public List<Map> getZxrw() {
        List<Map> list = new ArrayList<Map>();
        //获取查询条件
        String mainTask = super.getSurestream().getString("mainTask");
        String status = super.getSurestream().getString("status");
        String taskType = "main_task";
        String workType = super.getSurestream().getString("workType");
        String userName = super.getSurestream().getString("userName");

        StringBuffer sql = new StringBuffer("select ID__, PROC_INST_ID_, SUBJECT, USER_NAME, DEPARTMENT, "
                + " CASE WHEN t .MAIN_TASK IS NULL THEN '无' WHEN t .MAIN_TASK = '0' THEN '无' ELSE (  "
                + " SELECT P .subject FROM f_task_publish P WHERE P .proc_inst_id_ = T .main_task ) end MAIN_TASK,"
                + " START_DATE, END_DATE  from f_task_publish t  where 1=1 ");

//        if (!VTools.StringIsNullOrSpace(status)) {
//            sql.append(" and status = '").append(status).append("' ");
//        } else {
//            sql.append(" and status is null ");
//        }
        if (!VTools.StringIsNullOrSpace(taskType)) {
            sql.append(" and task_type = '").append(taskType).append("' ");
        }
        if (!VTools.StringIsNullOrSpace(mainTask)) {
            sql.append(" and main_task = '").append(mainTask).append("' ");
        }
        if (!VTools.StringIsNullOrSpace(workType)) {
            sql.append(" and work_type = '").append(workType).append("' ");
        }
        if (!VTools.StringIsNullOrSpace(userName)) {
            sql.append(" and paticipant like '%").append(userName).append("%' ");
        }
        sql.append("order by create_date asc");

        Map map = super.wisdragonPageQuery(sql.toString());
        String data = map.get("data").toString();
        if (data.length() > 2) {

            String[] revertData = data.substring(1, data.length() - 1).split("},");
            for (String str : revertData) {
                str = str.replace("{", "");
                str = str.replace("}", "");
                Map mapTemp = new HashMap();
                for (String strTemp : str.split(",")) {
                    mapTemp.put(strTemp.split("=")[0].trim(), strTemp.split("=")[1].trim());
                }
                list.add(mapTemp);
            }
        }
        return list;
    }


    // MyTask 我的任务

    /**
     * Function 查询任务信息
     * Author 王恒
     * Date 2018/6/6 13:35
     */
    @Transactional
    public Map queryTaskList() {
        //获取查询条件
        int status = Integer.parseInt(super.getSurestream().getString("status"));
        String taskStatus = super.getSurestream().getString("task_status");
        String taskType = super.getSurestream().getString("taskType");
        String workType = super.getSurestream().getString("workType");
        String userName = super.getSurestream().getString("username");
        String userId = super.getSurestream().getString("userId");
        String type = super.getSurestream().getString("type");

        StringBuffer sql = new StringBuffer("select\n" +
                "  ID__,\n" +
                "  PID__,\n" +
                "  PROC_INST_ID_,\n" +
                "  (select ITEMVALUE\n" +
                "   from T_SYS_CONST\n" +
                "   where CATACODE = 'task_type' and ITEMCODE = TASK_TYPE) TASK_TYPE,\n" +
                "  SUBJECT,\n" +
                "  (select ITEMVALUE\n" +
                "   from T_SYS_CONST\n" +
                "   where CATACODE = 'work_type' and ITEMCODE = WORK_TYPE) WORK_TYPE,\n" +
                "  USER_NAME CREATOR__,\n" +
                "  replace(PATICIPANT, '@', '')                            PATICIPANT,\n" +
                "  status,\n" +
                "  CASE WHEN t.MAIN_TASK IS NULL\n" +
                "    THEN '无'\n" +
                "  WHEN t.MAIN_TASK = '0'\n" +
                "    THEN '无'\n" +
                "  ELSE (SELECT P.subject\n" +
                "        FROM f_task_publish P\n" +
                "        WHERE P.proc_inst_id_ = T.main_task) end          MAIN_TASK,\n" +
                "  nvl((select case when act.NAME_ is NULL\n" +
                "    then '已完成' end\n" +
                "       from ACT_RU_TASK act\n" +
                "       where act.PROC_INST_ID_ = t.PROC_INST_ID_), '已完成') STEP \n" +
                "from f_task_publish t\n" +
                "where PID__ is not null ");

        //过滤 发布,参与,审核,验收
        switch (status) {
            //发布
            case 0:
                sql.append(" and CREATOR__='").append(userId).append("' ");
                break;
            //参与
            case 1:
                sql.append(" and PATICIPANT like '%").append(userName).append("%' ");
                break;
            //审核
            case 2:
                sql.append(" and RESPONSIBILITY_USER like '%").append(userName).append("' ");
                break;
            case 3:
                sql.append(" and COPY_TO_USER like '%").append(userName).append("' ");
                break;
        }

        //过滤 任务类型,工作类型,任务状态,
        if (!VTools.StringIsNullOrSpace(taskType)) {
            sql.append(" and TASK_TYPE = '").append(taskType).append("' ");
        }
        if (!VTools.StringIsNullOrSpace(workType)) {
            sql.append(" and WORK_TYPE = '").append(workType).append("' ");
        }
        if (!VTools.StringIsNullOrSpace(taskStatus)) {
            sql.append(" and STATUS = '").append(taskStatus).append("' ");
        }

        return super.wisdragonPageQuery(sql.toString());
    }
}
