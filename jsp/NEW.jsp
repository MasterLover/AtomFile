<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
  <%@ page import="com.asgi.mis.framework.system.service.LoginInfo" %>
    <%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    LoginInfo loginInfo = (LoginInfo) request.getSession().getAttribute("loginInfo");
%>

      <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
      <html>
        <head>
          <script type="text/javascript">
            var path = '<%=path%>';
          </script>
          <script type="text/javascript" src="<%=path%>/subsystem/common/common.js"></script>
          <script type="text/javascript" src="<%=path%>/subsystem/common/wf/wf_common.js"></script>
          <script type="text/javascript" src="<%=path%>/subsystem/goal/zymb/zymb.js"></script>
          <%--<script type="text/javascript" src="<%=path%>/subsystem/wf/model/_importModel.js"></script>--%>
          </head>

          <body>
            <div class="breadcrumbs" id="breadcrumbs">
              <ul class="breadcrumb">
                <li>
                  <i class="ace-icon fa fa-home home-icon"></i>
                  <a href="#">首页</a>
                </li>
                <li class="active">目标管理&nbsp;>专业目标</li>
              </ul>
            </div>

            <div class="page-content" id="pagecontent">
              <div class="row">
                <div class="col-xs-12">
                  <div class="row">
                    <div class="tab-content">
                      <div id="zymbIdx">
                        <form role="form" class="form-horizontal" id="idxSearchForm" action="">
                          <div class="form-group">
                            <div class="col-xs-3">
                              <label class="col-xs-4 control-label no-padding-right" for="ZYMB_FZR_">责任人：</label>
                              <input class="col-xs-8" id="ZYMB_FZR_" type="text" data-placeholder="责任人" name="NAME_" value=""/>
                            </div>
                            <div class="col-xs-3">
                              <label class="col-xs-4 control-label no-padding-right" for="ZYMB_SX_">目标属性：</label>
                              <input class="col-xs-8" id="ZYMB_SX_" type="text" data-placeholder="目标属性" name="ZYMB_SX_" value=""/>
                            </div>

                            <div class="col-xs-3">
                              <label class="col-xs-4 control-label no-padding-right" for="CREATE_TIME_">开始时间：</label>
                              <input class="col-xs-8" id="CREATE_TIME_" type="text" data-placeholder="开始时间" name="CREATE_TIME_" value=""/>
                            </div>
                            <div class="col-xs-3">
                              <label class="col-xs-4 control-label no-padding-right" for="END_TIME_">结束时间：</label>
                              <input class="col-xs-8" id="END_TIME_" type="text" data-placeholder="结束时间" name="LAST_UPDATE_TIME_" value=""/>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-xs-3">
                              <label class="col-xs-4 control-label no-padding-right" for="ZYMB_STATUS_">发布状态:</label>
                              <select class="col-xs-8" id="ZYMB_STATUS_" name="ZYMB_STATUS_" data-placeholder="创建时间">
                                <option value="0">未发布</option>
                                <option value="1">已发布</option>
                              </select>
                            </div>
                            <div class="col-xs-3">
                              <label class="col-xs-4 control-label no-padding-right" for="ZYMB_PROGRESS_">完成进度:</label>
                              <select class="col-xs-8" id="ZYMB_PROGRESS_" name="ZYMB_PROGRESS_" data-placeholder="完成进度">
                                <option value="0">未完成</option>
                                <option value="1">已完成</option>
                              </select>
                            </div>
                            <div class="col-xs-3" align='center'>
                              <button id="search" class="btn btn-purple btn-sm" type="button" onclick="">
                                <i class="ace-icon glyphicon glyphicon-search bigger-110"></i>查询</button>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="hr hr10 hr-dotted"></div>
                            <div class="col-xs-6">
                              <button id="btn_new" class="btn btn-primary btn-sm" type="button" onclick="idxNew();">
                                <i class="ace-icon fa fa-pencil-square-o bigger-110"></i>新建
                              </button>
                              <button id="btn_import" onclick="importModel();" class="btn btn-sm btn-success" type="button">
                                <i class="ace-icon fa fa-upload bigger-110">导入模型</i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                      <table id="zymbList"></table>
                      <div id="zymbPage"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <%--专业目标Modal--%>
            <!-- Button trigger modal -->
            <%--<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#zymbModal">--%>
              <%--Launch demo modal--%>
                <%--</button>--%>

                  <%--<!-- Modal -->--%>
                    <div class="modal fade" id="zymbModal" tabindex="-1" role="dialog" aria-labelledby="zymbModalLabel" aria-hidden="false">
                      <div class="modal-dialog" style="width:1240px">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close " data-dismiss="modal" aria-hidden="true">
                              X
                            </button>
                            <h4 class="modal-title" id="createModalLabel" align="center">
                              新建专业目标
                            </h4>
                          </div>
                          <div class="modal-body">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div class="col-xs-6 ">
                                <%--<button type="button" class=" btn btn-primary"--%>
                                  <%--onclick="showProjectMsg();" id="msg">--%>
                                    <%--<span class="tab_title" id="projectMsg">--%>
                                      <%--项目信息--%>
                                        <%--</span>--%>
                                          <%--</button>--%>
                                            <%--<button type="button" class="btn btn-default" id="msgList">--%>
                                              <%--<span class="tab_title active" id="projectListMsg" onclick="showProjectListMsg();">--%>
                                                <%--项目计划表--%>
                                                  <%--</span>--%>
                                                    <%--</button>--%>
                                                    </div>
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                      <div class="zymb-body">
                                                        <form class="form-inline search_form" id="updateForm">
                                                          <div class="row">
                                                            <div class="col-xs-6 ">
                                                              <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left no-padding-right form-control-static">目标名称：<span class="red">*</span>
                                                              </label>

                                                              <div class=" col-lg-8 col-md-8 col-sm-8 col-xs-8  no-padding-right">
                                                                <input class="form-control" id="MBMC" errormsg="" nullmsg="" datatype="*" max="60" style="background-color: white"/>
                                                                <span class="red validate"></span>
                                                              </div>
                                                              <%--<input id="ID" hidden="hidden">--%>
                                                                <%--<input id="PROC_INST_ID_" hidden="hidden">--%>
                                                                </div>
                                                                <div class="col-xs-6 ">
                                                                  <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left no-padding-right form-control-static">目标指标：<span class="red">*</span>
                                                                  </label>

                                                                  <div class=" col-lg-8 col-md-8 col-sm-8 col-xs-8  no-padding-right">
                                                                    <input class="form-control" id="MBZB" errormsg="" nullmsg="" datatype="*" max="60" style="background-color: white"/>
                                                                    <span class="red validate"></span>
                                                                  </div>

                                                                </div>
                                                                <div class="col-xs-6 ">
                                                                  <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left no-padding-right form-control-static">开始时间：<span class="red">*</span>
                                                                  </label>

                                                                  <div class=" col-lg-8 col-md-8 col-sm-8 col-xs-8  no-padding-right">
                                                                    <input class="form-control" id="KSSJ" errormsg="" nullmsg="" datatype="*" max="60" style="background-color: white"/>
                                                                    <span class="red validate"></span>
                                                                  </div>

                                                                </div>
                                                                <div class="col-xs-6 ">
                                                                  <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left no-padding-right form-control-static">结束时间：<span class="red">*</span>
                                                                  </label>

                                                                  <div class=" col-lg-8 col-md-8 col-sm-8 col-xs-8  no-padding-right">
                                                                    <input class="form-control" id="JSSJ" errormsg="" nullmsg="" datatype="*" max="60" style="background-color: white"/>
                                                                    <span class="red validate"></span>
                                                                  </div>

                                                                </div>
                                                                <div class="col-xs-6 ">
                                                                  <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left no-padding-right form-control-static">所属专业：<span class="red">*</span>
                                                                  </label>

                                                                  <div class=" col-lg-8 col-md-8 col-sm-8 col-xs-8  no-padding-right">
                                                                    <input class="form-control" id="SSZY" errormsg="" nullmsg="" datatype="*" max="60" style="background-color: white"/>
                                                                    <span class="red validate"></span>
                                                                  </div>

                                                                </div>
                                                                <div class="col-xs-6 ">
                                                                  <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left no-padding-right form-control-static">责任人：<span class="red">*</span>
                                                                  </label>

                                                                  <div class=" col-lg-8 col-md-8 col-sm-8 col-xs-8  no-padding-right">
                                                                    <input class="form-control" id="ZRR" errormsg="" nullmsg="" datatype="*" max="60" style="background-color: white"/>
                                                                    <span class="red validate"></span>
                                                                  </div>
                                                                  <%--<input id="ID" hidden="hidden">--%>
                                                                    <%--<input id="PROC_INST_ID_" hidden="hidden">--%>
                                                                    </div>

                                                                    <div class="col-xs-6 ">
                                                                      <label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left no-padding-right form-control-static">目标属性：<span class="red">*</span>
                                                                      </label>
                                                                      <div class=" col-lg-8 col-md-8 col-sm-8 col-xs-8  no-padding-right">
                                                                        <label for="DXDL"></label>
                                                                        <select class="form-control" id="DXDL" errormsg="" nullmsg="" datatype="*" max="60" style="background-color: white;width: 210px">
                                                                          <option value="0">A类</option>
                                                                          <option value="1">B类</option>
                                                                          <option value="2">C类</option>
                                                                        </select>
                                                                        <span class="red validate"></span>
                                                                      </div>
                                                                      <%--<input id="ID" hidden="hidden">--%>
                                                                        <%--<input id="PROC_INST_ID_" hidden="hidden">--%>
                                                                        </div>

                                                                        <%--<div class="col-xs-6 ">--%>
                                                                          <%--<label class="col-lg-3 col-md-3 col-sm-3 col-xs-3 no-padding-left no-padding-right form-control-static">目标属性：<span--%>
                                                                            <%--class="red">*</span></label>--%>

                                                                              <%--&lt;%&ndash;<div class=" col-lg-8 col-md-8 col-sm-8 col-xs-8  no-padding-right">&ndash;%&gt;--%>
                                                                                <%--&lt;%&ndash;<select id="DXDL" name="DXDL">&ndash;%&gt;--%>
                                                                                  <%--&lt;%&ndash;<option value="0">A类</option>&ndash;%&gt;--%>
                                                                                    <%--&lt;%&ndash;<option value="1">B类</option>&ndash;%&gt;--%>
                                                                                      <%--&lt;%&ndash;<option value="2">C类</option>&ndash;%&gt;--%>
                                                                                        <%--&lt;%&ndash;</select>&ndash;%&gt;--%>
                                                                                          <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
                                                                                            <%--&lt;%&ndash;<input id="ID" hidden="hidden">&ndash;%&gt;--%>
                                                                                              <%--&lt;%&ndash;<input id="PROC_INST_ID_" hidden="hidden">&ndash;%&gt;--%>
                                                                                                <%--</div>--%>

                                                                                                </div>
                                                                                              </form>
                                                                                            </div>
                                                                                            <div class="projectList-body hidden">
                                                                                              <div class="form-group" id="commonDetail">
                                                                                                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label  gray-color" id="list"></label>
                                                                                                <button id="add" name="operate" class="btn btn-primary btn-sm" type="button" style="margin-right: 10px; margin-left: 90%;width: 80px">
                                                                                                  新增
                                                                                                </button>
                                                                                              </div>
                                                                                              <%--<div class="row" style="margin-top:10px;padding-left: 10px;padding-right: 2%">--%>
                                                                                                <%--<table id="zymbList"></table>--%>
                                                                                                  <%--'--%>
                                                                                                    <%--<div id="zymbPager"></div>--%>
                                                                                                      <%--</div>--%>

                                                                                                      </div>

                                                                                                    </div>
                                                                                                  </div>
                                                                                                  <div class="modal-footer">
                                                                                                    <button type="button" class="btn btn-primary " id="create" onclick="create()">
                                                                                                      新建
                                                                                                    </button>
                                                                                                    <button type="button" class="btn btn-default" data-dismiss="modal">
                                                                                                      关闭
                                                                                                    </button>
                                                                                                    <label class="page-index" hidden="hidden">0</label>
                                                                                                  </div>
                                                                                                </div>

                                                                                                <%--<div class="modal-footer">--%>
                                                                                                  <%--<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>--%>
                                                                                                    <%--<button type="button" class="btn btn-primary">Save changes</button>--%>
                                                                                                      <%--</div>--%>
                                                                                                      </div>
                                                                                                      <!-- /.modal-content -->
                                                                                                    </div>
                                                                                                    <!-- /.modal -->
                                                                                                  </div>

                                                                                                </body>
                                                                                              </html>
