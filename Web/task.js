function getProjectParam() {
    var rowListNum = $("#pipelineList").jqGrid('getGridParam', 'rowNum');
    console.log("rowListNum:" + rowListNum);
    if (rowListNum === undefined) {
        rowListNum = 10;
    }
    var postData = {
        limit: rowListNum,
        project_type: $("#project_type").val()
    };
    return postData;
}

var confirm = function (type) {
    var data = $("#" + type).tree("getChecked");
    var users = "";
    for (var i = 0; i < data.length; i++) {
        if (data[i].id.charAt(0) !== "D") {
            users += "@" + data[i].text + "  ";
        }
    }
    if (type === "paticipantTree") {
        $("#paticipant").val(users);
        parent.Validform.check(false, "#paticipant");
    }
    if (type === "responsibilityUserTree") {
        $("#responsibility_user").val(users);
        parent.Validform.check(false, "#responsibility_user");
    }
    if (type === "copyToUserTree") {
        $("#copy_to_user").val(users);
        parent.Validform.check(false, "#copy_to_user");
    }
    $("#paticipantModal").modal("hide");
    $("#responsibilityUserModal").modal("hide");
    $("#copyToUserModal").modal("hide");

};

var loadUserTree = function () {
    var treeurl = 'spring:/task/loadUserTree';
    pfs.comm.loadTree("paticipantTree", treeurl, true, function () {
    });
    pfs.comm.loadTree("responsibilityUserTree", treeurl, true, function () {
    });
    pfs.comm.loadTree("copyToUserTree", treeurl, true, function () {
    });
};

var loadProjectTree = function () {
    var treeurl = "spring:../project/loadTree";
    pfs.comm.loadTree("projectTree", treeurl, false, function () {

    })
};

function confirmProject() {
    var id = pfs.comm.selectInfo.id;
    if (id !== "project" && id !== "project_table" && id !== "pipeline" && id !== "wisdragon" && id !== "production") {
        $("#project_code").val(id);
        $("#project_name").val(pfs.comm.selectInfo.name);
        parent.Validform.check(false, "#project_name");

        $.ajax({
            url: path + "/task/queryContractCode",
            type: "post",
            data: {
                projectCode: id
            },
            success: function (req) {
                $("#contract_code").val(req.contractCode);
                $("#customer_name").val(req.customerName);
                $('#projectModal').modal("hide");
            }
        })
    }
}

var initModalClose = function () {
    //检测到模态框点击关闭按钮
    $('#paticipantModal').on('hidden.bs.modal', function () {
        confirm("paticipantTree");//该处为fullcalendar的回调函数，与bootstrap无关。
    });
    //检测到模态框点击关闭按钮
    $('#responsibilityUserModal').on('hidden.bs.modal', function () {
        confirm("responsibilityUserTree");//该处为fullcalendar的回调函数，与bootstrap无关。
    });
    //检测到模态框点击关闭按钮
    $('#copyToUserModal').on('hidden.bs.modal', function () {
        confirm("copyToUserTree");//该处为fullcalendar的回调函数，与bootstrap无关。
    });
    //检测到模态框点击关闭按钮
    $('#projectModal').on('hidden.bs.modal', function () {
        confirmProject();//该处为fullcalendar的回调函数，与bootstrap无关。
    })
};

var changeHasMainTask = function () {
    var hasMainTask = $("#has_main_task").val();
    if (hasMainTask === "1") {
        $("#main_task").parent().parent().parent().show();
        $("#percentage").parent().parent().parent().show();

    } else {
        $("#main_task").parent().parent().parent().hide();
        $("#percentage").parent().parent().parent().hide();
        if (formPage.split("_")[1] === "sqtb") {
            $("#responsibility_user").val('');
            $("#paticipant").val('');

            $("#copy_to_user").val('');
            //$("#project_name").val('');
            //$("#project_code").val('');
            $("#contract_code").val('');
            $("#percentage").attr("placeholder", "");
            $("#main_task").val('0');
        }
    }
};


//保存并提交
/**
 * Change:添加 whichsubmit 用于判断是否为审定人及验收人审批环节
 * By 王恒
 * Date 2018/6/10 17:50
 */
var saveAndSend = function (type) {
    debugger;
    console.log(task_def_key);
    var whitchsubmit;
    var validateAndAccept;
    //审定人审批环节

    if (task_def_key === "validate_") {
        whitchsubmit = "validate_";
        debugger;
        validateAndAccept = queryTaskStatusFromRecord();
    }
    // //验收人审批环节
    if (task_def_key === "ysrspNoHQ") {
        whitchsubmit = "ysrsp";
    }
    //填报
    if ("taskPublish" === task_def_key) {
        whitchsubmit = "tb";
    }
    if (task_def_key === "zcsp" || task_def_key === "zgfzcsp") {
        whitchsubmit = "xyys";
    }
    var url = path + "/task/submitAndSend";
    var data = {
        procId: pfs.comm.getUrlArgObject().PROC_INST_ID_,
        operate: type,
        taskId: pfs.comm.getUrlArgObject().TASK_ID_,
        workType: $("#work_type").val(),
        taskType: $("#task_type").val(),
        precedence: $("#priority").val(),
        task_subject: $("#subject").val(),
        creator: $("#user_name").val(),
        participants: $("#paticipant").val(),
        //priority : $("#priority").val(),
        mainTask: $("#main_task").val(),
        whitchsubmit: whitchsubmit,
        approveOption: $('input:radio:checked').val()
    };
    console.log(data);
    if (type === 'save') {
        pfs.comm.saveForm(url, data)
    } else {
        if (typeof (validateAndAccept) === "undefined" || validateAndAccept) {
            pfs.comm.saveAndSubmit(url, data);
        } else {
            pfs.comm.showDialog("请在参与人完成任务后审定!")
        }
    }
};


function queryTaskStatusFromRecord() {
    var check;
    $.ajax({
        url: path + "/task/queryTaskStatusFromRecord",
        type: "post",
        async: false,
        data: {
            procId: pfs.comm.getUrlArgObject().PROC_INST_ID_
        },
        success: function (req) {
            if (req.success) {
                check = req.check;
            }
        }
    });
    return check;

};


function changeMainTask() {
    var mainTask = $("#main_task").val();
    $.ajax({
        url: path + "/task/queryPeople",
        type: "post",
        data: {
            mainTask: mainTask
        },
        success: function (req) {
            console.log(req);
            if (req.success) {
                $("#responsibility_user").val(req.responsibilityUser);
                $("#paticipant").val(req.participant);
                $("#copy_to_user").val(req.copyToUser);
                $("#project_name").val(req.projectName);
                $("#project_code").val(req.projectCode);
                $("#contract_code").val(req.contractCode);
                $("#percentage").attr("placeholder", "当前任务最多可领取" + req.remain_percentage + "%");
            } else {
                pfs.comm.error(req.msg)
            }
        }
    })

}

function loadClickTree() {
    $("#paticipant").click(function () {
        $("#paticipantModal").modal("show");
    });
    $("#responsibility_user").click(function () {
        $("#responsibilityUserModal").modal("show");
    });
    $("#copy_to_user").click(function () {
        $("#copyToUserModal").modal("show");
    });
    $("#project_name").click(function () {
        $("#projectModal").modal("show");
    });
    // $("#project_code").click(function () {
    //     $("#projectModal").modal("show");
    // });
    loadProjectTree();
}

var showSqtb = function () {
    $("#user_name").val(userName);
    $("#user_code").val(userCode);
    $("#department").val(department);
    $("#create_date").val(pfs.comm.getNowFormatDate());

    $("#title").val("任务发布审核");
    $("#msg").val(userName + "发布了一个任务请您审核！");
    $("#title").parent().parent().parent().hide();
    $("#msg").parent().parent().parent().hide();

    //任务发布主流程
    if (task_def_key === "taskPublish") {
        loadClickTree();
        changeHasMainTask();
        $("#has_main_task").change(function () {
            changeHasMainTask();
        });
    }
    //     $(".btn-success:contains('保存并提交')").attr("onclick", "saveAndSend('submit')");
    //     $(".btn-primary:contains('保存')").attr("onclick", "saveAndSend('save')");
    // } else {
    //     $(".btn-success:contains('保存并提交')").attr("onclick", "saveAndSend('submit')");
    //     $(".btn-primary:contains('保存')").attr("onclick", "saveAndSend('save')");
    // }

    //主线任务发布
    if (task_def_key === "mainTaskPublish") {
        $("#has_main_task_readonly").parent().parent().parent().hide();
        $("#is_main_task").parent().parent().parent().hide();
        $("#status").parent().parent().parent().hide();
        $("#percentage").parent().parent().parent().hide();

        loadClickTree();
        //设置默认选中
        $("#task_type").find("option[value='main_task']").prop("selected", true);
        //设置不可操作
        $("#task_type").attr("disabled", "true");
    }
    //日常任务发布
    if (task_def_key === "dailyTaskPublish") {
        loadClickTree();
        changeHasMainTask();
        $("#has_main_task").change(function () {
            changeHasMainTask();
        });
        //设置默认选中
        $("#task_type").find("option[value='daily_task']").prop("selected", true);
        //设置不可操作
        $("#task_type").attr("disabled", "true");
    }
    //售前方案任务发布
    if (task_def_key === "schemeTaskPublish") {
        loadClickTree();
        changeHasMainTask();
        $("#has_main_task").change(function () {
            changeHasMainTask();
        });
        //设置默认选中
        $("#task_type").find("option[value='scheme_task']").prop("selected", true);
        //设置不可操作
        $("#task_type").attr("disabled", "true");
        //设置默认选中
        $("#work_type").find("option[value='presales']").prop("selected", true);
        //设置不可操作
        $("#work_type").attr("disabled", "true");
    }

    if (task_def_key === "evectionTaskPublish") {
        loadClickTree();
        changeHasMainTask();
        $("#has_main_task").change(function () {
            changeHasMainTask();
        });
        //设置默认选中
        $("#task_type").find("option[value='evection_task']").prop("selected", true);
        //设置不可操作
        $("#task_type").attr("disabled", "true");
        console.log($("#task_type").val())
    }
    if (task_def_key === "presalesPurchaseTask") {
        showPurchaseSqtb('presales');
    }
    if (task_def_key === "administrationPurchaseTask") {
        showPurchaseSqtb('administration');
    }
    if (task_def_key === "salesPurchaseTask") {
        showPurchaseSqtb('sales');
    }
    if (task_def_key === "productPurchaseTask") {
        showPurchaseSqtb('product');
    }
    if (task_def_key === "deliveryPurchaseTask") {
        showPurchaseSqtb('delivery');
    }
    if (task_def_key === "companyPurchaseTask") {
        showPurchaseSqtb('company');
    }

    loadUserTree();
    initModalClose();
};

// function saveAndSendSubProcess(type) {
//     var procDefKey = "";
//     var taskType = $("#task_type").val();
//     var workType = $("#work_type").val();
//
//     if (taskType === "purchase_task") {
//         procDefKey = taskType + "_" + workType;
//     } else {
//         procDefKey = taskType;
//     }
//     var url = path + "/task/saveAndSendSubProcess?random=" + Math.random();
//     var data = {
//         type: type,
//         procId: pfs.comm.getUrlArgObject().PROC_INST_ID_,
//         participants: $("#paticipant").val(),
//         procDefKey: procDefKey
//     };
//     if (type === 'save') {
//         pfs.comm.saveForm(url, data)
//     } else {
//         pfs.comm.saveAndSubmit(url, data);
//     }
// }

function showPurchaseSqtb(workType) {
    loadClickTree();
    changeHasMainTask();
    $("#has_main_task").change(function () {
        changeHasMainTask();
    });
    //设置默认选中
    $("#task_type").find("option[value='purchase_task']").prop("selected", true);
    //设置不可操作
    $("#task_type").attr("disabled", "true");
    //设置默认选中
    $("#work_type").find("option[value='" + workType + "']").prop("selected", true);
    //设置不可操作
    $("#work_type").attr("disabled", "true");
}


var scale = function (btn, bar, p_title) {
    this.btn = document.getElementById(btn);
    this.bar = document.getElementById(bar);
    this.p_title = document.getElementById(p_title);
    // this.step = this.bar.getElementsByTagName("div")[0];

    this.init = function () {
        var f = this, g = document, b = window, m = Math;
        f.btn.onmousedown = function (e) {
            var x = (e || b.event).clientX;
            var l = this.offsetLeft;
            var max = f.bar.offsetWidth - this.offsetWidth;
            g.onmousemove = function (e) {
                var thisX = (e || b.event).clientX;
                var to = m.min(max, m.max(-2, l + (thisX - x)));
                f.btn.style.left = to + 'px';
                f.ondrag(m.round(m.max(0, to / max) * 100), to);
                b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
            };
            g.onmouseup = new Function('this.onmousemove=null');
        };
    };
    this.ondrag = function (pos, x) {
        this.step.style.width = Math.max(0, x) + 'px';
        this.p_title.innerHTML = pos + '%';
    };
    this.init();
};


var setReadOnly = function () {
    document.getElementById("user_name").readOnly = true;
    document.getElementById("user_code").readOnly = true;
    document.getElementById("department").readOnly = true;
    document.getElementById("create_date").readOnly = true;
    document.getElementById("start_date").readOnly = true;
    document.getElementById("end_date").readOnly = true;
    // document.getElementById("paticipant").readOnly = true;
    // document.getElementById("responsibility_user").readOnly = true;
    // document.getElementById("copy_to_user").readOnly = true;
    document.getElementById("project_code").readOnly = true;
    // document.getElementById("project_name").readOnly = true;
    document.getElementById("contract_code").readOnly = true;
    //document.getElementById("customer_name").readOnly = true;
    $("#customer_name").attr("readOnly", true);
};


var progressHtml = '　 <div class="scale" id="bar" style="width:100%;margin-left:0px; height: 20px;"> ' +
    '<div id="area" style=" height: 20px;"></div> <span id="btn" style=" height: 30px;"></span>' +
    ' </div><div style="margin-bottom: 10px">任务进度：<span id="p_title">0</span></div> '
    + ' <div> <button class="btn btn-success" type="button" onclick="saveProgress()"> '
    + ' 汇报进度 </button> </div> <div>                                                       '
    + ' <button class="btn btn-primary" type="button" onclick="shutTask()"> 完成任务 </button> </div>';

var shutTask = function () {
    var progress = $("#p_title").text();
    if ("100%" === progress) {
        $("#delivery_time").val(pfs.comm.getNowFormatDate());
        console.log(progress);
        var url = path + "/task/submitAndSend";
        var data = {
            procId: pfs.comm.getUrlArgObject().PROC_INST_ID_,
            operate: "shutTask"
        };

        $("#progress").val("100%");
        pfs.comm.saveAndSubmit(url, data);
    } else {
        pfs.comm.showDialog("任务进度不足!");
    }


};

var saveProgress = function () {
    var progress = $("#p_title").text();
    console.log(progress);
    $("#delivery_time").val('');
    $("#progress").val(progress);
    var data = {
        progress: progress,
        userName: userName,
        subject: $("#subject").val(),
        mainTask: $("#main_task_readonly").val(),
        participant: $("#paticipant").val(),
        responsibilityUser: $("#responsibility_user").val(),
        copyToUser: $("#copy_to_user").val(),
        startDate: $("#start_date").val(),
        endDate: $("#end_date").val(),
        taskHours: $("#task_hours").val(),
        expectGoal: $("#expect_goal").val(),
        description: $("#description").val()
    };

    $.ajax({
        url: path + "/task/reportProgress",
        type: "post",
        data: {
            taskData: JSON.stringify(data),
            procId: pfs.comm.getUrlArgObject().PROC_INST_ID_,
            mainTask: $("#main_task_readonly").val()
        },
        success: function (req) {
            console.log(req);
            if (req.success) {
                pfs.comm.msg(req.msg);
                // setTimeout('location.reload()',1000);
            }
        }
    })

};

function initProgress() {
    var progress = $("#progress").val();
    if (progress !== undefined || progress !== "" || progress != null) {
        console.log(progress);
        $("#p_title").text(progress);
        var totalWidth = $("#bar").width();
        var width = (totalWidth / 100) * parseFloat(progress.split("%")[0]);
        $("#area").attr("style", "height: 20px;width:" + width + "px;");
        $("#btn").attr("style", "height: 30px;left:" + width + "px;");
    }
    // new scale('btn', 'bar', 'p_title'); //实例化一个拖拽
}

//领取任务，重写提交方法
function getTask() {
    var url = path + "/task/submitAndSend";
    var data = {
        procId: pfs.comm.getUrlArgObject().PROC_INST_ID_,
        operate: "getTask"
    };
    pfs.comm.saveAndSubmit(url, data);
}

var showSp = function () {
    $("#project_code").parent().attr("style", "width:50%");
    if (task_def_key === 'getTask' || task_def_key === 'getMainTask') {
        $(".btn-success").text('确认领取任务');
        $(".btn-success:contains('确认领取任务')").attr("onclick", "getTask();");
        $("#get_time").parent().parent().parent().hide();
        $("#get_time").val(pfs.comm.getNowFormatDate())
    }
    if (task_def_key === 'reportProgress') {
        console.log("report Progress");
        $(".btn-success").hide();
        $("#progress").parent().parent().hide();
        $("#delivery_time").parent().parent().hide();
        $(".btn-success").parent().prepend(progressHtml);
        initProgress();
    }
    var hasMainTask = $("#has_main_task_readonly").val();
    if (hasMainTask === "1") {
        $("#main_task_readonly").parent().parent().parent().show();
        $("#percentage").parent().parent().parent().show();
    } else {
        if (task_def_key !== 'getMainTask' && task_def_key !== 'reportProgress') {
            // $("#percentage").parent().parent().parent().hide();
        }
        $("#main_task_readonly").parent().parent().parent().hide();

    }
    //$("#status").parent().parent().parent().hide();

};

function showSqck() {
    $("#title").parent().parent().parent().hide();
    $("#msg").parent().parent().parent().hide();
    $("#progress").parent().parent().parent().hide();
    $("#remain_percentage").parent().parent().parent().hide();
    $("#is_main_task").parent().parent().parent().hide();
    $("#status").parent().parent().parent().hide();
    $("#APPROVE_OPTION").parent().parent().parent().hide();
    $("#evaluate").parent().parent().parent().hide();
    $("#IS_AGREE").prev().hide();

    $("#project_code").parent().attr("style", "width:50%");
    $("#percentage").parent().attr("style", "width:50%");

    var hasMainTask = $("#has_main_task_readonly").val();

    console.log("hasMainTask:" + hasMainTask);
    if (hasMainTask === "1") {
        $("#main_task_readonly").parent().parent().parent().show();
        $("#percentage").parent().parent().parent().show();
    } else {
        $("#main_task_readonly").parent().parent().parent().hide();
        $("#percentage").parent().parent().parent().hide();
    }
    $("#status").parent().parent().parent().hide();
    var html = '　 <div class="scale" id="bar" style="width:100%;margin-left:0px; height: 20px;"> ' +
        '<div id="area" style=" height: 20px;"></div> </div> <span id="btn" style=" height: 30px;"></span>'
        + '<div style="margin-bottom: 10px">任务进度：<span id="p_title">0</span></div> ';
    // $(".btn-primary:contains('收藏')").parent().parent().prepend(html);
    initProgress();
}

function querySelectOptions() {
    $.ajax({
        url: path + "/task/querySelectOptions",
        async: false,
        type: "post",
        data: {
            username: userName
        },
        success: function (req) {
            pfs.comm.getSelectOptionFromJson("work_type", req.work_type, true);
            pfs.comm.getSelectOptionFromJson("task_type", req.task_type, true);
            pfs.comm.getSelectOptionFromJson("priority", req.priority, true);
            // pfs.comm.getSelectOptionFromJson("main_task", req.main_task, true);
            dropdown(req.main_task, $("#main_task"));
            console.log(formPage);
            var page = formPage.split("_")[1];
            console.log(page);
            if (page === "sqtb") {
                showSqtb();
                // fillSelectOptions('sqtb');
                $('#start_date').css({"background-color": "#ffffff"});
                $('#end_date').css({"background-color": "#ffffff"});
            } else {
                pfs.comm.getSelectOptionFromJson("work_type_readonly", req.work_type, true);
                pfs.comm.getSelectOptionFromJson("task_type_readonly", req.task_type, true);
                pfs.comm.getSelectOptionFromJson("priority_readonly", req.priority, true);
                // pfs.comm.getSelectOptionFromJson("main_task_readonly", req.main_task, true);
                // fillSelectOptions();
            }
            if (formPage === "pc_sp") {
                showSp();
            }
            if (page === "sqck") {
                showSqck();
            }
        }
    })
}

// function fillSelectOptions(type) {
//     $.ajax({
//         url: path + "/task/querySelectValue",
//         type: "post",
//         data: {
//             procId: pfs.comm.getUrlArgObject().PROC_INST_ID_
//         },
//         success: function (req) {
//             console.log(req);
//             if (req.success) {
//                 if (type === "sqtb") {
//                     $("#work_type").find("option[value='" + req.workType + "']").prop("selected", true);
//                     $("#task_type").find("option[value='" + req.taskType + "']").prop("selected", true);
//                     $("#priority").find("option[value='" + req.priority + "']").prop("selected", true);
//                     $("#main_task").find("option[value='" + req.mainTask + "']").prop("selected", true);
//                 } else {
//                     $("#work_type_readonly").find("option[value='" + req.workType + "']").prop("selected", true);
//                     $("#task_type_readonly").find("option[value='" + req.taskType + "']").prop("selected", true);
//                     $("#priority_readonly").find("option[value='" + req.priority + "']").prop("selected", true);
//                     $("#main_task_readonly").find("option[value='" + req.mainTask + "']").prop("selected", true);
//                 }
//             }
//         },
//         error: function () {
//             console.log("error")
//         }
//     })
// }

function hideElements(page) {
    //$("#task_type").parent().parent().parent().hide();
    if (page === "sqtb" || page === "sp") {
        //$("#percentage").parent().attr("style", "width:160px");
        //$("#project_code").parent().attr("style", "width:160px");

        //$("#status").parent().parent().parent().hide();
        //$("#is_main_task").parent().parent().parent().hide();
        //$("#remain_percentage").parent().parent().parent().hide();
        //$("#operating_percentage").parent().parent().parent().hide();
    }
    if (page === "sqck") {
        $("#percentage").parent().attr("style", "width:160px");
        $("#project_code").parent().attr("style", "width:160px");

        $("#status").parent().parent().parent().hide();
        $("#is_main_task").parent().parent().parent().hide();
        $("#remain_percentage").parent().parent().parent().hide();
        $("#operating_percentage").parent().parent().parent().hide();
    }
    if (task_def_key === "xg") {
        $("#progress").parent().parent().parent().hide();
    }
    if (task_def_key === "rwfbrsp") {
        $("#project_code").parent().attr("style", "width:160px");
        $("#percentage").parent().attr("style", "width:160px");
    }
}

/**
 * Function 计算日期差
 * Description 传入格式为yyyy-MM-dd HH:mm:ss 格式日期计算时差
 *              该方法未进行判空请自行判空
 * Return  时间差 小时
 * Author 王恒
 * Date 2018/7/1 14:45
 */
function getTimeDiff(startDate, EndDate) {

    try {
        //转化日期格式
        var format_startDate = new Date(startDate.replace(/-/g, "/"));
        var format_EndDate = new Date(EndDate.replace(/-/g, "/"));
        var days = format_EndDate.getTime() - format_startDate.getTime();//毫秒
    } catch (e) {
        return 0;
    }
    //保留一位小数
    //四舍五入取整可用Math.round();
    return (days / 1000 / 60 / 60).toFixed(1);
}

$(function () {
    // debugger
    var page = formPage.split("_")[1];
    setReadOnly();
    timeVerify();
    if (page == "sqck") {
        $("#deliverables").parent().parent().hide();
        debugger;
        var startDate = $("#get_time").val();
        var develive_time = $("#delivery_time").val();
        if (typeof startDate === 'undefined' || startDate === "" || typeof develive_time === 'undefined' || develive_time === "") {
            // $("#real_hours").val("待汇报")
        } else {
            var diffTime = getTimeDiff(startDate, develive_time);
            console.log(diffTime);
            $("#real_hours").val(diffTime);
        }
    }
    // $('input[type=radio][name=IS_AGREE]').change(function () {
    // if (this.value === '1') {
    //     alert("Allot Thai Gayo Bhai");
    // }
    // else if (this.value === '2') {
    //     alert("Transfer Thai Gayo");
    // }
    // });


    // $(".radio-inline").on('click',function () {
    //     console.log($("#"))
    // });

    //hideElements(page);
    /**
     * Function 审定人审批时重写保存提交
     * Author 王恒
     * Date 2018/6/10 17:32
     */
    querySelectOptions();
    if (page === "sqck") {
        setReadOnlyTask();

    }
    if (page === "sqtb") {
        // $("#status").val("pre_review");
        $(".btn-success:contains('保存并提交')").attr("onclick", "saveAndSend('tb')");
        $(".btn-primary:contains('保存')").attr("onclick", "saveAndSend('save')");
    }
    if (page === "sp") {
        setReadOnlyTask();
        console.log("重写保存提交");
        // $("#status").val("pre_feedback");
        $(".btn-success:contains('提交')").attr("onclick", "saveAndSend('submit')");


    }

});


/**
 * 设置只读
 */
var setReadOnlyTask = function () {
    $.post({
        url: path + "/task/queryReadOnlyTask",
        // async: false,
        data: {
            PROC_INST_ID_: pfs.comm.getUrlArgObject().PROC_INST_ID_
        },
        success: function (data) {
            $("#task_type_readonly").val(data.TASK_TYPE);
            $("#priority_readonly").val(data.PRIORITY_);
            $("#work_type_readonly").val(data.WORK_TYPE);
            $("#main_task_readonly").append('<option value="MAIN_TASK">' + data.MAIN_TASK + '</option>');
            // $("#work_type_readonly").find("option[value='"+data.WORK_TYPE+"']").attr("selected",true);
            // $("#priority_readonly").find("option[value='"+data.PRIORITY_+"']").attr("selected",true);
            // $("#main_task_readonly").find("option[value='"+data.TASK_TYPE+"']").attr("selected",true);
            // $("#main_task_readonly").val(data.MAIN_TASK);
        }
    });
};
//填充下拉选
var dropdown = function (data, element) {
    element.empty();
    if (data) {
        $.each(data, function (key, value) {
            element.append('<option value="' + key + '">' + value + '</option>');
        });
    }
};

var timeVerify = function () {

    $('#start_date').datetimepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        language: 'zh-CN',
        todayHighlight: true,
        startView: 2,
        minView: 2,//若需要选择到分钟则改为0，并且将format改为yyyy-mm-dd HH:ii
        maxView: 4
    }).on('changeDate', function (e) {
        if ($('#end_date').val() != null && $('#end_date').val() !== "" && $('#start_date').val() > $('#end_date').val()) {
            pfs.comm.showDialog("开始时间必须小于结束时间");
            $('#start_date').val("");
        }
    });

    $('#end_date').datetimepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        language: 'zh-CN',
        todayHighlight: true,
        startView: 2,
        minView: 2,
        maxView: 4
    }).on('changeDate', function (e) {
        if ($('#start_date').val() != null && $('#start_date').val() !== "" && $('#end_date').val() < $('#start_date').val()) {
            pfs.comm.showDialog("结束时间必须大于开始时间");
            $('#end_date').val("");
        }
    });
};