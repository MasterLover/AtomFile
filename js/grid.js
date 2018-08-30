function initJqGridList() {
  console.log("START INIT ZYMB JqGrid");
  debugger
  leo.creatResizeableJqgrid('zymbList', 'idx', {
    url: 'spring:zymbController/queryList',
    datatype: 'json',
    mtype: "POST",
    caption: "学院目标",
    multiselect: true,
    rownumbers: false,
    rownumWidth: 30,
    height: 350,
    colNames: ['ID', '目标名称', '目标指标', '责任部门', '部门负责人', '开始时间', '结束时间', '年限', '已完成', '未完成', '定性/定量', '操作'],
    colModel: [{
        "index": "ID",
        "name": "ID",
        "editable": false,
        hidden: true
      },
      {
        "index": "TARGET_NAME",
        "name": "TARGET_NAME",
        "editable": false
      },
      {
        "index": "TARGET_VALUE",
        "name": "TARGET_VALUE",
        "editable": false
      },
      {
        "index": "ZRBM",
        "name": "ZRBM",
        "editable": false
      },
      {
        "index": "BMFZR",
        "name": "BMFZR",
        "editable": false
      },
      {
        "index": "START_TIME",
        "name": "START_TIME",
        "editable": false
      },
      {
        "index": "END_TIME",
        "name": "END_TIME",
        "editable": false
      },
      {
        "index": "TERM",
        "name": "TERM",
        "editable": false
      },
      {
        "index": "ACCOMPLISH",
        "name": "ACCOMPLISH",
        "editable": false
      },
      {
        "index": "WWC",
        "name": "WWC",
        "editable": false
      },
      {
        "index": "IS_NUM",
        "name": "IS_NUM",
        "editable": false
      },
      {
        "index": "action",
        "name": "action",
        "editable": false,
        hidden: true
      }
    ],
    viewrecords: true,
    rowNum: 10,
    rowList: [10, 20, 30],
    pager: jQuery('#zymbPager'),
    hidegrid: false,
    altRows: true,
    autowidth: true,
    gridComplete: function() {
      var ids = $("#zymbList").jqGrid('getDataIDs');
      for (var i = 0; i < ids.length; i++) {

        var cl = ids[i];
        var ocl = "";
        var str = "";

        ocl = "id='jEditButton_" + cl + "' onclick='editByRowId(\"" + cl + "\")'; onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
        str += "<div title='编辑数据' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + ocl + "><span class='ui-icon ace-icon fa fa-pencil blue'></span></div>";

        ocl = "id='jDeployButton_" + cl + "' onclick='deployByRowId(\"" + cl + "\")'; onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
        str += "<div title='发布目标' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + ocl + "><span class='ui-icon ace-icon fa fa-check-square-o purple'></span></div>";

        str = "<div style='margin-left:8px;'>" + str + "</div>";
        $("#zymbList").jqGrid('setRowData', ids[i], {
          action: str
        });

      }
    }
  });


}


// 封装 加载jqgrid 待完善
var initJqGridTable = function(tbID, tbList, tbPage, url, colNames, colModel, tbName) {
  leo.creatResizeableJqgrid(tbList, tbID, {
    url: url,
    datatype: 'json',
    mtype: 'POST',
    caption: tbName,
    multiselect: true,
    rownumbers: false,
    rownumWidth: 30,
    height: 350,
    colNames: colNames,
    colModel: colModel,
    viewrecords: true,
    rowNum: 10,
    rowList: [10, 20, 30],
    pager: jQuery('#' + tbPage),
    hidegrid: false,
    altRows: true,
    autowidth: true,
    gridComplete: function() {
      var ids = $("#" + tbList).jqGrid('getDataIDs');
      for (var i = 0; i < ids.length; i++) {
        var cl = ids[i];
        var ocl = "";
        var str = "";

        ocl = "id='jEditButton_" + cl + "' onclick='editByRowId(\"" + cl + "\")'; onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
        str += "<div title='编辑数据' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + ocl + "><span class='ui-icon ace-icon fa fa-pencil blue'></span></div>";

        ocl = "id='jDeployButton_" + cl + "' onclick='deployByRowId(\"" + cl + "\")'; onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
        str += "<div title='发布目标' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + ocl + "><span class='ui-icon ace-icon fa fa-check-square-o purple'></span></div>";

        str = "<div style='margin-left:8px;'>" + str + "</div>";
        $("#" + tbList).jqGrid('setRowData', ids[i], {
          action: str
        });

      }
    }
  });
};


<div title="删除数据" style="float:left;cursor:pointer;" class="ui-pg-div ui-inline-edit" id="jDelButton_1" onclick=\"dealTask('" + cl + "', 'view');" onmouseover="jQuery(this).addClass('ui-state-hover');" onmouseout="jQuery(this).removeClass('ui-state-hover')"><span class="ui-icon ace-icon fa fa-trash-o red"></span></div>
ocl += "<div title=\"任务详情\" style=\"float:left;cursor:pointer;\" class=\"ui-pg-div ui-inline-edit\" id=\"jDealButton_1\" onclick=\"dealTask('" + cl + "', 'view');\" onmouseover=\"jQuery(this).addClass('ui-state-hover');\" onmouseout=\"jQuery(this).removeClass('ui-state-hover')\"><span class=\"glyphicon glyphicon-zoom-in\"></span></div>";
