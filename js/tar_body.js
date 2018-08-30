<div class=" tar_body tar_01">
                     <div class="form-group mx-md-3 mb-2   tar_name"  style="width: 40%;">
                         <label for="id1" class="sr-only">Password</label>
                         <input type="password" class="form-control" id="id1" placeholder="Password" style="width: 100%">
                     </div>
                     <div class="form-group mx-md-3 mb-2 tar_value"style="width: 40%">
                         <label for="id2" class="sr-only">Password</label>
                         <input type="password" class="form-control" id="id2" placeholder="Password"style="width: 100%">
                     </div>
                     <div class="form-group mx-md-3 mb-2 tar_del" style="width: 10%">
                         <button type="button" class="btn btn btn-light" id="del" onclick="" style="width: 100%">
                             删除
                         </button>
                     </div>
                 </div>







                 var getHTML = function (i) {
                     var name = i;
                     var tarHTML = '<div class=" tar_sub_' + i + '">\n' +
                         '                        <div class="form-group mx-md-3 mb-2   tar_name" style="width: 40%;">\n' +
                         '                            <label for="tar_name_' + i + '" class="sr-only">指标' + i + ': </label>\n' +
                         '                            <input type="password" class="form-control" id="tar_name_' + i + '" placeholder="Password"\n' +
                         '                                   style="width: 100%">\n' +
                         '                        </div>\n' +
                         '                        <div class="form-group mx-md-3 mb-2 tar_value" style="width: 40%">\n' +
                         '                            <label for="tar_value_' + i + '" class="sr-only">指标值' + i + ': </label>\n' +
                         '                            <input type="password" class="form-control" id="tar_value_' + i + '" placeholder="Password"\n' +
                         '                                   style="width: 100%">\n' +
                         '                        </div>\n' +
                         '                        <div class="form-group mx-md-3 mb-2 tar_del" style="width: 10%">\n' +
                         '                            <button type="button" class="btn btn btn-light" id="del" onclick="" style="width: 100%">\n' +
                         '                                删除\n' +
                         '                            </button>\n' +
                         '                        </div>\n' +
                         '                    </div>'
                 }





                 <%--定义考核指标--%>
                 <div class="modal fade" id="indexModal" tabindex="-1" role="dialog" aria-labelledby="indexModalLabel"
                      aria-hidden="false">
                     <div class="modal-dialog" style="width:800px">
                         <div class="modal-content">
                             <div class="modal-header">
                                 <button type="button" class="close " data-dismiss="modal" aria-hidden="true">
                                     X
                                 </button>
                                 <h4 class="modal-title" id="indexLabel" align="center">
                                     定义考核指标
                                 </h4>
                             </div>


                             <div class="modal-body">
                                 <form class="form-inline" style="margin-left: 92%">
                                     <div class="form-group mx-sm-3 mb-2">
                                         <button type="button" class="btn btn btn-light " id="addStander" onclick="addStander();">
                                             新增
                                         </button>
                                     </div>
                                 </form>
                                 <form class="form-inline tar_body">
                                     <div class=" tar_sub tar_01">
                                         <div class="form-group mx-md-3 mb-2 tar_name" style="width: 40%;">
                                             <label for="id1" class="sr-only">Password</label>
                                             <input type="password" class="form-control" id="id1" placeholder="Password"
                                                    style="width: 100%">
                                         </div>
                                         <div class="form-group mx-md-3 mb-2 tar_value" style="width: 40%">
                                             <label for="id2" class="sr-only">Password</label>
                                             <input type="password" class="form-control" id="id2" placeholder="Password"
                                                    style="width: 100%">
                                         </div>
                                         <div class="form-group mx-md-3 mb-2 tar_del" style="width: 10%">
                                             <button type="button" class="btn btn btn-light" id="del" onclick="" style="width: 100%">
                                                 删除
                                             </button>
                                         </div>
                                     </div>
                                 </form>

                             </div>
                             <div class="modal-footer margin-top-6">
                                 <button type="button" class="btn btn-primary " id="updateIndex" onclick="updateIndex()">
                                     提交
                                 </button>
                                 <button type="button" class="btn btn-default" data-dismiss="modal">
                                     关闭
                                 </button>
                                 <label class="page-index" hidden>0</label>
                             </div>
                         </div>
                     </div>
                 </div>
