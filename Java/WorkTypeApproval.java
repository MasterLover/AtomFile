// 产品,售前,销售,交付审批 由发布人的主管副总裁审批

// 产品 Product
//判断任务由哪个副总裁
      String CEOorVP = "";
      Boolean flag = true;
      String leaderRoleId = commonService.getRolesPid(Collections.singletonList(publishRoleid), "t_sys_role_auth");
      do {
          if (isCEOorVP(leaderRoleId)) {
              flag = false;
              CEOorVP = leaderRoleId;
          }
          leaderRoleId = commonService.getRolePid(leaderRoleId, "t_sys_role_auth");
      } while (flag);
      execution.setVariable("CEOorVP", CEOorVP);

// 公司级会议,行政 由总裁审批
