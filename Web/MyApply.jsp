<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="net.sf.json.JSONObject" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  <base href="<%=basePath%>">

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title>我的申请--列表</title>

  	<link rel="stylesheet" href="<%=path%>/portal/scripts/plugins/wdgjqgrid/wdgjqgrid.min.css">
	<!--[if !IE]><!-->
    <script src="<%=path%>/business/style/pc/plugins/jquery/jquery-3.2.1.min.js"></script>
    <!--<![endif]-->
    <!--[if gte IE 9]>
    <script src="<%=path%>/business/style/pc/plugins/jquery/jquery-3.2.1.min.js"></script>
    <![endif]-->

    <!--[if lt IE 9]>
    <script src="<%=path%>/business/style/pc/plugins/jquery/jquery-1.9.1.min.js"></script>
    <script src="<%=path%>/business/style/pc/plugins/PIE/PIE.js"></script>
    <script src="<%=path%>/business/style/pc/plugins/selectivizr/selectivizr-min.js"></script>
    <![endif]-->


    <script src="<%=path%>/business/style/pc/plugins/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
	<script type="text/javascript">
		var path = '<%=path%>';
		var basepath = '<%=basePath%>';
	</script>

	<script type="text/javascript" src="<%=path%>/system/leobase.js"></script>
	<script type="text/javascript" src="<%=path%>/portal/scripts/plugins/wdgjqgrid/wisdragon.jqgridPlugin.min.js"></script>
	<script type="text/javascript" src="<%=path%>/assets/js/jqGrid/i18n/grid.locale-cn.js"></script>
	<script type="text/javascript" src="<%=path%>/assets/js/jqGrid/jquery.jqGrid.min.js"></script>

	<link rel="stylesheet" href="<%=path%>/business/style/pc/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css">
    <script src="<%=path%>/business/style/pc/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
    <script src="<%=path%>/business/style/pc/plugins/bootstrap-datetimepicker/locales/bootstrap-datetimepicker.zh-CN.js"></script>

    <script type="text/javascript" src="<%=path%>/business/pages/MyApply/pc/js/_MyApply_Grid.js"></script>




</head>
<body>


    <div class="container-fluid">
        <div class="row">
            <!--header-->
           <jsp:include page="/portal/apps/include/top.jsp"/>

            <!--content-->
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 content">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 bread">
                        <span   onclick="showIndex()">首页</span>
                        <span>></span>
                        <span class="active">我的申请</span>
                    </div>

               <div class="list white-bg">
                            <div class="list_title ">
                                <div class="col-xs-6 ">
                                <span class="active tab_title">
                                    进行中<span class="red" id ="MyApplyHandCount"></span>
                                </span>
                                    <span class="tab_title">
                                    已完成 <span class="red" id="MyApplyCompletedCount"></span>
                                </span>
                                </div>
                                <div class="col-xs-6">

                                    <span class="pull-right sc_card" onclick="showMyCollection()">
                                        <i  class="glyphicon glyphicon-heart"></i>
                                        收藏夹
                                    </span>
                                  <!--   <span class="pull-right sc_card">
                                        <i  class="glyphicon glyphicon-signal"></i>
                                        数据统计
                                    </span> -->
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 list_content list_content-0" >

                            	<div class="row">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <form class="form-inline search_form">
                                            <div class="form-group col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left">
                                                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left no-padding-right form-control-static">服务名称</label>
                                                <div class=" col-lg-8 col-md-8 col-sm-8 col-xs-8  no-padding-right">
                                                    <select class="form-control" id="PROCESSSHUT">

                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left">
                                                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left no-padding-right ">
                                                    <button class="btn btn-primary " type="button" onclick="formList_btn_query('shut')">查询</button>
                                                </label>
                                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8  no-padding-right form-control-static menu-down">
                                                    展开 <i class="glyphicon glyphicon-menu-down"></i>
                                                </div>
                                            </div>
                                        </form>
                                        <form class="form-inline search_form hide-div">
                                            <div class="form-group col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left">
                                                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left no-padding-right form-control-static">服务名称</label>
                                                <div class=" col-lg-8 col-md-8 col-sm-8 col-xs-8  no-padding-right">
                                                    <select class="form-control" id="PROCESSOPEN">

                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left">
                                                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left no-padding-right form-control-static">申请编号</label>
                                                <div class=" col-lg-8 col-md-8 col-sm-8 col-xs-8   no-padding-right">
                                                    <input type="text" class="form-control "  id="SQBH">
                                                </div>
                                            </div>
                                            <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padding-left no-padding-right form-control-static">申请时间</label>
                                                <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10 date">
                                                    <div class="form-group  has-feedback">
                                                        <input type="text" class="form-control " id="startTime">
                                                        <span class="glyphicon glyphicon-calendar form-control-feedback gray-color" ></span>
                                                    </div>
                                                    <span class="gray-color">——</span>
                                                    <div class="form-group  has-feedback">
                                                        <input type="text" class="form-control " id="endTime">
                                                        <span class="glyphicon glyphicon-calendar form-control-feedback gray-color" ></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left">
                                                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left no-padding-right form-control-static">&nbsp;</label>
                                                <div class=" col-lg-8 col-md-8 col-sm-8 col-xs-8   no-padding-right">
                                                    <button class="btn btn-primary pull-left" type="button" onclick="formList_btn_query('open')">查询</button>
                                                    <button class="btn btn-block pull-right" type="reset">重置</button>
                                                </div>
                                            </div>
                                            <div class="form-group col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left">
                                                <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left no-padding-right form-control-static menu-down">
                                                    收起 <i class="glyphicon glyphicon-menu-up"></i>
                                                </label>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                  <div class="row tables_row">
                                    <div class="col-xs-12">
                                        <div class="col-xs-6 total_size">
                                            共 <span id="serchTotal"></span> 条
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="MyApply">
                                	<table id="MyApplyList"></table>
                                	<div id="MyApplyPager"></div>
                                </div>
                            </div>
                        </div>
            </div>
        </div>
    </div>
    <script>
        /**
         * 缓存变量
         * @type {{$pageSize: (*), $optionSpan: (*), $selectSpan: (*), $tabTitle: (*)}}
         */
        var el = {
            $pageSize: $('.pageSize'),
            $optionSpan: $('.option_span'),
            $selectSpan: $('.select_span'),
            $tabTitle: $('.tab_title')
        };
        /**
         * 绑定事件
         * @type {{bind: event.bind}}
         */
        var event = {
            bind: function () {
                /*模拟select*/
                el.$optionSpan.find('span').on('click', function () {
                    el.$pageSize.text($(this).text());
                    el.$optionSpan.hide();
                });

                el.$pageSize.on('click', function () {
                   el.$optionSpan.show();
                });

                el.$selectSpan.on('click', function (e) {
                    e.stopPropagation();
                });
                $('body').on('click', function () {
                    el.$optionSpan.hide();
                });

//                /*tab页切换*/
//                el.$tabTitle.on('click', function () {
//                    $(this).addClass(' active');
//                    $(this).siblings().removeClass('active');
//                    $('.list_content-'+$(this).index()).show();
//                    $('.list_content-'+$(this).index()).siblings('.list_content').hide();
//                })

                $($('.tab_title')[0]).on('click', function () {
                    $(this).addClass(' active');
                    $(this).siblings().removeClass('active');
                    $('.list_content-'+$(this).index()).show();
                    $('.list_content-'+$(this).index()).siblings('.list_content').hide();
                });

                $($('.tab_title')[1]).on('click', function () {
                    $(this).addClass(' active');
                    $(this).siblings().removeClass('active');
                    $('.list_content-'+$(this).index()).show();
                    $('.list_content-'+$(this).index()).siblings('.list_content').hide();
                });

                $($('.tab_title')[2]).on('click', function () {
                    $(this).addClass(' active');
                    $(this).siblings().removeClass('active');
                    $('.list_content-'+$(this).index()).show();
                    $('.list_content-'+$(this).index()).siblings('.list_content').hide();
                });

                $('.menu-down').on('click', function () {
                    $($('.search_form')[0]).slideToggle("fast");
                    $($('.search_form')[1]).slideToggle("fast");
                });

            }
        };

        /**
         * 绑定事件初始化
         */
        $(function () {
            setTimeout(function () {
                $($('.search_form')[1]).show().slideToggle(1);
            }, 500)
            event.bind();
        })
    </script>
</body>
</html>
