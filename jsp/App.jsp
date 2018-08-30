<div class="container-fluid">
  <script src="<%=path%>/business/scripts/pc/js/common.js"></script>
  <script type="text/javascript" src="<%=basePath %>resources/js/pfs_common_function.js"></script>
  <script type="text/javascript" src="<%=path%>/business/pages/index/pc/js/_personal_Index.js"></script>
  <script type="text/javascript" src="<%=path%>/subsystem/wf/common/wf_common.js"></script>
  <script>
    pfs.comm.user = {
      NAME: username
    };
  </script>
  <div class="row">
    <!--header-->
    <!-- content -->
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 index-content">
      <div class="main">
        <div class="row">
          <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10 white-bg person_info">
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <ul>
                  <li class="li-top">
                    <a href="<%=path%>/myAffairs/viewMyAffairsGrid" target="_blank">
                      <img src="<%=path%>/business/style/pc/images/wddb.png" width="50px" alt="">
                        <p>我的待办</p>
                        <h4 id="myAffairs"></h4>
                      </a>
                    </li>
                    <li class="li-top">
                      <a href="<%=path%>/MyApply/viewApplyList" target="_blank">
                        <img src="<%=path%>/business/style/pc/images/wdsq.png" width="50px" alt="">
                          <p>我的申请</p>
                          <h4 id="myApply"></h4>
                        </a>
                      </li>
                      <li class="li-top">
                        <a href="<%=path%>/expense/viewMyExpense" target="_blank">
                          <img src="<%=path%>/business/style/pc/images/wdbx.png" width="50px" alt="">
                            <p>我的报销</p>
                            <h4 id="myExpenseCount">0</h4>
                          </a>
                        </li>

                        <%--<li>--%>
                          <%--<a href="<%=path%>/myEvaluate/viewMyEvaluateGrid" target="_blank">--%>
                            <%--<img src="<%=path%>/business/style/pc/images/dpj.png" width="40px" alt="">--%>
                              <%--<p>待评价</p>--%>
                                <%--<h4 id="myEvaluateCount"></h4>--%>
                                  <%--</a>--%>
                                    <%--</li>--%>
                                      <li class="li-top">
                                        <a href="<%=path%>/task/myTaskGrid" target="_blank">
                                          <img src="<%=path%>/business/style/pc/images/wdrw.png" width="50px" alt="">
                                            <p>我的任务</p>
                                            <h4 class=" scCount" id="myTask"></h4>
                                          </a>
                                        </li>
                                        <li class="li-top">
                                          <a href="<%=path%>/myCollection/viewMyCollectionGrid" target="_blank">
                                            <img src="<%=path%>/business/style/pc/images/wdsc.png" width="50px" alt="">
                                              <p>我的收藏</p>
                                              <h4 class=" scCount" id="myCollectionCount"></h4>
                                            </a>
                                          </li>
                                          <li class="li-top">
                                            <a href="<%=path%>/RecentlyUsed/viewRecentlyUsedList" target="_blank">
                                              <img src="<%=path%>/business/style/pc/images/zjsy.png" width="50px" alt="">
                                                <p>最近使用</p>
                                                <h4 id="myZjsyCount"></h4>
                                              </a>
                                            </li>

                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin-tp-10 three_content">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 white-bg no-padding-right no-padding-left">
                                      <%--<h4 class="fwlb_h4">--%>
                                        <%--<img src="<%=path%>/business/style/pc/images/icon_table.png" width="20px" alt="">--%>
                                          <%--服务列表--%>
                                            <%--<div class="attention">--%>
                                              <%--服务事项统一入口--%>
                                                <%--</div>--%>
                                                  <%--<div class="input-group">--%>
                                                    <%--<input type="text" class="form-control" onkeydown="myonkeypress(event)"--%>
                                                      <%--id="exampleInputAmount" placeholder="搜索服务">--%>
                                                        <%--<div class="input-group-addon" onclick="setGJC()"><i--%>
                                                          <%--class="glyphicon glyphicon-search"></i></div>--%>
                                                            <%--</div>--%>
                                                              <%--</h4>--%>

                                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                  <div class="row">
                                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                      <span class="pull-left">
                                                                        <span class="gray-color">服务类别：</span>
                                                                        <span class="all list_all" onClick="setFWLB()">
                                                                          全部
                                                                        </span>
                                                                      </span>
                                                                      <ul class="fwlb_ul pull-left" id="fwlb"></ul>
                                                                    </div>

                                                                    <!-- <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"> <span class="pull-left"> <span class="gray-color">服务部门：</span> <span class="all list_all" onClick="setFWBM()"> 全部 </span> </span> <ul class="fwlb_ul pull-left" id="fwbm"> </ul> </div> -->

                                                                    <%--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">--%>
                                                                      <%--<span class="pull-left">--%>
                                                                        <%--<span class="gray-color">服务方式：</span>--%>
                                                                          <%--<span class="all list_all" onClick="setXSXX()">--%>
                                                                            <%--全部--%>
                                                                              <%--</span>--%>
                                                                                <%--</span>--%>
                                                                                  <%--<ul class="fwlb_ul pull-left">--%>
                                                                                    <%--<li onClick="setXSXX(1, this)">线上服务</li>--%>
                                                                                      <%--<li onClick="setXSXX(2, this)">线下服务</li>--%>
                                                                                        <%--</ul>--%>
                                                                                          <%--</div>--%>

                                                                                            <!-- <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"> <span class="pull-left"> <span class="gray-color">服务对象：</span> <span class="all list_all" onClick="setFWDX()"> 全部 </span> </span> <ul class="fwlb_ul pull-left" id="fwdx"> </ul> </div> -->

                                                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 sort_div">
                                                                                              <span id="appCount"></span>

                                                                                            </div>

                                                                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding-left no-padding-right" id="allApp"></div>
                                                                                          </div>
                                                                                        </div>
                                                                                      </div>
                                                                                    </div>
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                              <!--footer-->
                                                                            </div>
