function showTask() {
    var url = path + "/task/queryTaskList";
    var postData = getTaskParam();
    var colNames = ["ID__", "PROC_INST_ID_", "任务类型", "任务主题", "工作类型", "发布人", "参与人", "状态", /*"环节",*/ "操作"];
    var colModel = [
        {"index": "ID__", "name": "ID__", "editable": false, hidden: true},
        {"index": "PROC_INST_ID_", "name": "PROC_INST_ID_", "editable": false, hidden: true},
        {"index": "TASK_TYPE", "name": "TASK_TYPE", "editable": false},
        {"index": "SUBJECT", "name": "SUBJECT", "editable": false},
        {"index": "WORK_TYPE", "name": "WORK_TYPE", "editable": false},
        {"index": "CREATOR__", "name": "CREATOR__", "editable": false},
        {"index": "PATICIPANT", "name": "PATICIPANT", "editable": false},
        {"index": "STATUS", "name": "STATUS", "editable": false},
        // {"index": "STEP", "name": "STEP", "editable": false},
        {"index": "action", "name": "action", "editable": false}
    ];
    // $("#taskList").jqGrid({
    //     url: url,
    //     datatype: 'json',
    //     mtype: "POST",
    //     postData: postData,
    //     colNames: colNames,
    //     colModel: colModel,
    //     height: 'auto',
    //     width: "100%",
    //     autowidth: true,
    //     jsonReader: {
    //         root: "data",
    //         page: "pageIndex",
    //         total: "totalPage",
    //         records: "2",
    //         repeatitems: false,
    //         id: "0"
    //     },
    //     viewrecords: true,
    //     multiselect: true,
    //     altRows: true,
    //     //rownumbers:true,
    //     //rownumWidth:30,
    //     rowNum: 10,
    //     rowList: [10, 20, 30],
    //     pager: "#taskPager",
    //     gridComplete: function () {
    pfs.comm.initJqGrid(url, postData, "taskList", "taskPager", colNames, colModel, function () {
        setJqGridPagerStyle("taskPager");

        var ids = $("#taskList").jqGrid('getDataIDs');
        var taskStatus;
        var alldata;
        for (var i = 0; i < ids.length; i++) {
            taskStatus = $("#taskList").jqGrid('getRowData', ids[i]).STATUS;
            alldata = $("#taskList").jqGrid('getRowData', ids[i]);
            var cl = ids[i];
            var ocl = "";
            var str = "";

            //ocl = "id='jEditButton_" + cl + "' onclick='editContract(\"" + cl + "\")'; onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
            //str += "<div title='编辑数据' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + ocl + "><span class='ace-icon glyphicon glyphicon-edit bigger-110'></span></div>";
            var type = $("#status").val();
            if (type === '0') {
                ocl += "<div title=\"任务详情\" style=\"float:left;cursor:pointer;margin-right:4px;color: #6497d9;\" class=\"ui-pg-div ui-inline-edit\" id=\"jDealButton_1\" onclick=\"dealTask('" + cl + "', 'view');\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover')\"><span class=\"glyphicon glyphicon-zoom-in\"></span></div>";
                ocl += "<div title=\"进度详情\" style=\"float:left;cursor:pointer;margin-right:4px;color: #6497d9;\" class=\"ui-pg-div ui-inline-edit\" id=\"jDealButton_1\" onclick=\"showModal('" + cl + "', 'view');\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover')\"><span class=\"glyphicon glyphicon-random\"></span></div>";
                if (taskStatus.indexOf("待发布") !== -1) {
                    ocl += "<div title=\"验收\" style=\"float:left;cursor:pointer;margin-right:4px;color: #6497d9;\" class=\"ui-pg-div ui-inline-edit\" id=\"jDealButton_1\" onclick=\"validate('" + cl + "', 'accept');\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover')\"><span class=\"glyphicon glyphicon-send\"></span></div>";
                }
                // ocl += "<span title=\"查看\" name=\"deal\" class=\"cz\" onclick=\"dealTask('" + cl + "', 'view');\">详情</span>";
                // ocl += "<span title=\"查看\" name=\"deal\" class=\"cz\" onclick=\"showModal('" + cl + "', 'view');\">进度</span>";
            } else {
                // ocl += "<span title=\"查看\" class=\"cz\" onclick=\"dealTask('" + cl + "', 'view');\">查看</span>";
                ocl += "<div title=\"查看\" style=\"float:left;cursor:pointer;margin-right:4px;color: #6497d9;\" class=\"ui-pg-div ui-inline-edit\" id=\"jDealButton_1\" onclick=\"dealTask('" + cl + "', 'view');\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover')\"><span class=\"glyphicon glyphicon-zoom-in\"></span></div>";
                if (taskStatus.indexOf("审定") !== -1 && '2' === type) {
                    ocl += "<div title=\"进度详情\" style=\"float:left;cursor:pointer;margin-right:4px;color: #6497d9;\" class=\"ui-pg-div ui-inline-edit\" id=\"jDealButton_1\" onclick=\"showModal('" + cl + "', 'view');\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover')\"><span class=\"glyphicon glyphicon-random\"></span></div>";
                    ocl += "<div title=\"审定\" style=\"float:left;cursor:pointer;margin-right:4px;color: #6497d9;\" class=\"ui-pg-div ui-inline-edit\" id=\"jDealButton_1\" onclick=\"validate('" + cl + "', 'validate');\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover')\"><span class=\"glyphicon glyphicon-send\"></span></div>";
                    // ocl += "<span title=\"审定\" class=\"cz\" onclick=\"validate('" + cl + "', 'validate');\">审定</span>";
                }

                if (taskStatus.indexOf("预审") !== -1 && '2' === type) {
                    ocl += "<div title=\"预审\" style=\"float:left;cursor:pointer;margin-right:4px;color: #6497d9;\" class=\"ui-pg-div ui-inline-edit\" id=\"jDealButton_1\" onclick=\"validate('" + cl + "', 'accept');\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover')\"><span class=\"glyphicon glyphicon-send\"></span></div>";
                    // ocl += "<span title=\"审定\" class=\"cz\" onclick=\"validate('" + cl + "', 'validate');\">审定</span>";
                }

                if (taskStatus.indexOf("验收") !== -1 && '3' === type) {
                    ocl += "<div title=\"进度详情\" style=\"float:left;cursor:pointer;margin-right:4px;color: #6497d9;\" class=\"ui-pg-div ui-inline-edit\" id=\"jDealButton_1\" onclick=\"showModal('" + cl + "', 'view');\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover')\"><span class=\"glyphicon glyphicon-random\"></span></div>";
                    ocl += "<div title=\"验收\" style=\"float:left;cursor:pointer;margin-right:4px;color: #6497d9;\" class=\"ui-pg-div ui-inline-edit\" id=\"jDealButton_1\" onclick=\"validate('" + cl + "', 'accept');\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover')\"><span class=\"glyphicon glyphicon-send\"></span></div>";
                    // ocl += "<span title=\"验收\" class=\"cz\" onclick=\"validate('" + cl + "', 'accept');\">验收</span>";
                }
                if (taskStatus.indexOf("领取") !== -1 && '1' === type) {
                    ocl += "<div title=\"领取\" style=\"float:left;cursor:pointer;margin-right:4px;color: #6497d9;\" class=\"ui-pg-div ui-inline-edit\" id=\"jDealButton_1\" onclick=\"updateTask('" + cl + "', 'receive');\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover')\"><span class=\"glyphicon glyphicon-save\"></span></div>";
                    // ocl += "<span title=\"领取\" class=\"cz\" onclick=\"updateTask('" + cl + "', 'receive');\">领取</span>";
                }
                if (taskStatus.indexOf("汇报") !== -1 && '1' === type) {
                    ocl += "<div title=\"汇报\" style=\"float:left;cursor:pointer;margin-right:4px;color: #6497d9;\" class=\"ui-pg-div ui-inline-edit\" id=\"jDealButton_1\" onclick=\"reportTask('" + cl + "', 'report');\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover')\"><span class=\"glyphicon glyphicon-open\"></span></div>";
                    // ocl += "<span title=\"汇报\" class=\"cz\" onclick=\"reportTask('" + cl + "', 'report');\">汇报</span>";
                }
            }
            str += "<div style='margin-left:8px;'>" + ocl + "</div>";
            $("#taskList").jqGrid('setRowData', ids[i], {action: str});
            if (queryType === 'finish') {
                $("span[name='deal']").hide();
            } else {
                $("span[name='deal']").show();
            }

            //}
        }
    })
    // $("#taskList").jqGrid({
    //     url: url,
    //     datatype: 'json',
    //     mtype: "POST",
    //     postData: postData,
    //     colNames: colNames,
    //     colModel: colModel,
    //     height: 'auto',
    //     width: "100%",
    //     autowidth: true,
    //     jsonReader: {
    //         root: "data",
    //         page: "pageIndex",
    //         total: "totalPage",
    //         records: "2",
    //         repeatitems: false,
    //         id: "0"
    //     },
    //     viewrecords: true,
    //     //multiselect: true,
    //     altRows: true,
    //     //rownumbers:true,
    //     //rownumWidth:30,
    //     shrinkToFit:false,
    //     autoScroll: true,
    //     rowNum: 10,
    //     rowList: [10, 20, 30],
    //     pager: "#taskPager",
    //     gridComplete: function () {
    //         pfs.comm.setJqGridPagerStyle("taskPager");
    //         var ids = $("#taskList").jqGrid('getDataIDs');
    //         var taskStatus;
    //         for (var i = 0; i < ids.length; i++) {
    //             taskStatus = $("#taskList").jqGrid('getRowData', ids[i]).STATUS;
    //             console.log(taskStatus);
    //             var cl = ids[i];
    //             var ocl = "";
    //             var str = "";
    //
    //             //ocl = "id='jEditButton_" + cl + "' onclick='editContract(\"" + cl + "\")'; onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
    //             //str += "<div title='编辑数据' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + ocl + "><span class='ace-icon glyphicon glyphicon-edit bigger-110'></span></div>";
    //             if ($("#status").val() === '0') {
    //                 ocl += "<span title=\"查看\" name=\"deal\" class=\"cz\" onclick=\"dealTask('" + cl + "', 'view');\">详情</span>";
    //                 ocl += "<span title=\"查看\" name=\"deal\" class=\"cz\" onclick=\"showModal('" + cl + "', 'view');\">进度</span>";
    //             } else {
    //                 ocl += "<span title=\"查看\" class=\"cz\" onclick=\"dealTask('" + cl + "', 'view');\">查看</span>";
    //                 if (taskStatus.indexOf("领取") != -1) {
    //                     ocl += "<span title=\"领取\" class=\"cz\" onclick=\"updateTask('" + cl + "', 'receive');\">领取</span>";
    //                 }
    //                 if (taskStatus.indexOf("汇报") != -1) {
    //                     ocl += "<span title=\"汇报\" class=\"cz\" onclick=\"reportTask('" + cl + "', 'report');\">汇报</span>";
    //                 }
    //             }
    //             str += "<div style='margin-left:8px;'>" + ocl + "</div>";
    //             $("#taskList").jqGrid('setRowData', ids[i], {action: str});
    //             if (queryType === 'finish') {
    //                 $("span[name='deal']").hide();
    //             } else {
    //                 $("span[name='deal']").show();
    //             }
    //
    //         }
    //     }
    // });
}

var setJqGridPagerStyle = function (id, width) {
    var next_pager = '<span title="下一页" class="glyphicon glyphicon-chevron-right"></span>';
    var last_pager = '<span title="末页" class="glyphicon glyphicon-forward"></span>';
    var prev_pager = '<span title="上一页" class="glyphicon glyphicon-chevron-left"></span>';
    var first_pager = '<span title="首页" class="glyphicon glyphicon-backward"></span>';
    $('#next_' + id).empty().append(next_pager);
    $('#last_' + id).empty().append(last_pager);
    $('#prev_' + id).empty().append(prev_pager);
    $('#first_' + id).empty().append(first_pager);
    if (width) {
        $('#' + id + '_center').css("width", width);  //设置分页条宽度
    } else {
        $('#' + id + '_center').css("width", "800px");  //设置分页条宽度
    }
};

/**
 * Function 查询需要审定的信息
 * Description
 * Author 王恒
 * Date 2018/7/1 13:40
 */
function validate(rowId, type) {
    var data = $("#taskList").jqGrid("getRowData", rowId);
    // debugger
    var procId = data.PROC_INST_ID_;

    $.ajax({
        url: path + "/task/validateTask",
        type: "post",
        data: {
            procId: procId,
            username: userName,
            type: type
        },
        success: function (rep) {
            debugger;
            pfs.comm.deal(rep.TASKID, rep.BIZID, rep.PROCID);
        }
    })

}

/**
 * Function 领取任务
 * Description 更新任务状态-领取
 * Author 王恒
 * Date 2018/6/15 15:58
 */
function updateTask(rowId, type) {
    debugger;
    var data = $("#taskList").jqGrid("getRowData", rowId);
    console.log(data);
    var procId = data.PROC_INST_ID_;
    console.log(procId);
    if ("receive" === type) {
        $.ajax({
            url: path + "/task/updateTaskStatus",
            type: "post",
            data: {
                procId: procId,
                username: userName,
                type: type
            },
            success: function () {
                pfs.comm.msg("领取成功!");
                queryTask();
            },
            error: function () {
                pfs.comm.msg("领取失败,请稍后重试!");
                queryTask();
            }
        })
    }
    getCount()
}

/**
 * Function 显示汇报模态框并初始化参数
 * Author 王恒
 * Date 2018/6/15 15:58
 */
function reportTask(rowId, type) {
    $("#reportModal").modal("show");
    var data = $("#taskList").jqGrid("getRowData", rowId);
    console.log(data);
    $("#taskType").val(data.TASK_TYPE);
    $("#taskSubject").val(data.SUBJECT);
    $("#workType").val(data.WORK_TYPE);
    $("#taskPublisher").val(data.CREATOR__);
    // $("#progress").val("100%");
    $("#taskStatus").val(data.STATUS);
    $("#PROC_INST_ID_").val(data.PROC_INST_ID_);
    getCount();
}

/**
 * Function 修改按钮方法
 * Author 王恒
 * Date 2018/6/15 15:58
 */
function report(type) {
    debugger;
    var procId = $("#PROC_INST_ID_").val();
    var progress = $("#progress").val();
    var reportDetails = $("#reportDetails").val();
    if ('change' === type) {
        if (progress !== "" && reportDetails !== "") {
            $.ajax({
                url: path + "/task/updateTaskStatus",
                type: "post",
                data: {
                    procId: procId,
                    username: userName,
                    progress: progress,
                    reportDetails: reportDetails,
                    type: type
                },
                success: function () {
                    pfs.comm.msg("修改成功!");
                    $("#reportModal").modal("hide");
                    queryTask();
                },
                error: function () {
                    pfs.comm.msg("修改失败,请稍后重试!");
                    $("#reportModal").modal("hide");
                    queryTask();
                }
            })
        } else {
            pfs.comm.msg("信息填写不完整!");
            queryTask();
        }
    }
}

/**
 * Function 用于流转审批
 * Description 处理审批任务
 * Author 王恒
 * Date 2018/7/1 13:41
 */
function dealTask(rowId, type) {
    debugger;
    var data = $("#taskList").jqGrid("getRowData", rowId);
    console.log(data);

    $.ajax({
        url: path + "/task/queryProcDataByProcId",
        type: "post",
        data: {
            procId: data.PROC_INST_ID_
        },
        success: function (req) {
            console.log(req);
            if (req.success) {
                if (type === 'deal') {
                    pfs.comm.deal(req.task_id, data.ID__, data.PROC_INST_ID_);
                    getCount();
                } else {
                    pfs.comm.sqck(req.proc_def_id, data.ID__, data.PROC_INST_ID_, req.task_id);
                }
            } else {
                pfs.comm.error("办理失败")
            }
        }
    })
}

/**
 * Function 统计当前所查任务数量
 * Description 根据用户姓名查询统计当前所查任务数量
 * Author 王恒
 * Date 2018/7/1 13:42
 */
function getCount() {
    $.ajax({
        url: path + "/task/getCountNo",
        type: "post",
        data: {
            userName: userName,
            userId: userId
        },
        success: function (req) {
            console.log(req);
            $("#publishCount").html(req.publishCount);
            $("#joinCount").html(req.joinCount);
            $("#reviewCount").html(req.reviewCount);
            $("#checkCount").html(req.checkCount);
            // $("#searchTotal").html($(".active .red").html());
        }
    })
}

/**
 * 获取查询任务所需参数
 * @returns {{limit: (*|jQuery), status: (*|jQuery), task_status: (*|jQuery), taskType: (*|jQuery), workType: (*|jQuery)}}
 */
function getTaskParam() {
    // var data = $("#taskList").jqGrid("getRowData", rowId);
    var rowListNum = $("#taskList").jqGrid('getGridParam', 'rowNum');
    console.log("rowListNum:" + rowListNum);
    if (rowListNum === undefined) {
        rowListNum = 10;
    }
    var postData = {
        username: userName,
        userId: userId,
        limit: rowListNum,
        status: $("#status").val(),
        task_status: $("#task_status").val(),
        taskType: $("#task_type").val(),
        workType: $("#work_type").val()
    };
    return postData;
}

/**
 * Function 查询我发布的任务
 * Author 王恒
 * Date 2018/6/6 0:17
 */
function publishTask() {
    console.log("publishTask()");
    $("#publishTask").addClass("active");
    $("#joinTask").removeClass("active");
    $("#reviewTask").removeClass("active");
    $("#checkTask").removeClass("active");
    getSelectOption();
    // toggleOptionShow($('#task_type'),'',[0,1,3]);
    toggleOptionShow($('#task_status'), '', [2, 4, 6]);
    // toggleOptionShow($('#work_type'),[0,1,3],'');
    $("#status").val('0');
    queryTask();
    getCount();
}

/**
 * Function 查询我参与的任务
 * Author 王恒
 * Date 2018/6/6 0:18
 */
function joinTask() {
    console.log("joinTask()");
    $("#publishTask").removeClass("active");
    $("#joinTask").addClass("active");
    $("#reviewTask").removeClass("active");
    $("#checkTask").removeClass("active");
    getSelectOption();
    // toggleOptionShow($('#task_type'),'',[0,1,3]);
    toggleOptionShow($('#task_status'), '', [1, 3, 5, 6, 7, 8]);
    // toggleOptionShow($('#work_type'),[0,1,3],'');

    $("#status").val('1');
    getCount();
    queryTask();
}

/**
 * Function 查询我审核的任务
 * Author 王恒
 * Date 2018/6/6 0:18
 */
function reviewTask() {
    console.log("2()");
    $("#publishTask").removeClass("active");
    $("#joinTask").removeClass("active");
    $("#reviewTask").addClass("active");
    $("#checkTask").removeClass("active");
    getSelectOption();
    toggleOptionShow($('#task_status'), '', [1, 2, 6, 4, 5]);
    $("#status").val('2');

    getCount();
    queryTask();
}

/**
 * Function 查询我验收的任务
 * Author 王恒
 * Date 2018/6/6 0:19
 */
function checkTask() {
    console.log("checkTask()");
    $("#publishTask").removeClass("active");
    $("#joinTask").removeClass("active");
    $("#reviewTask").removeClass("active");
    $("#checkTask").addClass("active");
    getSelectOption();
    toggleOptionShow($('#task_status'), '', [1, 2, 3, 4, 5, 6, 7]);
    $("#status").val('3');
    getCount();
    queryTask();
}


/**
 * 查询任务方法
 */
function queryTask() {
    $("#taskList").jqGrid('setGridParam', {postData: getTaskParam()}).jqGrid('setGridParam', {'page': 1}).trigger("reloadGrid");
}

/**
 * Function 查询 任务类型,工作类型,任务状态 下拉选
 * Author 王恒
 * Date 2018/6/6 0:47
 */
function getSelectOption() {
    $.ajax({
        url: path + "/task/querySelectOptions",
        type: "post",
        data: {username: userName},
        async: false,
        success: function (req) {
            console.log(req);
            leo.getSelectOptionFromJson("task_type", req.task_type, true);
            leo.getSelectOptionFromJson("work_type", req.work_type, true);
            leo.getSelectOptionFromJson("task_status", req.task_status, true);
            //if(procId != 'null'){
            //    $("#main_task").find("option[value='" + procId + "']").prop("selected",true);
            //}
        }
    })
}

/**
 * Function 显示模态框
 * Description 点击查看按钮显示任务参与人的任务完成情况
 * Author 王恒
 * Date 2018/6/11 18:08
 */
function showModal(rowId, type) {
    //获取当前所选列数据列
    var data = $("#taskList").jqGrid("getRowData", rowId);
    // var status = $("#status").val();
    console.log(data);
    $("#taskModal").modal("show");
    showDetailTask(type, rowId);
}

/**
 * Function 关闭模态框
 * Author 王恒
 * Date 2018/6/11 18:10
 */
function closeModal() {
    $("#taskModal").modal("hide");
}

function showDetailTask(type, rowId) {
    var data = $("#taskList").jqGrid("getRowData", rowId);

    var url = path + "/task/queryDetailTaskList?random=" + Math.random();
    var postData = getTaskParam();
    postData.procId = data.PROC_INST_ID_;
    console.log(postData);
    // debugger;
    var colNames = ["ID__", "PROC_INST_ID_", "任务类型", "任务主题", "工作类型", "发布人", "参与人", "状态", "进度"/*, "操作"*/];
    var colModel = [
        {"index": "ID__", "name": "ID__", "editable": false, hidden: true},
        {"index": "PROC_INST_ID_", "name": "PROC_INST_ID_", "editable": false, hidden: true},
        {"index": "TASK_TYPE", "name": "TASK_TYPE", "editable": false},
        {"index": "SUBJECT", "name": "SUBJECT", "editable": false},
        {"index": "WORK_TYPE", "name": "WORK_TYPE", "editable": false},
        {"index": "CREATOR__", "name": "CREATOR__", "editable": false},
        {"index": "PARTICIPANT", "name": "PARTICIPANT", "editable": false},
        {"index": "STATUS", "name": "STATUS", "editable": false},
        {"index": "PROGRESS", "name": "PROGRESS", "editable": false}
        // {"index": "action", "name": "action", "editable": false}
    ];
    // pfs.comm.initJqGrid(url, postData, "taskDetailList", "taskDetailPager", colNames, colModel, function () {
    //     pfs.comm.setJqGridPagerStyle("taskDetailPager");
    //     var ids = $("#taskDetailList").jqGrid('getDataIDs');
    //     for (var i = 0; i < ids.length; i++) {
    //
    //         var cl = ids[i];
    //         var ocl = "";
    //         var str = "";
    //
    //         // ocl = "id='jEditButton_" + cl + "' onclick='editContract(\"" + cl + "\")'; onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
    //         // str += "<div title='编辑数据' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + ocl + "><span class='ace-icon glyphicon glyphicon-edit bigger-110'></span></div>";
    //         // if ($("#status").val() === 1) {
    //         debugger;
    //         // type = $("#status").val();
    //         if ("view" === type) {
    //             ocl += "<span title=\"查看\" class=\"cz\" onclick=\"deal('" + cl + "', 'view');\">查看</span>";
    //         } else {
    //             ocl += "<span title=\"办理\" name=\"deal\" class=\"cz\" onclick=\"dealTask('" + cl + "', 'deal');\">" + "测试" + "</span>";
    //         }
    //         str += "<div style='margin-left:8px;'>" + ocl + "</div>";
    //         $("#taskDetailList").jqGrid('setRowData', ids[i], {action: str});
    //         if (queryType == 'finish') {
    //             $("span[name='deal']").hide();
    //         } else {
    //             $("span[name='deal']").show();
    //         }
    //
    //     }
    // });
    $("#taskDetailList").jqGrid({
        url: url,
        datatype: 'json',
        mtype: "POST",
        postData: postData,
        colNames: colNames,
        colModel: colModel,
        height: 'auto',
        width: "100%",
        autowidth: true,
        jsonReader: {
            root: "data",
            page: "pageIndex",
            total: "totalPage",
            records: "2",
            repeatitems: false,
            id: "0"
        },
        viewrecords: true,
        //multiselect: true,
        altRows: true,
        // rownumbers:true,
        // rownumWidth:30,
        shrinkToFit: false,
        autoScroll: true,
        rowNum: 10,
        rowList: [10, 20, 30],
        pager: "#taskDetailPager",
        gridComplete: function () {
            pfs.comm.setJqGridPagerStyle("taskDetailPager");
            var ids = $("#taskDetailList").jqGrid('getDataIDs');
            for (var i = 0; i < ids.length; i++) {

                var cl = ids[i];
                var ocl = "";
                var str = "";

                // ocl = "id='jEditButton_" + cl + "' onclick='editContract(\"" + cl + "\")'; onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
                // str += "<div title='编辑数据' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + ocl + "><span class='ace-icon glyphicon glyphicon-edit bigger-110'></span></div>";
                // if ($("#status").val() === 1) {
                // debugger;
                // type = $("#status").val();
                if ("view" === type) {
                    ocl += "<span title=\"查看\" class=\"cz\" onclick=\"deal('" + cl + "', 'view');\">查看</span>";
                } else {
                    ocl += "<span title=\"办理\" name=\"deal\" class=\"cz\" onclick=\"dealTask('" + cl + "', 'deal');\">" + "测试" + "</span>";
                }
                str += "<div style='margin-left:8px;'>" + ocl + "</div>";
                $("#taskDetailList").jqGrid('setRowData', ids[i], {action: str});
                if (queryType === 'finish') {
                    $("span[name='deal']").hide();
                } else {
                    $("span[name='deal']").show();
                }

            }
        }
    });
    $("#taskDetailList").jqGrid('setGridParam', {postData: postData}).jqGrid('setGridParam', {'page': 1}).trigger("reloadGrid");
}


/*参数说明：
需被控制的Select对象，
需显示的option序号(留空则不处理) eg:[0,1,3]，
需隐藏的option序号(留空则不处理) eg:[2,4,6]
*/
function toggleOptionShow(obj, arrShow, arrHide) {
    function arrHandle(arr, type) {
        if ($.isArray(arr)) {
            var len = arr.length;
            for (i = 0; i < len; i++) {
                var optionNow = obj.find("option").eq(arr[i]);
                var optionP = optionNow.parent("span");
                if (type == "show") {
                    if (optionP.size()) {
                        optionP.children().clone().replaceAll(optionP);
                    }
                } else {
                    if (!optionP.size()) {
                        optionNow.wrap("<span style='display:none'></span>");
                    }
                }
            }
        }
    }

    arrHandle(arrShow, "show");
    arrHandle(arrHide, "hide");
}

// toggleOptionShow($('#task_type'),'',[0,1,3]);
// toggleOptionShow($('#task_status'),[0,1,3],'');
// toggleOptionShow($('#work_type'),[0,1,3],'');

$(document).ready(function () {
    getSelectOption();
    // pfs.comm.valid("updateForm");
    $("#status").val('1');
    getCount();
    showTask();
    if ('0' === $("#status").val()) {
        $("#publishTask").addClass("active");
        $("#joinTask").removeClass("active");
        $("#reviewTask").removeClass("active");
        $("#checkTask").removeClass("active");
        toggleOptionShow($('#task_status'), '', [2, 4, 6]);
    }

    if ('1' === $("#status").val()) {
        $("#publishTask").removeClass("active");
        $("#joinTask").addClass("active");
        $("#reviewTask").removeClass("active");
        $("#checkTask").removeClass("active");
        toggleOptionShow($('#task_status'), '', [1, 3, 5, 6, 7, 8]);
    }
    if ('2' === $("#status").val()) {
        $("#publishTask").removeClass("active");
        $("#joinTask").removeClass("active");
        $("#reviewTask").addClass("active");
        $("#checkTask").removeClass("active");
        toggleOptionShow($('#task_status'), '', [1, 2, 6, 4, 5]);
    }

    if ('3' === $("#status").val()) {
        $("#publishTask").removeClass("active");
        $("#joinTask").removeClass("active");
        $("#reviewTask").removeClass("active");
        $("#checkTask").addClass("active");
        toggleOptionShow($('#task_status'), '', [1, 2, 3, 4, 5, 6, 7]);
    }


});
