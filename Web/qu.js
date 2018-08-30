var idxNew = function() {
  leo.redirectPage("spring:framework/quartzMng/viewFormPage", {
    op: "new",
    exe_type: $.toJSON(exe_type),
    data: "{}"
  });
};
var editByRowId = function(c, a) {
  var d = "edit";
  if (a) {
    d = a;
  }
  var b = leo.getJqgridRowDataByRowid("idxQuartzMngList", c, "action");
  leo.redirectPage("spring:framework/quartzMng/viewFormPage", {
    op: d,
    exe_type: $.toJSON(exe_type),
    data: $.toJSON(b)
  });
};
var deleteByRowId = function(b) {
  var a = leo.getJqgridRowDataByRowid("idxQuartzMngList", b, "action");
  leo.confirm("删除", "确定要删除所选吗?", function(c) {
    if ("yes" == c) {
      leo.jqAjax({
        type: "DELETE",
        url: "spring:framework/quartzMng/job/" + leo.mixEncode(a.TRIGGER_GROUP) + "/" + leo.mixEncode(a.TRIGGER_NAME),
        success: function(f, d) {
          leo.alert(leo.INFO, f.msg, function() {
            $("#idxQuartzMngList").jqGrid().trigger("reloadGrid");
          });
        },
        error: function(f, d) {
          leo.alert(leo.ERROR, "服务器内部错误");
        }
      });
    }
  });
};
var pauseByRowId = function(b) {
  var a = leo.getJqgridRowDataByRowid("idxQuartzMngList", b, "action");
  leo.confirm("暂停任务", "确定要暂停所选吗?", function(c) {
    if ("yes" == c) {
      leo.jqAjax({
        url: "spring:framework/quartzMng/pausejob",
        data: {
          TRIGGER_GROUP: a.TRIGGER_GROUP,
          TRIGGER_NAME: a.TRIGGER_NAME
        },
        success: function(f, d) {
          leo.alert(leo.INFO, f.msg, function() {
            $("#idxQuartzMngList").jqGrid().trigger("reloadGrid");
          });
        },
        error: function(f, d) {
          leo.alert(leo.ERROR, "服务器内部错误");
        }
      });
    }
  });
};
var resumeByRowId = function(b) {
  var a = leo.getJqgridRowDataByRowid("idxQuartzMngList", b, "action");
  leo.confirm("恢复任务", "确定要恢复所选吗?", function(c) {
    if ("yes" == c) {
      leo.jqAjax({
        url: "spring:framework/quartzMng/resumejob",
        data: {
          TRIGGER_GROUP: a.TRIGGER_GROUP,
          TRIGGER_NAME: a.TRIGGER_NAME
        },
        success: function(f, d) {
          leo.alert(leo.INFO, f.msg, function() {
            $("#idxQuartzMngList").jqGrid().trigger("reloadGrid");
          });
        },
        error: function(f, d) {
          leo.alert(leo.ERROR, "服务器内部错误");
        }
      });
    }
  });
};
var excuteOnceByRowId = function(b) {
  var a = leo.getJqgridRowDataByRowid("idxQuartzMngList", b, "action");
  leo.confirm("立即执行一次", "确定要立即执行一次所选吗?", function(c) {
    if ("yes" == c) {
      leo.jqAjax({
        url: "spring:framework/quartzMng/executeOneceJob",
        data: {
          TRIGGER_GROUP: a.TRIGGER_GROUP,
          TRIGGER_NAME: a.TRIGGER_NAME
        },
        success: function(f, d) {
          leo.alert(leo.INFO, f.msg, function() {});
        },
        error: function(f, d) {
          leo.alert(leo.ERROR, "服务器内部错误");
        }
      });
    }
  });
};
var initidxGrid = function() {
  leo.creatResizeableJqgrid("idxQuartzMngList", "idx", {
    url: "spring:framework/quartzMng/job",
    datatype: "json",
    mtype: "GET",
    caption: "任务列表",
    multiselect: false,
    rownumbers: false,
    rownumWidth: 30,
    height: 350,
    viewrecords: true,
    colModel: [{
      "editable": false,
      "name": "ID",
      "index": "ID",
      label: "编号",
      "hidden": true,
      align: "center",
      width: 0
    }, {
      "editable": false,
      "name": "TRIGGER_GROUP",
      "index": "TRIGGER_GROUP",
      label: "任务组名",
      width: 150
    }, {
      "editable": false,
      "name": "TRIGGER_NAME",
      "index": "TRIGGER_NAME",
      label: "任务名称",
      width: 150
    }, {
      "editable": false,
      "name": "EXETYPE",
      "index": "EXETYPE",
      formatter: "select",
      editoptions: {
        value: exe_type
      },
      label: "任务类型",
      width: 100
    }, {
      "editable": false,
      "name": "BEAN_ID",
      "index": "BEAN_ID",
      label: "BEAN_ID",
      width: 200,
      hidden: true
    }, {
      "editable": false,
      "name": "INVOKE_METHOD",
      "index": "INVOKE_METHOD",
      label: "INVOKE_METHOD",
      width: 250,
      hidden: true
    }, {
      "editable": false,
      "name": "FIRSTTIME",
      "index": "FIRSTTIME",
      label: "第一次执行时间",
      width: 150
    }, {
      "editable": false,
      "name": "INTERVALMINUTES",
      "index": "INTERVALMINUTES",
      label: "分钟间隔",
      width: 80
    }, {
      "editable": false,
      "name": "INTERVALSECONDS",
      "index": "INTERVALSECONDS",
      label: "秒间隔",
      width: 80
    }, {
      "editable": false,
      "name": "HOUR",
      "index": "HOUR",
      label: "小时",
      width: 80
    }, {
      "editable": false,
      "name": "MINUTES",
      "index": "MINUTES",
      label: "分钟",
      width: 80
    }, {
      "editable": false,
      "name": "WEEKDAY",
      "index": "WEEKDAY",
      label: "星期",
      width: 80
    }, {
      "editable": false,
      "name": "DAYOFMONTH",
      "index": "DAYOFMONTH",
      label: "每月第几天",
      width: 100
    }, {
      "editable": false,
      "name": "TRIGGER_EXPRESSION",
      "index": "TRIGGER_EXPRESSION",
      label: "时间表达式",
      width: 150
    }, {
      "editable": false,
      "name": "MEMO",
      "index": "MEMO",
      label: "备注",
      "hidden": true,
      width: 150
    }, {
      "editable": false,
      "name": "STATUS",
      "index": "STATUS",
      label: "状态",
      "hidden": true,
      width: 150
    }, {
      name: "action",
      index: "action",
      label: "操作",
      width: 130
    }],
    rowNum: 10,
    rowList: [10, 20, 30],
    pager: jQuery("#idxgridQuartzMngPager"),
    hidegrid: false,
    altRows: true,
    autowidth: true,
    gridComplete: function() {
      var c = jQuery("#idxQuartzMngList").jqGrid("getDataIDs");
      for (var b = 0; b < c.length; b++) {
        var a = c[b];
        var f = "";
        var g = "";
        f = "id='jEditButton_" + a + "' onclick='editByRowId(\"" + a + "\")'; onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
        g += "<div title='编辑任务' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + f + "><span class='ui-icon ace-icon fa fa-pencil blue'></span></div>";
        f = "id='jDeleteButton_" + a + "' onclick='deleteByRowId(\"" + a + "\")'; onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
        g += "<div title='删除任务' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + f + "><span class='ui-icon ace-icon fa fa-trash-o red'></span></div>";
        var d = leo.getJqgridRowDataByRowid("idxQuartzMngList", a, "action");
        if (d.STATUS != "3") {
          f = "id='jDeleteButton_" + a + "' onclick='pauseByRowId(\"" + a + "\")'; onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
          g += "<div title='暂停任务' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + f + "><span class='ui-icon ace-icon fa fa-pause orange'></span></div>";
        } else {
          f = "id='jDeleteButton_" + a + "' onclick='resumeByRowId(\"" + a + "\")'; onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
          g += "<div title='恢复任务' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + f + "><span class='ui-icon ace-icon fa fa-play green'></span></div>";
        }
        f = "id='jDeleteButton_" + a + "' onclick='excuteOnceByRowId(\"" + a + "\")'; onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
        g += "<div title='立即执行一次' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + f + "><span class='ui-icon ace-icon fa fa-tag '></span></div>";
        g = "<div style='margin-left:8px;'>" + g + "</div>";
        $("#idxQuartzMngList").jqGrid("setRowData", c[b], {
          action: g
        });
      }
    }
  });
};
var idxQuery = function() {
  var a = {
    "TRIGGER_GROUP": $("#TRIGGER_GROUP").val(),
    "TRIGGER_NAME": $("#TRIGGER_NAME").val(),
    "EXETYPE": $("#EXETYPE").val(),
    "FIRSTTIME": $("#FIRSTTIME").val()
  };
  $("#idxQuartzMngList").jqGrid("setGridParam", {
    postData: a
  }).jqGrid("setGridParam", {
    "page": 1
  }).trigger("reloadGrid");
};
$(document).ready(function() {
  $("#FIRSTTIME").datetimepicker({
    format: "yyyy-mm-dd hh:ii:ss",
    language: "zh-CN",
    autoclose: true,
    clearBtn: true
  });
  leo.getSelectOptionFromJson("EXETYPE", exe_type, true);
  initidxGrid();
});
try {
  ace.settings.check("breadcrumbs", "fixed");
} catch (e) {}
