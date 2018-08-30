$(function() {
  debugger;
  //在表单页面增加include jsp容器，用来装载子列表
  // $("#sqxx_div").append(str);

  var page = formPage.split("_")[1];
  //在jsp容器中添加Jqgrid
  // initTargetStandard();
  // $("#add").click(function () {
  //     addExpense2();
  // });
  // initModal();

  //为责任人输入框添加点击事件
  $("#principal").click(function() {
    initPrincipalModal()
  });
});
var str = "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\" style=\"margin-left: 2%;z-index: 20\">\n" +
  "    <div class=\"form-group\" id=\"commonDetail\" style='margin: 0 auto'>\n" +
  "        <label class=\"col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label  gray-color\" id=\"name\"></label>\n" +
  "        <button id=\"add\" name=\"operate\" class=\"btn btn-primary btn-sm\" type=\"button\"\n" +
  "                style=\"margin-right: 10px; margin-left: 30%;width: 80px\">\n" +
  "            <i class=\"ace-icon fa fa-undo bigger-110\"></i>新增\n" +
  "        </button>\n" +
  "        <button id=\"del\" name=\"operate\" class=\"btn btn-primary btn-sm\" type=\"button\" onclick=\"delExpense1();\"\n" +
  "                style=\"margin-left: 10px;width: 80px\">\n" +
  "            <i class=\"ace-icon fa fa-undo bigger-110\"></i>删除\n" +
  "        </button>\n" +
  "    </div>\n" +
  "</div>\n" +
  "<div id=\"detailTableDiv\">\n" +
  "    <table id=\"detailTableList\"></table>\n" +
  "    <div id=\"detailTablePager\"></div>\n" +
  "</div>";


var initPrincipalModal = function() {
  $('#myModal').modal('show');
  $("#jqgridDiv").width('100%');
  var colNames = ['value', '姓名', '工号', '所在机构'];
  var colModel = [

    {
      "index": "value",
      "name": "value",
      "editable": false,
      hidden: true
    },
    {
      "index": "name",
      "name": "name",
      "editable": false,
      width: 240
    },
    {
      "index": "code",
      "name": "code",
      "editable": false,
      width: 240
    },
    {
      "index": "orgname",
      "name": "orgname",
      "editable": false,
      width: 240
    }
  ];

  $("#jqgridDiv").wdgJQGrid("jqgridlist", "jqgridDiv", {

    url: pfs.comm.basePath + 'wf/user',
    datatype: 'json',
    mtype: "GET",
    postData: {
      userId: candidateUsers,
      orgIds: candidateOrgs,
      groupIds: candidateGroups
    },
    colNames: colNames,
    colModel: colModel,
    height: 'auto',
    viewrecords: true,
    multiselect: false,
    rownumbers: true,
    rownumWidth: 30,
    rowNum: 10,
    rowList: [10, 20, 30],
    pager: "#pager",
    gridComplete: function() {
      setPagerStyle();
    }
  });
};

var initTargetStandard = function() {
  console.log("START INIT JQGRID ");
  var url = path + "expense/queryDetailedList";
  var postData = {};
  console.log(postData);

  var colNames = ["id", "PROC_INST_ID_", "指标名称", "指标值", "操作"];
  var colModel = [{
      "index": "ID",
      "name": "ID",
      "editable": false,
      hidden: true
    },
    {
      "index": "PROC_INST_ID_",
      "name": "PROC_INST_ID_",
      "editable": false,
      hidden: true
    },
    {
      "index": "TAR_NAME",
      "name": "TAR_NAME",
      "editable": true,
      editType: "textarea",
      width: '30%'
    },
    {
      "index": "TAR_VALUE",
      "name": "TAR_VALUE",
      "editable": true,
      editType: "textarea",
      width: '60%'
    },
    {
      "index": "action",
      "name": "action",
      "editable": false,
      align: "center",
      width: '10%'
    }
  ];

  pfs.comm.initJqNoPageGrid(url, postData, "detailTableList", "detailTablePager", colNames, colModel, 30, function() {
    pfs.comm.delJqGridPagerStyle("detailTablePager");
    var ids = $("#detailTableList").jqGrid('getDataIDs');
    //只在填写环节启用编辑按钮
    if (formPage.split("_")[1] === 'sqtb') {
      for (var i = 0; i < ids.length; i++) {
        var rowId = ids[i];
        var html = "";
        var str = "";

        html = "id='jEditButton_" + rowId + "' onclick='editDetailTable(\"" + rowId + "\")'; onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
        str += "<div title='编辑数据' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + html + "><span class='ace-icon glyphicon glyphicon-edit bigger-110'></span></div>";

        html = "<div style='margin-left:8px;'>" + str + "</div>";
        $("#detailTableList").jqGrid('setRowData', ids[i], {
          action: html
        });
      }
    }
  });
  console.log("initGrid Over")

};

//获取责任人(或下一个环节执行人)
var getPrincipal = function() {
  var rowid = $("#jqgridlist").jqGrid('getGridParam', 'selrow');
  if (rowid == null || rowid == "") {
    pfs.comm.showDialog("请指定下一环节操作人！", 'warning', function() { //"error","warning","info","success"
      return;
    })
  }
  var rowdata = jQuery("#jqgridlist").getRowData(rowid);
  $("#principal").val(rowdata.value);
  $('#myModal').modal('hide');

}

//增加
var addExpense1 = function(wftype) {
  console.log("addExpense wftype", wftype);
  console.log("adddetailTable wftype=", wftype);
  var ids = $("#detailTableList").jqGrid('getDataIDs');
  console.log(ids);
  var rowId = ids.length + 1;
  $("#detailTableList").jqGrid("addRowData", rowId, " ");
  editDetailTable(rowId);
  $("#" + rowId + "_EXPENSE_TYPE").val(wftype);
  $("#" + rowId + "_EXPENSE_TYPE").attr("disabled", "true");
  // setTotal();
};

//增加
var addExpense2 = function() {
  var tableList = $("#detailTableList");
  var ids = tableList.jqGrid('getDataIDs');
  console.log(ids);
  var rowId = ids.length + 1;
  tableList.jqGrid("addRowData", rowId, " ");
  editDetailTable(rowId);
  // $("#" + rowId + "_EXPENSE_TYPE").val();
  // setTotal();
};

//编辑
var editDetailTable = function(rowId) {
  debugger;
  $("#detailTableList").jqGrid('editRow', rowId);
  document.getElementById(rowId + "TAR_NAME").readOnly = true;
  document.getElementById(rowId + "TAR_VALUE").readOnly = true;
  // $("#" + rowId + "_APPLY_DATE").css({"background-color": "#ffffff"});
  // $("#" + rowId + "_AMOUNT").keyup(function () {
  // 如果输入非数字，则替换为''
  // this.value = this.value.replace(/[^\d]/g, '');
  // })
};
