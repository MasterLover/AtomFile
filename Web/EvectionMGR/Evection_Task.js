function showTask(){
    var url = path + "/evection/queryEvection";
    var postData = getTaskParam();
    var colNames = [ "ID__", "PROC_INST_ID_", "申请人","申请日期","所属部门","项目名称","出差任务","任务发布人","出差标题", "出差日期",/*"差回日期",*/"出发地","目的地","计划工时", "操作"];
    var colModel = [
        {"index": "ID__", "name": "ID__", "editable": false, hidden: true},//ID
        {"index": "PROC_INST_ID_", "name": "PROC_INST_ID_", "editable": false, hidden: true},//流程实例ID
        {"index": "APPLICANT_NAME", "name": "APPLICANT_NAME", "editable": false},//申请人
        {"index": "APPLY_DATE", "name": "APPLY_DATE", "editable": false},//申请日期
        {"index": "DEPARTMENT", "name": "DEPARTMENT", "editable": false},//所属部门
        {"index": "PROJECT_NAME", "name": "PROJECT_NAME", "editable": false},//项目名称
        {"index": "TASK", "name": "TASK", "editable": false},//所选出差任务
        {"index": "PUBLISHER", "name": "PUBLISHER", "editable": false},//任务发布人
        {"index": "EVECTION_TITLE", "name": "EVECTION_TITLE", "editable": false},//出差/差回标题
        {"index": "EVECTION_DATE", "name": "EVECTION_DATE", "editable": false},//出差|差回日期
        {"index": "PLACE_OF_DEPARTURE", "name": "PLACE_OF_DEPARTURE", "editable": false},//出发地
        {"index": "DESTINATION", "name": "DESTINATION", "editable": false},//目的地
        {"index": "PLAN_HOURS", "name": "PLAN_HOURS", "editable": false},//计划/实际工时
        {"index": "action", "name": "action", "editable": false}
    ];
    pfs.comm.initJqGrid(url,postData,"taskList","taskPager", colNames, colModel, function(){
        pfs.comm.setJqGridPagerStyle("taskPager");
        var ids = $("#taskList").jqGrid('getDataIDs');
        for (var i = 0; i < ids.length; i++) {

            var cl = ids[i];
            var ocl = "";
            var str = "";

            //ocl = "id='jEditButton_" + cl + "' onclick='editContract(\"" + cl + "\")'; onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
            //str += "<div title='编辑数据' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + ocl + "><span class='ace-icon glyphicon glyphicon-edit bigger-110'></span></div>";

            ocl = "<span title=\"查看\" class=\"cz\" onclick=\"viewTask('" + cl + "');\">查看</span>";

            str = "<div style='margin-left:8px;'>" + ocl + "</div>";
            $("#taskList").jqGrid('setRowData', ids[i], {action: str});
        }
    });
}

function viewTask(rowId){
    var data = $("#taskList").jqGrid("getRowData", rowId);
    console.log(data);

    $.ajax({
        url : path + "/task/queryProcDataByProcId",
        type : "post",
        data : {
            procId : data.PROC_INST_ID_
        },
        success : function(req){
            console.log(req);
            if(req.success){
                pfs.comm.sqck(req.proc_def_id, data.ID__, data.PROC_INST_ID_, req.task_id);
            }else{
                pfs.comm.error("查看失败")
            }
        }
    })
}


function goingTask() {
    $("#status").val('1');
    queryTask();
    $("#goingTask").addClass("active");
    $("#toGetTask").removeClass("active");
    $("#finishTask").removeClass("active");
    getCount();
}

function toGetTask() {
    $("#status").val('');
    queryTask();
    $("#toGetTask").addClass("active");
    $("#goingTask").removeClass("active");
    $("#finishTask").removeClass("active");
    getCount();
}


function finishTask() {
    $("#status").val('2');
    queryTask();
    $("#finishTask").addClass("active");
    $("#toGetTask").removeClass("active");
    $("#goingTask").removeClass("active");
    getCount();
}

$(function(){
    $(window).resize(function(){
        $("#taskList").setGridWidth($(window).width()*0.99);
        $("#taskList").setGridWidth(document.body.clientWidth*0.99);
    });
});

function getTaskParam(){
    var rowListNum = $("#taskList").jqGrid('getGridParam', 'rowNum');
    console.log("rowListNum:" + rowListNum);
    if(rowListNum == undefined){
        rowListNum = 10;
    }
    var postData = {
        limit : rowListNum,
        status : $("#status").val(),
        mainTask : $("#main_task").val(),
        taskType : $("#task_type").val(),
        workType : $("#work_type").val()
    };
    return postData;
}

function queryTask(){
    $("#taskList").jqGrid('setGridParam', {postData: getTaskParam()}).jqGrid('setGridParam', {'page': 1}).trigger("reloadGrid");
}

function getCount(){
    $.ajax({
        url : path + "/task/getCount",
        type : "post",
        data : {},
        success : function(req){
            console.log(req);
            $("#goingTaskCount").html(req.goingCount);
            $("#toGetTaskCount").html(req.toGetCount);
            $("#finishTaskCount").html(req.finishCount);
            $("#searchTotal").html($(".active .red").html());
        }
    })
}

function getSelectOptions(){
    $.ajax({
        url : path + "/task/querySelectOptions",
        type : "post",
        data : {},
        success :function(req){
            console.log(req);
            leo.getSelectOptionFromJson("task_type", req.task_type, true);
            leo.getSelectOptionFromJson("work_type", req.work_type, true);
            leo.getSelectOptionFromJson("main_task", req.main_task, true);
            if(procId != 'null'){
                $("#main_task").find("option[value='" + procId + "']").prop("selected",true);
            }
        }
    })
}
