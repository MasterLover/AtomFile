//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.wisdragon.pfs.nenu.servicehall.service;

import com.asgi.mis.framework.common.VTools;
import com.wisdragon.framework.base.LeoBase;
import com.wisdragon.workflow.service.ProcessService;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import net.sf.json.JSONObject;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service("MyApplyService")
@Scope("request")
public class MyApplyService extends LeoBase {
    @Resource(
        name = "wf/ProcessService"
    )
    private ProcessService processService;

    public MyApplyService() {
    }

    @Transactional(
        propagation = Propagation.NOT_SUPPORTED
    )
    public List<Map> getMyApplyList() {
        List<Map> myApplyList = new ArrayList();
        StringBuffer myApplySql = this.processService.getProcSearchSqlWithoutBizData("", "_yb_curr_task_");
        if (!myApplySql.toString().contains("FROM  F_")) {
            return null;
        } else {
            String loginName = super.getLoginInfo().getUser().getLOGINNAME();
            String sql = "select PROC_DEF_NAME_,CREATOR__,substr(to_char(to_date(substr(CREATE_TIME_,1,10),'yyyy-mm-dd'),'yyyy-mm-dd'),6,10) as CREATE_TIME_  from (" + myApplySql.toString() + ") a where a.CREATOR__='" + loginName + "'  order by a.CREATE_TIME_ desc";
            List<Map> resultList = super.sqlQuery(sql, (Object[])null);
            if (resultList.size() > 0 && resultList != null) {
                for(int i = 0; i < resultList.size(); ++i) {
                    Map<String, String> map = new HashMap();
                    map.put("PROC_DEF_NAME_", ((Map)resultList.get(i)).get("PROC_DEF_NAME_").toString());
                    if (((Map)resultList.get(i)).containsKey("TASK_ID_")) {
                        map.put("ZT", "审核中");
                    } else {
                        map.put("ZT", "已完成");
                    }

                    map.put("CREATE_TIME_", ((Map)resultList.get(i)).get("CREATE_TIME_").toString());
                    myApplyList.add(map);
                }
            }

            return myApplyList;
        }
    }

    @Transactional(
        propagation = Propagation.NOT_SUPPORTED
    )
    public String getMyApplyHandCount() {
        StringBuffer myApplySql = this.processService.getProcSearchSqlWithoutBizData("", "_yb_curr_task_");
        if (!myApplySql.toString().contains("FROM  F_")) {
            return "0";
        } else {
            String loginName = super.getLoginInfo().getUser().getLOGINNAME();
            String sql = "select count(*) as handcounts  from (" + myApplySql.toString() + ") a where a.CREATOR__='" + loginName + "' and TASK_ID_ is not null order by a.CREATE_TIME_ desc";
            if (!VTools.StringIsNullOrSpace(loginName)) {
                List<Map> tmplist = super.sqlQuery(sql.toString(), (Object[])null);
                if (!VTools.ListIsNullOrEmpty(tmplist)) {
                    Map tmpmap = (Map)tmplist.get(0);
                    if (tmpmap.containsKey("HANDCOUNTS")) {
                        return tmpmap.get("HANDCOUNTS").toString();
                    }

                    return "0";
                }
            }
            return "0";
        }
    }

    @Transactional(
        propagation = Propagation.NOT_SUPPORTED
    )
    public String getMyApplyCompletedCount() {
        StringBuffer myApplySql = this.processService.getProcSearchSqlWithoutBizData("", "_yb_curr_task_");
        if (!myApplySql.toString().contains("FROM  F_")) {
            return "0";
        } else {
            String loginName = super.getLoginInfo().getUser().getLOGINNAME();
            String sql = "select count(*) as completedcounts  from (" + myApplySql.toString() + ") a where a.CREATOR__='" + loginName + "' and TASK_ID_ is null order by a.CREATE_TIME_ desc";
            if (!VTools.StringIsNullOrSpace(loginName)) {
                List<Map> tmplist = super.sqlQuery(sql.toString(), (Object[])null);
                if (!VTools.ListIsNullOrEmpty(tmplist)) {
                    Map tmpmap = (Map)tmplist.get(0);
                    if (tmpmap.containsKey("COMPLETEDCOUNTS")) {
                        return tmpmap.get("COMPLETEDCOUNTS").toString();
                    }

                    return "0";
                }
            }

            return "0";
        }
    }

    @Transactional(
        readOnly = true
    )
    public Map getMyApplyHandList() {
        String PROCESSSHUT = super.getSurestream().getString("PROCESSSHUT");
        String PROCESSOPEN = super.getSurestream().getString("PROCESSOPEN");
        String SQBH = super.getSurestream().getString("SQBH");
        String STARTTIME = super.getSurestream().getString("STARTTIME");
        String ENDTTIME = super.getSurestream().getString("ENDTTIME");
        StringBuffer myApplySql = this.processService.getProcSearchSqlWithoutBizData("", "_yb_curr_task_");
        if (!myApplySql.toString().contains("FROM  F_")) {
            Map<String, Object> map = new HashMap();
            map.put("totalCount", 0);
            map.put("data", (Object)null);
            map.put("pageSize", 10);
            map.put("pageIndex", 1);
            int totalPage = 0;
            map.put("totalPage", Integer.valueOf(totalPage));
            return map;
        } else {
            String loginName = super.getLoginInfo().getUser().getLOGINNAME();
            StringBuffer sql = new StringBuffer();
            sql.append("select app.id as appid,TASK_ID_,a.ID,PROC_DEF_ID_,PROC_DEF_NAME_,PROC_INST_ID_,TASK_NAME_,CREATOR__, substr(CREATE_TIME_,1,16) as CREATE_TIME_   from (");
            sql.append(myApplySql.toString());
            sql.append(") a  ");
            sql.append("  left join T_PFS_APP app on app.PROC_KEY=SUBSTR(a.PROC_DEF_ID_,0,INSTR(a.PROC_DEF_ID_,':')-1)  where 1=1  ");
            sql.append("  and a.CREATOR__='");
            sql.append(loginName);
            sql.append("' and TASK_ID_ is not null ");
            if (!VTools.StringIsNullOrSpace(PROCESSSHUT)) {
                sql.append(" and a.PROC_DEF_NAME_  like '%");
                sql.append(PROCESSSHUT);
                sql.append("%'   ");
            }

            if (!VTools.StringIsNullOrSpace(PROCESSOPEN)) {
                sql.append(" and a.PROC_DEF_NAME_  like '%");
                sql.append(PROCESSOPEN);
                sql.append("%'   ");
            }

            if (!VTools.StringIsNullOrSpace(SQBH)) {
                sql.append(" and a.PROC_INST_ID_ ='%");
                sql.append(SQBH);
                sql.append("%'  ");
            }

            if (!VTools.StringIsNullOrSpace(STARTTIME)) {
                sql.append(" and a.CREATE_TIME_ >='");
                sql.append(STARTTIME);
                sql.append("'  ");
            }

            if (!VTools.StringIsNullOrSpace(ENDTTIME)) {
                sql.append(" and a.CREATE_TIME_ <='");
                sql.append(ENDTTIME);
                sql.append("'  ");
            }

            sql.append(" order by a.CREATE_TIME_ desc ");
            Map<String, Object> wisdragonPageQuery = super.wisdragonPageQuery(sql.toString(), (Object[])null);
            return wisdragonPageQuery;
        }
    }

    @Transactional(
        propagation = Propagation.NOT_SUPPORTED
    )
    public Map getMyApplyCompletedList() {
        String PROCESSSHUT = super.getSurestream().getString("PROCESSSHUT");
        String PROCESSOPEN = super.getSurestream().getString("PROCESSOPEN");
        String SQBH = super.getSurestream().getString("SQBH");
        String STARTTIME = super.getSurestream().getString("STARTTIME");
        String ENDTTIME = super.getSurestream().getString("ENDTTIME");
        StringBuffer myApplySql = this.processService.getProcSearchSqlWithoutBizData("", "_yb_curr_task_");
        if (!myApplySql.toString().contains("FROM  F_")) {
            Map<String, Object> map = new HashMap();
            map.put("totalCount", 0);
            map.put("data", (Object)null);
            map.put("pageSize", 10);
            map.put("pageIndex", 1);
            int totalPage = 0;
            map.put("totalPage", Integer.valueOf(totalPage));
            return map;
        } else {
            String loginName = super.getLoginInfo().getUser().getLOGINNAME();
            StringBuffer sql = new StringBuffer();
            sql.append("select app.id as appid,TASK_ID_,a.ID,PROC_DEF_ID_,PROC_DEF_NAME_,PROC_INST_ID_,TASK_NAME_,CREATOR__,  substr(CREATE_TIME_,1,16) as CREATE_TIME_   from (");
            sql.append(myApplySql.toString());
            sql.append(") a  ");
            sql.append("  left join T_PFS_APP app on app.PROC_KEY=SUBSTR(a.PROC_DEF_ID_,0,INSTR(a.PROC_DEF_ID_,':')-1)  where 1=1  ");
            sql.append("  and a.CREATOR__='");
            sql.append(loginName);
            sql.append("' and TASK_ID_ is null ");
            if (!VTools.StringIsNullOrSpace(PROCESSSHUT)) {
                sql.append(" and a.PROC_DEF_NAME_  like '%");
                sql.append(PROCESSSHUT);
                sql.append("%'   ");
            }

            if (!VTools.StringIsNullOrSpace(PROCESSOPEN)) {
                sql.append(" and a.PROC_DEF_NAME_  like '%");
                sql.append(PROCESSOPEN);
                sql.append("%'   ");
            }

            if (!VTools.StringIsNullOrSpace(SQBH)) {
                sql.append(" and a.PROC_INST_ID_ ='%");
                sql.append(SQBH);
                sql.append("%'  ");
            }

            if (!VTools.StringIsNullOrSpace(STARTTIME)) {
                sql.append(" and a.CREATE_TIME_ >='");
                sql.append(STARTTIME);
                sql.append("'  ");
            }

            if (!VTools.StringIsNullOrSpace(ENDTTIME)) {
                sql.append(" and a.CREATE_TIME_ <='");
                sql.append(ENDTTIME);
                sql.append("'  ");
            }

            sql.append(" order by a.CREATE_TIME_ desc ");
            Map<String, Object> wisdragonPageQuery = super.wisdragonPageQuery(sql.toString(), (Object[])null);
            return wisdragonPageQuery;
        }
    }

    @Transactional(
        propagation = Propagation.NOT_SUPPORTED
    )
    public List<Map> getMyApplyMobileHandGridList() {
        StringBuffer myApplySql = this.processService.getProcSearchSqlWithoutBizData("", "_yb_curr_task_");
        if (!myApplySql.toString().contains("FROM  F_")) {
            return null;
        } else {
            String loginName = super.getLoginInfo().getUser().getLOGINNAME();
            StringBuffer sql = new StringBuffer();
            sql.append("select PROC_DEF_ID_,ID,TASK_ID_,PROC_DEF_NAME_,PROC_INST_ID_,TASK_NAME_,CREATOR__,substr(to_char(to_date(substr(CREATE_TIME_,1,10),'yyyy-mm-dd'),'yyyy-mm-dd'),6,10) as CREATE_TIME_  from (");
            sql.append(myApplySql.toString());
            sql.append(") a where a.CREATOR__='");
            sql.append(loginName);
            sql.append("'  and TASK_ID_ is not null");
            sql.append("  order by a.CREATE_TIME_ desc ");
            return super.sqlQuery(sql.toString(), (Object[])null);
        }
    }

    @Transactional(
        propagation = Propagation.NOT_SUPPORTED
    )
    public List<Map> getMyApplyInterfaceList() {
        StringBuffer myApplySql = this.processService.getProcSearchSqlWithoutBizData("", "_yb_curr_task_");
        if (!myApplySql.toString().contains("FROM  F_")) {
            return null;
        } else {
            String loginName = super.getLoginInfo().getUser().getLOGINNAME();
            StringBuffer sql = new StringBuffer();
            sql.append("select PROC_DEF_ID_,ID as bizid,TASK_ID_,PROC_DEF_NAME_ as name,PROC_INST_ID_, substr(to_char(to_date(substr(CREATE_TIME_,1,10),'yyyy-mm-dd'),'yyyy-mm-dd'),6,10) as CREATE_TIME_  from (");
            sql.append(myApplySql.toString());
            sql.append(") a where a.CREATOR__='");
            sql.append(loginName);
            sql.append("'  and TASK_ID_ is not null");
            sql.append("  order by a.CREATE_TIME_ desc ");
            return super.sqlQuery(sql.toString(), (Object[])null);
        }
    }

    @Transactional(
        propagation = Propagation.NOT_SUPPORTED
    )
    public List<Map> getMyApplyMobileCompletedList() {
        StringBuffer myApplySql = this.processService.getProcSearchSqlWithoutBizData("", "_yb_curr_task_");
        if (!myApplySql.toString().contains("FROM  F_")) {
            return null;
        } else {
            String loginName = super.getLoginInfo().getUser().getLOGINNAME();
            StringBuffer sql = new StringBuffer();
            sql.append("select PROC_DEF_ID_,ID,PROC_DEF_NAME_,PROC_INST_ID_,CREATOR__,substr(to_char(to_date(substr(CREATE_TIME_,1,10),'yyyy-mm-dd'),'yyyy-mm-dd'),6,10) as CREATE_TIME_  from (");
            sql.append(myApplySql.toString());
            sql.append(") a where a.CREATOR__='");
            sql.append(loginName);
            sql.append("'  and TASK_ID_ is null  ");
            sql.append("    order by a.CREATE_TIME_ desc");
            return super.sqlQuery(sql.toString(), (Object[])null);
        }
    }

    @Transactional(
        propagation = Propagation.NOT_SUPPORTED
    )
    public JSONObject getSelectOptionFromJson() {
        String type = super.getSurestream().getString("TYPE");
        new JSONObject();
        JSONObject processNameObj = this.getProcessName(type);
        JSONObject infoObj = new JSONObject();
        infoObj.put("PROCESSNAME", processNameObj);
        return infoObj;
    }

    public JSONObject getProcessName(String type) {
        JSONObject processNameObj = new JSONObject();
        StringBuffer myApplySql = this.processService.getProcSearchSqlWithoutBizData("", "_yb_curr_task_");
        if (!myApplySql.toString().contains("FROM  F_")) {
            return null;
        } else {
            String loginName = super.getLoginInfo().getUser().getLOGINNAME();
            StringBuffer sql = new StringBuffer();
            if ("hand".equals(type)) {
                sql.append("select PROC_DEF_NAME_,PROC_INST_ID_,TASK_NAME_,TASK_ID_,CREATOR__,substr(to_char(to_date(substr(CREATE_TIME_,1,10),'yyyy-mm-dd'),'yyyy-mm-dd'),6,10) as CREATE_TIME_  from (");
                sql.append(myApplySql.toString());
                sql.append(") a where a.CREATOR__='");
                sql.append(loginName);
                sql.append("' and TASK_ID_ is not null ");
                sql.append(" order by a.CREATE_TIME_ desc ");
            } else {
                sql.append("select PROC_DEF_NAME_,PROC_INST_ID_,TASK_NAME_,TASK_ID_,CREATOR__,substr(to_char(to_date(substr(CREATE_TIME_,1,10),'yyyy-mm-dd'),'yyyy-mm-dd'),6,10) as CREATE_TIME_  from (");
                sql.append(myApplySql.toString());
                sql.append(") a where a.CREATOR__='");
                sql.append(loginName);
                sql.append("' and TASK_ID_ is null ");
                sql.append(" order by a.CREATE_TIME_ desc ");
            }

            List<Map> resultList = super.sqlQuery(sql.toString(), (Object[])null);
            if (resultList != null && resultList.size() > 0) {
                Iterator var7 = resultList.iterator();

                while(var7.hasNext()) {
                    Map map = (Map)var7.next();
                    if (map.get("PROC_DEF_NAME_") != null) {
                        processNameObj.put(map.get("PROC_DEF_NAME_"), map.get("PROC_DEF_NAME_"));
                    }
                }
            }

            return processNameObj;
        }
    }

    @Transactional(
        readOnly = true
    )
    public Map getMyApplyAnalysis() {
        String type = super.getSurestream().getString("type");
        String startTime = super.getSurestream().getString("startTime");
        String endTime = super.getSurestream().getString("endTime");
        String loginName = super.getLoginInfo().getUser().getLOGINNAME();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String timeNow = df.format(new Date());
        Calendar c = Calendar.getInstance();
        if (VTools.StringIsNullOrSpace(startTime) && VTools.StringIsNullOrSpace(endTime)) {
            Date date;
            if ("1".equals(type)) {
                c.add(5, -7);
                date = c.getTime();
                startTime = df.format(date);
                endTime = timeNow;
            }

            if ("2".equals(type)) {
                c.add(2, -1);
                date = c.getTime();
                startTime = df.format(date);
                endTime = timeNow;
            }
        }

        StringBuffer myApplySql = this.processService.getProcSearchSqlWithoutBizData("", "_yb_curr_task_");
        if (!myApplySql.toString().contains("FROM  F_")) {
            Map<String, Object> map = new HashMap();
            map.put("totalCount", 0);
            map.put("data", (Object)null);
            map.put("pageSize", 10);
            map.put("pageIndex", 1);
            int totalPage = 0;
            map.put("totalPage", Integer.valueOf(totalPage));
            return map;
        } else {
            StringBuffer sql = new StringBuffer();
            sql.append(" select  count(b.PROC_DEF_NAME_) as sqcs,d.bjcs,b.PROC_DEF_NAME_,b.bmmc as bcmc  from ( ");
            sql.append(" select bm.name as bmmc,app.id as appid,TASK_ID_,a.ID,PROC_DEF_ID_,PROC_DEF_NAME_,PROC_INST_ID_,TASK_NAME_,CREATOR__, substr(CREATE_TIME_,1,16) as CREATE_TIME_    from (");
            sql.append(myApplySql.toString());
            sql.append("  ) a ");
            sql.append("  left join T_PFS_APP app on app.PROC_KEY=SUBSTR(a.PROC_DEF_ID_,0,INSTR(a.PROC_DEF_ID_,':')-1)    ");
            sql.append(" left join  t_sys_org bm on app.ssbm=bm.id  where 1=1  ");
            sql.append("  and a.CREATOR__='");
            sql.append(loginName);
            sql.append("' ");
            if (!VTools.StringIsNullOrSpace(startTime) && !VTools.StringIsNullOrSpace(endTime)) {
                sql.append(" and CREATE_TIME_ >= '");
                sql.append(startTime);
                sql.append("' and CREATE_TIME_<= '");
                sql.append(endTime);
                sql.append("' ");
            }

            sql.append(") b, ");
            sql.append(" ( ");
            sql.append(" select  count(c.PROC_DEF_NAME_) as bjcs,c.appid from ( ");
            sql.append(" select app.id as appid,TASK_ID_,e.ID,PROC_DEF_ID_,PROC_DEF_NAME_,PROC_INST_ID_,TASK_NAME_,CREATOR__, substr(CREATE_TIME_,1,16) as CREATE_TIME_   from ( ");
            sql.append(myApplySql.toString());
            sql.append(" ) e ");
            sql.append("  left join T_PFS_APP app on app.PROC_KEY=SUBSTR(e.PROC_DEF_ID_,0,INSTR(e.PROC_DEF_ID_,':')-1)  where 1=1  ");
            sql.append("  and e.CREATOR__='");
            sql.append(loginName);
            sql.append("' ");
            if (!VTools.StringIsNullOrSpace(startTime) && !VTools.StringIsNullOrSpace(endTime)) {
                sql.append(" and CREATE_TIME_ >= '");
                sql.append(startTime);
                sql.append("' and CREATE_TIME_<= '");
                sql.append(endTime);
                sql.append("' ");
            }

            sql.append(" and TASK_ID_ is null ");
            sql.append(" ) c ");
            sql.append("  group by c.PROC_DEF_NAME_,c.appid) d ");
            sql.append("  where d.appid=b.appid ");
            sql.append(" group by b.PROC_DEF_NAME_,b.bmmc,d.bjcs ");
            return super.wisdragonPageQuery(sql.toString(), (Object[])null);
        }
    }

    @Transactional(
        readOnly = true
    )
    public List<Map> getMyApplyAnalysisValue() {
        String type = super.getSurestream().getString("type");
        String startTime = super.getSurestream().getString("startTime");
        String endTime = super.getSurestream().getString("endTime");
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String timeNow = df.format(new Date());
        Calendar c = Calendar.getInstance();
        if (VTools.StringIsNullOrSpace(startTime) && VTools.StringIsNullOrSpace(endTime)) {
            Date date;
            if ("1".equals(type)) {
                c.add(5, -7);
                date = c.getTime();
                startTime = df.format(date);
                endTime = timeNow;
            }

            if ("2".equals(type)) {
                c.add(2, -1);
                date = c.getTime();
                startTime = df.format(date);
                endTime = timeNow;
            }
        }

        String loginName = super.getLoginInfo().getUser().getLOGINNAME();
        StringBuffer myApplySql = this.processService.getProcSearchSqlWithoutBizData("", "_yb_curr_task_");
        if (!myApplySql.toString().contains("FROM  F_")) {
            return null;
        } else {
            StringBuffer sql = new StringBuffer();
            sql.append(" select  count(b.PROC_DEF_NAME_) as sqcs,d.bjcs,b.PROC_DEF_NAME_,b.bmmc as bcmc  from ( ");
            sql.append(" select bm.name as bmmc,app.id as appid,TASK_ID_,a.ID,PROC_DEF_ID_,PROC_DEF_NAME_,PROC_INST_ID_,TASK_NAME_,CREATOR__, substr(CREATE_TIME_,1,16) as CREATE_TIME_    from (");
            sql.append(myApplySql.toString());
            sql.append("  ) a ");
            sql.append("  left join T_PFS_APP app on app.PROC_KEY=SUBSTR(a.PROC_DEF_ID_,0,INSTR(a.PROC_DEF_ID_,':')-1)    ");
            sql.append(" left join  t_sys_org bm on app.ssbm=bm.id  where 1=1  ");
            sql.append("  and a.CREATOR__='");
            sql.append(loginName);
            sql.append("' ");
            if (!VTools.StringIsNullOrSpace(startTime) && !VTools.StringIsNullOrSpace(endTime)) {
                sql.append(" and CREATE_TIME_ >= '");
                sql.append(startTime);
                sql.append("' and CREATE_TIME_<= '");
                sql.append(endTime);
                sql.append("' ");
            }

            sql.append(") b, ");
            sql.append(" ( ");
            sql.append(" select  count(c.PROC_DEF_NAME_) as bjcs,c.appid from ( ");
            sql.append(" select app.id as appid,TASK_ID_,e.ID,PROC_DEF_ID_,PROC_DEF_NAME_,PROC_INST_ID_,TASK_NAME_,CREATOR__, substr(CREATE_TIME_,1,16) as CREATE_TIME_   from ( ");
            sql.append(myApplySql.toString());
            sql.append(" ) e ");
            sql.append("  left join T_PFS_APP app on app.PROC_KEY=SUBSTR(e.PROC_DEF_ID_,0,INSTR(e.PROC_DEF_ID_,':')-1)  where 1=1  ");
            sql.append("  and e.CREATOR__='");
            sql.append(loginName);
            sql.append("' ");
            if (!VTools.StringIsNullOrSpace(startTime) && !VTools.StringIsNullOrSpace(endTime)) {
                sql.append(" and CREATE_TIME_ >= '");
                sql.append(startTime);
                sql.append("' and CREATE_TIME_<= '");
                sql.append(endTime);
                sql.append("' ");
            }

            sql.append(" and TASK_ID_ is null ");
            sql.append(" ) c ");
            sql.append("  group by c.PROC_DEF_NAME_,c.appid) d ");
            sql.append("  where d.appid=b.appid ");
            sql.append(" group by b.PROC_DEF_NAME_,b.bmmc,d.bjcs ");
            return super.sqlQuery(sql.toString(), (Object[])null);
        }
    }
}
