str = "id='jViewButton_" + rowId + "' onclick=\"showDetailProc('" + supProcId + "');\" onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
html += "<div title='查看' style='float:left;cursor:pointer;margin-right:4px;color: #6497d9;' class='ui-pg-div ui-inline-edit' " + str + "><span class='glyphicon glyphicon-zoom-in'></span></div>";


办理：glyphicon glyphicon-check
编辑：glyphicon glyphicon-edit
查看：glyphicon glyphicon-zoom-in
删除：glyphicon glyphicon-trash
重置：glyphicon glyphicon-repeat
收藏：glyphicon glyphicon-star
