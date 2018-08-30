var showMyCollection = function(){
	window.location.href=path+'/myCollection/viewMyCollectionGrid';
}

var showIndex = function(){

	window.location.href=path+'/appcenter/toPortalPage';

}

var createQueryForm = function(processType){
	$.ajax({
		url : path + '/MyApply/getSelectOptionFromJson',
		type : 'post',
		dataType : 'json',
		data : {
			TYPE:processType
		},
		success : function(response){
			if(response.success){

				$("#PROCESSSHUT").empty();
				$("#PROCESSOPEN").empty();

				pfs.comm.getSelectOptionFromJson("PROCESSSHUT",response.Info.PROCESSNAME,true);
				pfs.comm.getSelectOptionFromJson("PROCESSOPEN",response.Info.PROCESSNAME,true);
			}
		},
		error : function(request, status){
			pfs.comm.showDialog("错误", "获取数据失败！");
		}
	});
}

var json = {};
var tabType = 'hand';
var formList_btn_query = function(type) {

	if('shut'==type){
		json = {

				'PROCESSSHUT':$("#PROCESSSHUT").val(),
			};
	}else{
		json = {

				'PROCESSOPEN':$("#PROCESSOPEN").val(),
				'SQBH':$("#SQBH").val(),
				'STARTTIME':$("#startTime").val(),
				'ENDTIME':$("#endTime").val()
			};
	}

	$("#MyApplyList").jqGrid("GridUnload");
    if('hand'==tabType){
    	initHandModel("MyApply", "MyApplyList", "MyApplyPager");
    }else{
    	initCompletedModel("MyApply", "MyApplyList", "MyApplyPager");
    }

};



//获取“进行中”数据条数
var getHandCount = function(){
	$.ajax({
		data: {},
	    type: 'POST',
	    url: path+'/MyApply/getMyApplyHandCount',
	    dataType:'json',
	    success:function(response){
	    	$('#MyApplyHandCount').empty();
			var myApplyCount_str = response.myApplyHandCount;

			$('#MyApplyHandCount').append(myApplyCount_str);

	    },
	    error : function(request, status){
			alert("错误", "获取数据失败, 请刷新重试");
		}

	});
}

//获取“已完成”数据条数
var getCompletedCount = function(){
	$.ajax({
		data: {},
	    type: 'POST',
	    url: path+'/MyApply/getMyApplyCompletedCount',
	    dataType:'json',
	    success:function(response){

	    	if(response.success){
	    	$('#MyApplyCompletedCount').empty();
			var myApplyCount_str = response.myApplyCompletedCount;
			$('#MyApplyCompletedCount').append(myApplyCount_str);

	    }
	    }
	});
}

var GridComplete = function(ret,appid){
	var ids = jQuery('#MyApplyList').jqGrid('getDataIDs');
	for(var i=0;i < ids.length;i++){
		var cl = ids[i];
		var data = leo.getJqgridRowDataByRowid('MyApplyList', ids[i], 'action');

		var	str  = '<span  title="查看" class="cz" onclick="pfs.comm.sqck(\''+data.PROC_DEF_ID_+'\',\'' + data.ID + '\',\''+data.PROC_INST_ID_+'\',\''+data.TASK_ID_+'\')">查看</span>'

		if(appid==data.APPID){
			if(ret.success){

				if(ret.isCollected){
					str  += '<span title="取消收藏" class="cz" onclick="pfs.comm.removeCollection(\''+data.APPID+'\',GridComplete)">取消收藏</span>';
				}else{
					str  += '<span title="收藏" class="cz" onclick="pfs.comm.setMyCollection(\''+data.APPID+'\',GridComplete)">收藏</span>';
				}
			}else{
				str  += '<span title="收藏" class="cz" onclick="pfs.comm.setMyCollection(\''+data.APPID+'\',GridComplete)">收藏</span>';
			}

			str = "<div style='margin-left:8px;'>" + str + "</div>";
			$('#MyApplyList').jqGrid('setRowData', ids[i], { action: str });
		}

	}

}


//初始化“进行中”列表
var initHandModel = function(parentId, tableId, pagerId) {


	var colNames = ['ID','APPID','TASK_ID_','PROC_DEF_ID_','事项', '申请编号', '申请时间', '步骤','操作'];
	var colModel = [
	    {name:'ID',index:'ID', hidden: true},
	    {name:'APPID',index:'APPID', hidden: true},
	    {name:'TASK_ID_',index:'TASK_ID_', hidden: true},
	    {name:'PROC_DEF_ID_',index:'PROC_DEF_ID_', hidden: true},
	    {name:'PROC_DEF_NAME_',index:'PROC_DEF_NAME_',width:'70%'},
	    {name:'PROC_INST_ID_',index:'PROC_INST_ID_',width:'25%'},
	    {name:'CREATE_TIME_',index:'CREATE_TIME_',width:'50%'},
	    {name:'TASK_NAME_',index:'TASK_NAME_',width:'50%'},
	    {"index":"action","name":"action","editable":false,width:'40%'}
	];

	$("#" + parentId).wdgJQGrid(tableId, parentId, {

		url: pfs.comm.basePath + 'MyApply/getMyApplyHandList',
	    datatype: 'json',
		mtype: "POST",
		postData:json,
		colNames: colNames,
		colModel: colModel,
		height: 'auto',
		viewrecords: true,
		multiselect: false,
		rownumbers:true,
	    rownumWidth:30,
		rowNum:10,
		rowList:[10,20,30],
		pager: "#" + pagerId,
		gridComplete : function(){

			var ids = jQuery('#'+tableId).jqGrid('getDataIDs');

			for(var i=0;i < ids.length;i++){
				var cl = ids[i];
				var data = leo.getJqgridRowDataByRowid('MyApplyList', ids[i], 'action');
				pfs.comm.isCollected(data.APPID, GridComplete);
			}
			setPagerStyle();
		}
	});
};

//初始化“已完成”列表
var initCompletedModel = function(parentId, tableId, pagerId) {


	var colNames = ['ID','APPID','TASK_ID_','PROC_DEF_ID_','事项', '申请编号', '申请时间', '操作'];
	var colModel = [
	    {name:'ID',index:'ID', hidden: true},
	    {name:'APPID',index:'APPID', hidden: true},
	    {name:'TASK_ID_',index:'TASK_ID_', hidden: true},
	    {name:'PROC_DEF_ID_',index:'PROC_DEF_ID_', hidden: true},
	    {name:'PROC_DEF_NAME_',index:'PROC_DEF_NAME_',width:'70%'},
	    {name:'PROC_INST_ID_',index:'PROC_INST_ID_',width:'20%'},
	    {name:'CREATE_TIME_',index:'CREATE_TIME_',width:'50%'},
	    {"index":"action","name":"action","editable":false,width:'40%'}
	];

	$("#" + parentId).wdgJQGrid(tableId, parentId, {

		url: pfs.comm.basePath + 'MyApply/getMyApplyCompletedList',
	    datatype: 'json',
		mtype: "POST",
		postData:json,
		colNames: colNames,
		colModel: colModel,
		height: 'auto',
		viewrecords: true,
		multiselect: false,
		rownumbers:true,
	    rownumWidth:30,
		rowNum:10,
		rowList:[10,20,30],
		pager: "#" + pagerId,
		gridComplete : function(){

			var ids = jQuery('#'+tableId).jqGrid('getDataIDs');

			for(var i=0;i < ids.length;i++){
				var cl = ids[i];
				var data = leo.getJqgridRowDataByRowid('MyApplyList', ids[i], 'action');
				pfs.comm.isCollected(data.APPID, GridComplete);
			}
			setPagerStyle();
		}
	});
};

/**
 * 绑定事件
 * @type {{bind: event.bind}}
 */
var defortStyle = function(){
	$($('.tab_title')[0]).on('click', function () {
	    $(this).addClass(' active');
	    $(this).siblings().removeClass('active');

	    tabType = 'hand';
	    createQueryForm('hand');
	    $("#MyApplyList").jqGrid("GridUnload");

	    initHandModel("MyApply", "MyApplyList", "MyApplyPager");
	});

	$($('.tab_title')[1]).on('click', function () {
	    $(this).addClass(' active');
	    $(this).siblings().removeClass('active');

	    tabType = 'Compelted';
	    createQueryForm('compeleted');
	    $("#MyApplyList").jqGrid("GridUnload");
	    initCompletedModel("MyApply", "MyApplyList", "MyApplyPager");
	});
}

//自定义分页
var setPagerStyle = function(){

	isSetted = true;
	var next_pager = '<span title="下一页" class="glyphicon glyphicon-chevron-right"></span>';
	var last_pager = '<span title="末页" class="glyphicon glyphicon-forward"></span>';
	var prev_pager = '<span title="上一页" class="glyphicon glyphicon-chevron-left"></span>';
	var first_pager = '<span title="首页" class="glyphicon glyphicon-backward"></span>';
	$('#next_MyApplyPager').empty().append(next_pager);
	$('#last_MyApplyPager').empty().append(last_pager);
	$('#prev_MyApplyPager').empty().append(prev_pager);
	$('#first_MyApplyPager').empty().append(first_pager);
	$('#MyApplyPager_center').css("width", "800px");  //设置分页条宽度

	if("无数据显示"==$(".ui-paging-info").text()){
		$("#serchTotal").empty().append("0");
	}else{
		$("#serchTotal").empty().append($(".ui-paging-info").text().split("共")[1].substring(0,$(".ui-paging-info").text().split("共")[1].length-1));
	}

};


//初始化模型列表
$(function(){

	$('#startTime').datetimepicker({
		format: 'yyyy-mm-dd',
        autoclose: true,
        language: 'zh-CN',
        todayHighlight: true,
        startView : 2,
        minView : 2,//若需要选择到分钟则改为0，并且将format改为yyyy-mm-dd HH:ii
        maxView : 4
    }).on('changeDate', function(e){
		if($('#endTime').val()!=null&&$('#endTime').val()!=""&&$('#startTime').val()>$('#endTime').val()){
			pfs.comm.showDialog("开始时间必须小于结束时间");
			$('#startTime').val("");
		}
	});

	$('#endTime').datetimepicker({
		format: 'yyyy-mm-dd',
        autoclose: true,
        language: 'zh-CN',
        todayHighlight: true,
        startView : 2,
        minView : 2,
        maxView : 4
    }).on('changeDate', function(e){
    	if($('#startTime').val()!=null&&$('#startTime').val()!=""&&$('#endTime').val()<$('#startTime').val()){
			pfs.comm.showDialog("结束时间必须大于开始时间");
			$('#endTime').val("");
		}
	});

	createQueryForm('hand');
	getHandCount();
	getCompletedCount();
	defortStyle();
	leo.base.basePath = pfs.comm.basePath;
	leo.base.path = pfs.comm.path;
	initHandModel("MyApply", "MyApplyList", "MyApplyPager");
});
