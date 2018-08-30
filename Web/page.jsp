<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
  <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
    <html>
      <head>
        <script type="text/javascript" src="<%=path%>/subsystem/wf/model/_viewModel.js"></script>
      </head>

      <body>
        <div class="breadcrumbs" id="breadcrumbs">
          <ul class="breadcrumb">
            <li>
              <i class="ace-icon fa fa-home home-icon"></i>
              <a href="#">首页</a>
            </li>
            <li class="active">流程管理&nbsp;>流程模型管理</li>
          </ul>
        </div>
        <div class="page-content" id="pagecontent">
          <div class="row">
            <div class="col-xs-12">
              <div class="row">
                <div class="tab-content">
                  <div id="idx">
                    <form role="form" class="form-horizontal" id="idxSearchForm">
                      <div class="form-group">
                        <div class="col-xs-3">
                          <label class="col-xs-4 control-label no-padding-right" for="NAME_">名称：</label>
                          <input class="col-xs-8" id="NAME_" type="text" data-placeholder="名称" name="NAME_" value=""/>
                        </div>
                        <div class="col-xs-3">
                          <label class="col-xs-4 control-label no-padding-right" for="VERSION_">版本：</label>
                          <input class="col-xs-8" id="VERSION_" type="text" data-placeholder="版本" name="VERSION_" value=""/>
                        </div>
                        <div class="col-xs-3">
                          <label class="col-xs-4 control-label no-padding-right" for="KEY_">KEY：</label>
                          <input class="col-xs-8" id="KEY_" type="text" data-placeholder="KEY" name="KEY_" value=""/>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-xs-3">
                          <label class="col-xs-4 control-label no-padding-right" for="CREATE_TIME_">创建时间：</label>
                          <input class="col-xs-8" id="CREATE_TIME_" type="text" data-placeholder="创建时间" name="CREATE_TIME_" value=""/>
                        </div>
                        <div class="col-xs-3">
                          <label class="col-xs-4 control-label no-padding-right" for="LAST_UPDATE_TIME_">更新时间：</label>
                          <input class="col-xs-8" id="LAST_UPDATE_TIME_" type="text" data-placeholder="创建时间" name="LAST_UPDATE_TIME_" value=""/>
                        </div>
                        <div class="col-xs-3" align='center'>
                          <button id="search" class="btn btn-purple btn-sm" type="button" onclick="idxQuery();">
                            <i class="ace-icon glyphicon glyphicon-search bigger-110"></i>查询</button>
                        </div>
                      </div>
                      <div class="hr hr10 hr-dotted"></div>
                      <div class="form-group">
                        <div class="col-xs-6">
                          <button id="btn_new" class="btn btn-primary btn-sm" type="button" onclick="idxNew();">
                            <i class="ace-icon fa fa-pencil-square-o bigger-110"></i>新建</button>
                          <button id="btn_import" onclick="importModel();" class="btn btn-sm btn-success" type="button">
                            <i class="ace-icon fa fa-upload bigger-110"></i>导入模型</button>
                        </div>
                      </div>
                    </form>
                    <table id="idxModelList"></table>
                    <div id="idxModelPager"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
